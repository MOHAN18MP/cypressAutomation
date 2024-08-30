
// describe('My First Test', () => {
//     it('Does not do much!', () => {
//       expect(true).to.equal(true)
//     })
//   })

describe('first test', function () {
    it('First TEST', function () {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(2000)
        // cy.get('.search-keyword:visible').type('ca')
        // cy.wait(2000)
        // cy.get('.products:visible').as('productList');
        // cy.get('.product:visible').as('indiproduct');
        // cy.get('.product-name').as('productname');

        // cy.get('@productList').get('@indiproduct').each(($e1, index, $list) => {
        //     /* const fi = $e1.find('@productname').text();
        //     cy.log(fi); */

        //     cy.wrap($e1).then(() => {
        //         cy.get('@productname').then((a) => { // Use the alias correctly with cy.get()
        //             cy.log(a.text());
        //         });
        //     });


        // }
        // )

        // click on add card by finding element using its name

        // Step 1: Declare the CSS selector as a variable
        const productlist = '.products:visible';
        const indiproduct = '.product:visible';
        const productName = '.product-name:visible';
        const searchProd = '.search-keyword:visible';
        const findgrosry = 'Cashew';
        const addbutton= 'ADD TO CART';
        const cart= '.cart-icon';
        const checkoutbutton ="PROCEED TO CHECKOUT";
        const placeOrderbutton ="Place Order";
        const buttontag = "button";
        const selecttag = "select";
        const anchtag = "a"
        const contry = 'Benin';
        const procedButton = 'Proceed';


        // Step 2: Use the CSS selector in Cypress commands
        // cy.get(productNameSelector).as('productname'); // Create an alias for the selector

        // cy.get('@productname').each(($el, index, $list) => {
        //     cy.wrap($el).then((element) => {
        //         cy.log(element.text());
        //     });
        // });
        cy.get(searchProd).type('ca')
        cy.wait(2000)
        cy.get(productlist).get(indiproduct).each(($e1, index, $list) => {
            const textel = $e1.find(productName).text()
            cy.log(textel);
            if(textel.includes(findgrosry)){

                cy.wrap($e1).contains(addbutton).click();
            }
            
          
        });
        cy.get(cart).click();
        cy.contains(buttontag, checkoutbutton).click();
        cy.contains(buttontag, placeOrderbutton).click();
        cy.get(selecttag).select(contry);  // select using tag and options
        cy.wait(2000);
        // cy.contains('label', 'Agree to the').find('input[type="checkbox"]').check();
        cy.get('input[type="checkbox"]').check();
        cy.contains(buttontag, procedButton).click();







    })
})