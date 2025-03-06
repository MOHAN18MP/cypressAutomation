import grocHomePage from '../POM/grocHomePage';

const testId = 'trstId-2';
const environment = Cypress.env('environment');
let hp;

before(function () {
    // Load the test data and set it as an alias
    cy.fixture('testData').then((data) => { cy.wrap(data[testId][environment]).as('testData'); });
    hp = new grocHomePage;

});

describe(testId + '_' + environment, () => {

    it('Launch url', { retries: { runMode: 2, openMode: 2 } },() => {
        hp.launch();
    })
    it('search grocery to cart', { retries: { runMode: 0, openMode: 0 } },() => {
        hp.searchGroc();
    })
    it('add grocery to cart', { retries: { runMode: 0, openMode: 0 } },() => {
        hp.addToCart();
    })

    it('open Cart:', { retries: { runMode: 0, openMode: 0 } },() => {
        hp.openCart();
    })
    it('validate Cart', { retries: { runMode: 0, openMode: 0 } },() => {
        hp.validateCart();
    })

})