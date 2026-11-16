---
description: Run today's routines one after the other (candidacy tracker, protest follow-up, blog article on Mon/Thu, social post every 3 days) from this Mac, with Claude in Chrome
argument-hint: "[candidatures | manifestations | blog | reseaux — leave empty for today's set]"
---

# Today's routines

These routines used to run in the cloud. They now run here, on Arnaud's Mac, and read the web through his Chrome. Chrome must be open with the Claude in Chrome extension connected.

## Which routines

- `$ARGUMENTS` non-empty: run only the named routine(s).
- Otherwise run, in this order:
  1. **candidatures** — every day → `.claude/commands/candidatures.md`
  2. **manifestations** — every day → `.claude/commands/suivi-manifestations.md`
  3. **blog** — Monday and Thursday only (`date +%u` = 1 or 4) → `.claude/commands/draft-blog-post.md`, with no imposed topic (scouting mode).
  4. **reseaux** — every day, but it only prepares a post when the last one is 3 days old (or a press mention just came up) → `.claude/commands/post-reseaux.md`. Runs last, so it can use what the other routines found (new candidate, new question, press). It never publishes: it leaves three composer tabs open for Arnaud.

## How

1. Note the current branch (`git branch --show-current`). Check `git status --porcelain` is empty; if not, stop and tell Arnaud.
2. Check Chrome once (`tabs_context_mcp`, see `.claude/routines/recherche-web-chrome.md`). Extension not connected → stop and tell Arnaud before doing anything.
3. Run each routine **sequentially**, in this conversation, by reading its file and following it entirely. Do not use subagents: they would share the single Chrome and step on each other's tabs.
4. Between routines: `git switch main`, tree clean. One routine failing (merge conflict, test it cannot fix, site unreachable) does not stop the others: note the failure and move on.
5. At the end, switch back to the branch noted in step 1, close your Chrome tab (except the composer tabs left by **reseaux**).

## Final report (in French, short)

One line per routine: PR URL opened/updated, or "rien de nouveau", or the failure and what Arnaud must do. Then the points needing his review: estimated candidate positions, new people to add to the quiz, single-source facts.
