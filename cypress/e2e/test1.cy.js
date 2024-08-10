/// <reference types="Cypress" />
// describe('My First Test', () => {
//     it('Does not do much!', () => {
//       expect(true).to.equal(true)
//     })
//   })

describe('first test', function()
{
    it ('First TEST',function(){
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
        cy.wait(2000)
        cy.get('.search-keyword').type('ca')
        // :visible retrives visible element,should used for assertion,have.leng used to find how many element
        cy.get('.product:visible').should("have.length",4) 
        //parent child chaining
        //pass parent element cs in get and child element cs in find 
        cy.get(".products").find('.product').should("have.length",4)
        cy.get(".products").find('.product').eq(2).contains("ADD TO CART").click()
        // click on add card by finding element using its name

        cy.get(".products").find('.product').each(($e1,index,$list) => {
            const textel=$e1.find('h4.product-name').text()
            if(textel.includes("Cashews")){
                // cy.wrap($e1).find("button").click();
                
                cy.log($e1,cy.wrap($e1))
                cy.wrap($e1).contains("ADD TO CART").click();
                //ggg


 }

 })

 })
})