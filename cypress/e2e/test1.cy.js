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
    it('Search grocery', () => {
        hp.launch();
        hp.searchGroc();
    }),
        it('Add grocery to cart & go to cart', () => {
            hp.addToCart();
            hp.openCart();
            
        }),
        it('validate cart ',()=>{
            
            hp.validateCart();
        })
})