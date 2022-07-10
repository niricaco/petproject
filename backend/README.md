# Stock API Backend

## System requirements

- node.js
- npm

## Environment variables

Create a .env file in root, with the following variables:

- PORT={8080} (backend)
- APP_URL={http://localhost:3001} (frontend)
- CONNECTION_STRING = {mongodb://localhost:27017/fullstack-app-template}
- JWT_SECRET={Shhh}

- CLIENT_ID=423125049963-vnhlm59vvirdjsquu0efhqvq5u91orks.apps.googleusercontent.com
- CLIENT_SECRET=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
- REDIRECT_URI=http://localhost:3000/callback
- TOKEN_ENDPOINT=https://oauth2.googleapis.com/token
- SCOPE=openid

## Dev start

- npm install
- npm run dev (nodemon)

## Test run

- npm test

## Current test results

| File                        | % Stmts   | % Branch   | % Funcs   | % Lines   | Uncovered Line #s   |
| --------------------------- | --------- | ---------- | --------- | --------- | ------------------- |
| All files                   | 78.29     | 62.87      | 64.28     | 83.1      |
| backend                     | 92        | 100        | 0         | 92        |
| app.config.js               | 100       | 100        | 100       | 100       |
| app.js                      | 91.3      | 100        | 0         | 91.3      | 33-34               |
| backend/controllers         | 67.14     | 55.85      | 57.69     | 72.57     |
| company.js                  | 36.17     | 25         | 28.57     | 41.02     | 35-68,73-82         |
| createUser.js               | 100       | 100        | 100       | 100       |
| item.js                     | 72.72     | 63.88      | 80        | 90.24     | 8-11                |
| order.js                    | 87.23     | 66.66      | 83.33     | 90        | 6-9                 |
| user.js                     | 41.37     | 18.18      | 20        | 39.28     | 6-24,35-51          |
| work.js                     | 100       | 100        | 100       | 100       |
| workAndSpecialization.js    | 100       | 100        | 100       | 100       |
| backend/middlewares         | 82.35     | 87.5       | 75        | 86.66     |
| auth.js                     | 91.66     | 87.5       | 100       | 100       | 10                  |
| errorHandler.js             | 60        | 100        | 0         | 60        | 4-5                 |
| backend/models              | 100       | 100        | 100       | 100       |
| code.js                     | 100       | 100        | 100       | 100       |
| company.js                  | 100       | 100        | 100       | 100       |
| invite.js                   | 100       | 100        | 100       | 100       |
| item.js                     | 100       | 100        | 100       | 100       |
| order.js                    | 100       | 100        | 100       | 100       |
| role.js                     | 100       | 100        | 100       | 100       |
| user.js                     | 100       | 100        | 100       | 100       |
| backend/routes              | 84.61     | 57.69      | 100       | 90.14     |
| company.js                  | 100       | 100        | 100       | 100       |
| dashboard.js                | 100       | 100        | 100       | 100       |
| order.js                    | 100       | 100        | 100       | 100       |
| user.js                     | 73.91     | 57.69      | 100       | 82.05     | 47-59,70-71         |
| backend/tests/utils         | 90        | 100        | 75        | 89.65     |
| httpMock.js                 | 80        | 100        | 50        | 80        | 18-19,25            |
| inMemoryDb.js               | 100       | 100        | 100       | 100       |
| backend/utils               | 94.44     | 50         | 100       | 100       |
| http.js                     | 91.66     | 50         | 100       | 100       | 14                  |
| logger.js                   | 100       | 100        | 100       | 100       |
| --------------------------- | --------- | ---------- | --------- | --------- | ------------------- |

Test Suites: 8 passed, 8 total
Tests: 43 passed, 43 total
