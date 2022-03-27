# cruk-donation-workflow

## Test Run Guide
1. After cloning the repo to your local machine, execute command `npm install`. This is to pull all required dependencies.
2. Execute `npx cypress open`. This will launch the Cypress test runner UI.
3. To run the test, click "Run 1 integration spec" at the top right corner.


## Structure
1. fixture folder contains fixed set of data to be used in test cases.
2. integration folder holds test suites.
3. pages folder contains all Page Object Models (which contains logics to interact on pages).