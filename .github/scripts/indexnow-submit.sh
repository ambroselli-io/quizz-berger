#!/usr/bin/env bash
# Submit a list of URLs to IndexNow (Bing, Yandex, Seznam, Naver…).
#
# Usage:  indexnow-submit.sh <url> [<url> ...]
#         indexnow-submit.sh < urls.txt        (one URL per line)
#
# Requires INDEXNOW_KEY in the environment. HOST and BASE_URL default to the
# production domain. Exits 0 when there is nothing to submit.
set -euo pipefail

HOST="${HOST:-www.quizz-du-berger.com}"
BASE_URL="${BASE_URL:-https://www.quizz-du-berger.com}"

if [ -z "${INDEXNOW_KEY:-}" ]; then
  echo "INDEXNOW_KEY is not set — nothing submitted."
  exit 0
fi

if [ "$#" -gt 0 ]; then
  urls="$(printf '%s\n' "$@")"
else
  urls="$(cat)"
fi

# Normalise: drop blanks, drop duplicates, keep a stable order.
urls="$(printf '%s\n' "$urls" | tr ' ' '\n' | sed '/^$/d' | sort -u)"

count="$(printf '%s\n' "$urls" | sed '/^$/d' | wc -l | tr -d ' ')"
if [ "$count" = "0" ]; then
  echo "No URLs to submit."
  exit 0
fi

# IndexNow accepts up to 10 000 URLs per request; batch anyway so a future
# sitemap growth does not silently truncate.
rm -f /tmp/indexnow-batch-*
printf '%s\n' "$urls" | split -l 5000 - /tmp/indexnow-batch-

status=0
for batch in /tmp/indexnow-batch-*; do
  url_list="$(jq -R . < "$batch" | jq -sc .)"
  payload="$(jq -nc \
    --arg host "$HOST" \
    --arg key "$INDEXNOW_KEY" \
    --arg loc "$BASE_URL/$INDEXNOW_KEY.txt" \
    --argjson urls "$url_list" \
    '{host: $host, key: $key, keyLocation: $loc, urlList: $urls}')"

  echo "Submitting $(wc -l < "$batch" | tr -d ' ') URLs to IndexNow:"
  echo "$url_list" | jq -r '.[]' | sed 's/^/  /'

  code="$(curl -sS -o /tmp/indexnow-resp.txt -w '%{http_code}' \
    -X POST 'https://api.indexnow.org/indexnow' \
    -H 'Content-Type: application/json; charset=utf-8' \
    --data "$payload")"
  echo "IndexNow HTTP $code"
  cat /tmp/indexnow-resp.txt || true
  echo

  # 200 = accepted, 202 = accepted, validation pending. Anything else is a real
  # problem worth surfacing (e.g. 403 = the /<key>.txt file isn't served on the
  # VPS: check INDEXNOW_KEY in the VPS .env).
  case "$code" in
    200 | 202) echo "IndexNow accepted the batch." ;;
    403)
      echo "IndexNow returned 403 — the key file $BASE_URL/$INDEXNOW_KEY.txt is missing or doesn't match. Set INDEXNOW_KEY in the VPS .env to the same value as this secret." >&2
      status=1
      ;;
    *)
      echo "IndexNow returned an unexpected status." >&2
      status=1
      ;;
  esac
done

rm -f /tmp/indexnow-batch-*
exit "$status"
