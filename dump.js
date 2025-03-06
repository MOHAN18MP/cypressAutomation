  addGroctoCartCount() {
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
            assertionValue: "",
            delay:5000
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
  

  cy.get('.product-name').get('.product').get('button');

  productName: "" ,
    product:".",
    addCart:"button"