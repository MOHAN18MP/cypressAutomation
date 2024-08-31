// cypress/support/webActions.js
import { selectors } from '../support/cssSelectors';


export const addProductToCart = (str) => {
    // Search for the product
    cy.get(selectors.searchProd).type(str)
    cy.wait(2000)
    cy.get(selectors.productList).get(selectors.indiProduct).each(($e1, index, $list) => {
        const textel = $e1.find(selectors.productName).text()
        cy.log(textel);
        if(textel.includes(str)){

            cy.wrap($e1).contains(selectors.addButton).click();
        }
        
      
    });
    cy.get(selectors.cart).click();
};

export const proceedToCheckout = () => {
    // Open the cart
    cy.get('.cart-icon').click();

    // Proceed to checkout
    cy.get('.checkout-button').click();
};
