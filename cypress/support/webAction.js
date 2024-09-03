// cypress/support/webActions.js
import { selectors } from '../support/cssSelectors';
import envUrls from '../support/envUrls'; 
const environment = Cypress.env('environment');

export const launch = () => {
    cy.visit(envUrls[environment].url1);
}

export const addProductToCart = () => {
    // Access testData from the global or alias context
    cy.get('@testData').then((testData) => {
        const productName = testData.findGrocery;

        // Search for the product
        cy.get(selectors.searchProd).type(productName);
        cy.wait(2000);

        cy.get(selectors.productList).get(selectors.indiProduct).each(($e1) => {
            const textel = $e1.find(selectors.productName).text();
            cy.log(textel);

            if (textel.includes(productName)) {
                cy.wrap($e1).contains(selectors.addButton).click();
            }
        });

        cy.get(selectors.cart).click();
    });
};

export const proceedToCheckout = () => {
    // Open the cart
    cy.get('.cart-icon').click();

    // Proceed to checkout
    cy.get('.checkout-button').click();
};
