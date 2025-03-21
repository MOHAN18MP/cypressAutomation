import grocHomePage from '../POM/grocHomePage';
import '../support/hooks'; // Ensure hooks are imported

const testId = 'trstId-2';
const environment = Cypress.env('environment');

describe(`${testId}_${environment}`, () => {

  it('Launch URL', { retries: { runMode: 2, openMode: 2 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.launch();
    });
  });

  it('add groc without search and ignore test data iteam if not found', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.addGrocToCartIgnoreIteam();
    });
  });

  it('open Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.openCart();;
    });
  });

  it('Validate Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
        hp.validateCartLoop();
    });
  });

//   it('Validate Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
//     cy.get('@homePage').then((hp) => {
//       hp.validateCart();
//     });
//   });

});
