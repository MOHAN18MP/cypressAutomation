// cypress/support/pageObjects/ShoppingPage.js

import { selectors } from '../support/cssSelectors';
import { grocyHomepageSel } from '../support/cssSelectors';
import envUrls from '../support/envUrls';
const environment = Cypress.env('environment');


class grocHomePage {

  constructor() {
    // Initialize URL and environment from Cypress environment variables

    this.url = envUrls[environment].url1;

    // Load test data and set as a property
    cy.get('@testData').then((data) => {
      this.testData = data;
    });
  }


  // Method to launch the page
  launch() {
    cy.launchAndWaitForSpinner(this.url);
  }


  searchGroc() {
    return cy.Get({
      description: `searchGroc method`,
      selector: selectors.searchProd,
      assertion: "be.visible",
      assertionValue: "",
    }).type(this.testData.findGrocery.iteam1).click(grocHomePage.serachButton);
  }

  addToCart() {
    cy.waitForText(grocyHomepageSel.addCartButton, "ADD TO CART");
    return cy.Get({
      description: `ADD grocery to Cart: ${this.testData.productName}`,
      selector: grocyHomepageSel.addCartButton,
      assertion: "be.visible",
      assertionValue: "",
    }).contains(selectors.addButton).click();
  }

  openCart () {
    // Open the cart
    return cy.Get({
      description: `open Cart: ${selectors.cart}`,
      selector: selectors.cart,
      assertion: "be.visible",
      assertionValue: "",
    }).click();
    

  }

  validateCart() {
    cy.waitForText(grocyHomepageSel.proceedtoCOButton, "PROCEED TO CHECKOUT");
  
    return cy.Get({
      description: `Validate cart: '${grocyHomepageSel.cartElem}'`,
      selector: grocyHomepageSel.cartElem,
      assertion: "be.visible",
      assertionValue: "",
    }).validateWebTextContains(grocyHomepageSel.productNameInCart,this.testData.findGrocery.iteam1);
    
  }

  validateCartpm(param) {
    cy.waitForText(grocyHomepageSel.proceedtoCOButton, "PROCEED TO CHECKOUT");
  
    return cy.Get({
      description: `Validate cart: '${grocyHomepageSel.cartElem}'`,
      selector: grocyHomepageSel.cartElem,
      assertion: "be.visible",
      assertionValue: "",
    }).validateWebTextContains(grocyHomepageSel.productNameInCart,param);
      // .validateWebTextContains(grocyHomepageSel.productNameInCart,this.testData.findGrocery.iteam1);
    
  }

  validateCartLoop() {
    cy.waitForText(grocyHomepageSel.proceedtoCOButton, "PROCEED TO CHECKOUT");

    return cy.Get({
        description: `Validate cart: '${grocyHomepageSel.cartElem}'`,
        selector: grocyHomepageSel.cartElem,
        assertion: "be.visible",
        assertionValue: "",
    }).then(() => {
        // Convert object values into an array
        const groceryItems = Object.values(this.testData.findGrocery);

        groceryItems.forEach((product) => {
            cy.validateWebTextContains(grocyHomepageSel.productNameInCart, product);
        });
    });
}



//   validateCart() {
//     cy.waitForText(grocyHomepageSel.proceedtoCOButton, "PROCEED TO CHECKOUT");

//     return cy.Get({
//         description: `Validate cart: '${grocyHomepageSel.cartElem}'`,
//         selector: grocyHomepageSel.cartElem,
//         assertion: "be.visible",
//         assertionValue: "",
//     })
//     .validateWebTextContains(grocyHomepageSel.productNameInCart, this.testData.findGrocery.iteam1)
//     .validateWebTextContains(grocyHomepageSel.productNameInCart1, this.testData.findGrocery.iteam2)
//     .validateWebTextContains(grocyHomepageSel.productNameInCart2, this.testData.findGrocery.iteam3);
// }

aa

extractbeforeadd(){
  cy.get(grocyHomepageSel.product).find(grocyHomepageSel.productName).should("have.length",1);
  cy.extractText(grocyHomepageSel.productName,'fn');
}

valExtract(){
  cy.getData('fn').then((fn) => {
    this.validateCartpm(fn);

  })
}

valExtractpm(pm){
  cy.getData(pm).then((fn) => {
    this.validateCartpm(fn);

  })
}
  

  addGroctoCart() {
    const groceries = this.testData.findGrocery;
    const groceryKeys = Object.keys(groceries);
    const numberOfItems = groceryKeys.length;

    for (let i = 0; i < numberOfItems; i++) {
      const grocery = groceries[groceryKeys[i]];

      cy.Get({
        description: `Entering grocery: ${grocery}`,
        selector: grocyHomepageSel.productName,
        assertion: 'be.visible',
        assertionValue: '',
      }).then(($el) => {

        cy.contains(grocery)
          .parents(grocyHomepageSel.product)
          .find(grocyHomepageSel.addCart)
          .should('be.visible')
          .click()
          .then(() => {
            cy.log(`Successfully added grocery: ${grocery}`);
          });

      });
    }
  }

  addGrocToCartIgnoreIteam() {

    cy.waitForText(grocyHomepageSel.addCartButton, "ADD TO CART");
    const groceries = this.testData.findGrocery;
    const groceryKeys = Object.keys(groceries);

    groceryKeys.forEach((key) => {
      const grocery = groceries[key];
      let stopLoop = false;

      cy.wait(5000); // Ensure the page is ready before interacting

      return cy.Get({
        description: `Entering grocery: ${this.testData.productName}`,
        selector: selectors.productList,
        assertion: "be.visible",
        assertionValue: ""
      })
        .find(selectors.indiProduct)
        .then(($products) => {
          const maxCount = $products.length; // Get total products
          cy.log("Total products:", maxCount);

          $products.each((index, product) => {
            if (stopLoop) {
              return false; // Exit loop if item is found
            }

            const textel = Cypress.$(product).find(selectors.productName).text(); // Extract product name
            cy.log(`Checking product ${index + 1}/${maxCount}: ${textel}`);

            if (textel.includes(grocery)) {
              cy.wrap(product).contains(selectors.addButton).click(); // Add to cart
              cy.log(`Item added to cart: ${grocery}`);
              stopLoop = true; // Stop further iterations
            } else if (index === maxCount - 1) {
              cy.log(`Item not found: ${grocery}`);
            }
          });
        });
    });
  }

}

export default grocHomePage;
