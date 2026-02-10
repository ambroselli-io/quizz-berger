# with-sentry-styled_components-swr-auth-no_api

Custom mixed template of [several next templates](https://github.com/vercel/next.js/tree/canary/examples)

- Next
- Styled-Conponents
- Sentry
- SWR for `get` -> it stores the result in cache + config setup to store also in localstorage -> no need redux anymore for authentication
- No use of Next /api folder, to not mixup concerns : front-end only in this project, back-end will stay in a separate folder

For sentry, use sentry wizard for next to setup tokens and all
