import grocHomePage from '../POM/grocHomePage';

// Cypress.Commands.add('setupTestData', (testId, environment) => {
//   cy.fixture('testData').then((data) => {
//     cy.wrap(data[testId][environment]).as('testData');
//   });
// });

let hp;

// before(() => {
//   cy.log('Before All Tests - Initializing Test Setup');
// });

beforeEach(() => {
  // cy.log('Before Each Test - Setting up test data and page objects');
  
  // Ensure `testId` and `environment` are set in Cypress env
  const testId = Cypress.env('testId') || 'trstId-2';
  const environment = Cypress.env('environment') || 'qa';

  cy.setupTestData(testId, environment);
  hp = new grocHomePage();
  cy.wrap(hp).as('homePage'); // Store object for reuse in tests
});

// afterEach(() => {
//   cy.log('After Each Test - Cleanup operations');
// });

// after(() => {
//   cy.log('After All Tests - Test Execution Completed');
// });
