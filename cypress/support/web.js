// cypress/support/pageObjects/ShoppingPage.js

import { selectors } from '../support/cssSelectors';
import envUrls from '../support/envUrls';
const environment = Cypress.env('environment');


class ShoppingPage {
    
    constructor() {
        // Initialize URL and environment from Cypress environment variables
        
        this.url = envUrls[environment].url1;

        // Load test data and set as a property
        cy.get('@testData').then((data) => {
            this.testData = data;
        });
    }

    grocyHomepage = { 
        container: "#menuRooms" 
    };



    // Method to launch the page
    launch() {
        cy.visit(this.url);
    }
    

    enterGroc() {
        return cy.Get({
            description: `Entering grocery: ${this.testData.productName}`,
            selector: selectors.searchProd,
            assertion: "be.visible",
            assertionValue: "",
        }).type(this.testData.findGrocery);
    }


    findGrocAddCart() {
        return cy.get({
            description: `Entering grocery: ${this.testData.productName}`,
            selector: selectors.searchProd,
            assertion: "be.visible",
            assertionValue: "",
        })
        .then(() => {
            cy.contains(this.testData.findGrocery)
              .parents('.product') // Adjust to match the container of the product
              .find('button') // Locate the "ADD TO CART" button
              .should('be.visible')
              .click(); // Click the button to add the product to the cart
        });
    }
    

    // Method to add a product to the cart
    addProductToCart() {
        const productName = this.testData.findGrocery;

        // Search for the product
        cy.get(selectors.searchProd).type(productName);
        cy.wait(2000);

        // Loop through products to find the matching one and add it to the cart
        cy.get(selectors.productList).get(selectors.indiProduct).each(($e1) => {
            const textel = $e1.find(selectors.productName).text();
            cy.log(textel);

            if (textel.includes(productName)) {
                cy.wrap($e1).contains(selectors.addButton).click();
            }
        });

        // Click on the cart to view added products
        cy.get(selectors.cart).click();
    }
}

export default ShoppingPage;
