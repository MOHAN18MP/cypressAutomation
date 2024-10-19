import * as webActions from '../support/webAction';
import envUrls from '../support/envUrls';

const testId = 'trstId-1';
const environment = Cypress.env('environment');

before(function () {
    // Load the test data and set it as an alias
    cy.fixture('testData').then((data) => { cy.wrap(data[testId][environment]).as('testData'); });
});



describe('Calculator Test', () => {
  // it('should correctly add two numbers', () => {
  //   cy.visit(envUrls[environment].url2);

  //   // Get the current value of the output field and store it as an integer
     
  //   cy.get('@testData').then((testData) => {
  //     cy.get('#sciout > tbody > tr:nth-child(2) > td:nth-child(2) > div')
  //         .find('.scinm').contains(8).click().click();
  // });
      // webActions.extractbefore();
      // webActions.addval();
      // webActions.calval();
      // webActions.validateAfter();

      // // Define exval
      // const exval = 7;

      // Perform the click action for exval
      // cy.get('#sciout > tbody > tr:nth-child(2) > td:nth-child(2) > div')
      //   .find('.scinm').contains(exval).click();
      //   cy.log(val1+exval)

      // // Verify that the new value is equal to the sum of val and exval
      // cy.get('#sciOutPut').should(($output) => {
      //   const actualText = $output.text().replace(/\s/g, ''); // Remove all spaces
      //   expect(actualText).to.eq((val1+exval).toString()); // Compare with the expected value
     
      
   
  });
// });
