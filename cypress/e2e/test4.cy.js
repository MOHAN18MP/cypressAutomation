import grocHomePage from '../POM/grocHomePage';

const testId = 'trstId-2';
const environment = Cypress.env('environment');
let hp;

beforeEach(function () {
    // Load the test data and set it as an alias
    cy.fixture('testData').then((data) => { cy.wrap(data[testId][environment]).as('testData'); });
    hp = new grocHomePage;

});

describe(testId + '_' + environment, () => {

    it('Launch url', { retries: { runMode: 2, openMode: 2 } }, () => {
        hp.launch();
    })
    it('search grocery to cart', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.searchGroc();
    })
    it('extract groc details', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.extractbeforeadd();
    })
    it('add grocery to cart', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.addToCart();
    })

    it('open Cart:', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.openCart();
    })
    it('validate Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
        cy.get('@testData').then((testData) => {
            hp.validateCartpm(testData.findGrocery.iteam1);
        });
    })
    it('validate Cart with extract ', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.valExtract();
    })
    it('validate Cart with extract prm ', { retries: { runMode: 0, openMode: 0 } }, () => {
        hp.valExtractpm('fn');
    })
    

})