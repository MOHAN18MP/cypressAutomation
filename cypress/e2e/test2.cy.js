import * as webActions from '../support/webAction';

const testId = 'trstId-1';
const environment = Cypress.env('environment');

before(function () {
    // Load the test data and set it as an alias
    cy.fixture('testData').then((data) => { cy.wrap(data[testId][environment]).as('testData'); });
});

describe(testId, () => {

    it('First TEST', () => {
        cy.log(environment);
        webActions.launch();
        cy.wait(2000)
        webActions.addProductToCart()
        cy.wait(5000)



    })

})