import ShoppingPage  from '../support/web';

const testId = 'trstId-1';
const environment = Cypress.env('environment');
let SP;

before(function () {
    // Load the test data and set it as an alias
    cy.fixture('testData').then((data) => { cy.wrap(data[testId][environment]).as('testData'); });
    SP = new ShoppingPage();

});

describe(testId+'_'+environment, () => {

    it('First TEST',  () => {
        cy.log(environment);
        SP.launch();
        cy.wait(2000)
        SP.enterGroc()
        cy.wait(5000)



    })

})