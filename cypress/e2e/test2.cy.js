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

  it('Search Grocery to Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.searchGroc();
    });
  });

  it('Add Grocery to Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.addToCart();
    });
  });

  it('Open Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.openCart();
    });
  });

  it('Validate Cart', { retries: { runMode: 0, openMode: 0 } }, () => {
    cy.get('@homePage').then((hp) => {
      hp.validateCart();
    });
  });

});
