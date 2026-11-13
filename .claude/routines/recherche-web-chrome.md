# Web research through Claude in Chrome

The routines used to run in the cloud with WebFetch. French news sites now block those requests, so the routines run on Arnaud's Mac and read pages through his own Chrome (Claude in Chrome extension). Apply these rules in every routine.

## Tools

- **Find** pages with `WebSearch` (snippets, works fine). Use it to build the list of URLs to read.
- **Read** pages with Chrome, never with `WebFetch` (blocked by most French outlets, do not retry it).
- Load every Chrome tool in ONE call at the start:
  `ToolSearch select:mcp__claude-in-chrome__tabs_context_mcp,mcp__claude-in-chrome__tabs_create_mcp,mcp__claude-in-chrome__navigate,mcp__claude-in-chrome__get_page_text,mcp__claude-in-chrome__find,mcp__claude-in-chrome__computer,mcp__claude-in-chrome__tabs_close_mcp`
- Call `tabs_context_mcp` first. Create ONE new tab with `tabs_create_mcp` for the whole routine and navigate inside it. Never touch Arnaud's existing tabs. Close your tab at the end.

## Reading a page

1. `navigate` to the URL, then `get_page_text`. That is enough for nearly every article. Do not take screenshots to read text.
2. Cookie / consent wall hiding the text: use `find` for the "Accepter" / "Continuer sans accepter" button and click it once with `computer`. Prefer "Continuer sans accepter" / "Refuser" when offered.
3. Paywall, login wall, captcha, or a page still empty after one retry: drop that URL and pick another outlet for the same fact. Never log in, never fill a form, never solve a captcha.
4. Never click anything that may open a JS alert/confirm dialog. It freezes the extension.
5. If the Chrome extension does not answer after 2 attempts, stop the routine and tell Arnaud (Chrome closed, extension disconnected). Do not fall back to inventing or to WebFetch.

## Sourcing

- A fact goes into the repo only if its page was read in Chrome during this session (or in the existing article / tracker already). A search snippet alone is not a source.
- Keep the canonical URL of each page you read (strip tracking parameters such as `?utm_…`, `#xtor…`).
- Do not cite RT.
- Be efficient: read the 5–15 pages that matter, not 40. One good source per fact, two when a figure is contested.
