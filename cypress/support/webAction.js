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

export const addval = () => {
    cy.get('@testData').then((testData) => {
        cy.get('#sciout > tbody > tr:nth-child(2) > td:nth-child(2) > div')
            .find('.scinm').contains(testData.exval).click().click();
    });
}



export const preExtract_transaction_postExtract = () => {
    cy.get('@testData').then((testData) => {
        cy.compareNumValuesBeforeAndAfter(
            '#sciOutPut', // Selector for the value to be validated
            addval // Perform the transaction
            ,
            testData.exval // Expected change in value
        );
    });

}

export const extractbefore = () => {
    // Extract the value before the transaction
    cy.get(selectors.CalcuOut).then((data) => {
        
        let label = "valBefore";
        let value = data.text();
        cy.log("before val" +  value)
        console.log("before val" +  value)
        
        cy.setData(label, value);

    })

}

// export const calval = () => {
//     cy.retrieve('valBefore').then((valBefore) => {
//         cy.get('@testData').then((testData) => {
//             const value = Number(valBefore) + Number(testData.exval) + 70; // Calculate the new value
//             cy.log("calva"+value)
//             const label = "valafter";
//             cy.save(label, value); // Save the new value
//         });
//     });
// };

export const calval = () => {
    // Use retrieve command to get valBefore
    cy.getData('valBefore').then((valBefore) => {
      // Use @testData to get additional test data
      cy.get('@testData').then((testData) => {
        // Perform calculation
        const label = "valafter";
        const value = Number(valBefore) + Number(testData.exval) + 70;
        cy.log(`Calculated value: ${value}`);
  
        // Save the new value
        
        cy.setData(label, value);
      });
    });
  };
  


export const validateAfter = () => {
    cy.getData('valafter').then((valafter) => {
             
            cy.validateNumberContent('#sciout', valafter);
        });

};



