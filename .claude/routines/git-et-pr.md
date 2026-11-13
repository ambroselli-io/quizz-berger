# Git and draft PR for the local routines

Arnaud authorised it explicitly (2026-11-13): **inside the routines only**, Claude creates a branch, commits, pushes that branch and opens a draft PR, as the cloud routines did. Outside the routines, the "never commit" rule still applies.

**Never push to `main`. Never merge. Never force-push.** Pushing to `main` deploys production.

## Before a routine

1. `git status --porcelain` must be empty. If it is not, stop and tell Arnaud: his work in progress must not end up in a routine commit. Do not stash.
2. `git fetch origin && git switch main && git pull --ff-only`.

## Branch

- New branch: `git switch -c <branch> origin/main`.
- Rolling branch that may already exist (e.g. `blog/suivi-manifestations-interdites`):
  - If `gh pr list --head <branch> --state open` returns a PR: `git switch <branch>` (or `git switch -c <branch> origin/<branch>` if it is not local), `git pull --ff-only`, then `git merge --no-edit origin/main`. A merge conflict → `git merge --abort`, stop that routine, report it.
  - Otherwise: delete any stale local branch of that name (`git branch -D`), then create it from `origin/main`.

## Commit and PR

- Stage the files you changed by name (`git add <paths>`). Never `git add -A`. Never commit `package-lock.json` or anything under `node_modules`, `dist`, `.claude/`.
- Commit message: the PR title.
- `git push -u origin <branch>`.
- New PR: `gh pr create --draft --base main --head <branch> --title "<title>" --body-file <file in the scratchpad>`. Existing PR: the push updates it; add a comment with `gh pr comment <n> --body-file …` summarising today's changes.
- Report the PR URL.

## Nothing changed

No commit, no push, no PR. Delete the empty local branch. "Rien de nouveau aujourd'hui" is a normal outcome.

## After a routine

`git switch main` so the next routine starts clean. At the very end of `/routines`, switch back to the branch Arnaud was on at the start.

## Dependencies

`node_modules` is already installed locally. Run `npm install` only when the type-check or tests fail on a missing module, and then `git checkout -- package-lock.json` before committing.
