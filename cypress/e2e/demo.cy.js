describe('Validate Cart Item', () => {
    it('should validate that Cucumber - 1 Kg is in the cart', () => {
      // Ensure the cart preview is visible
      cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
      
      cy.get(':nth-child(1) > .product-action > button').click();

      cy.get('.cart-icon > img').click();
      cy.get('.cart-preview.active').should('be.visible');
  
      // Find the product name within the cart and validate its text
      cy.get('.cart-items .cart-item .product-name')
        .should('contain.text', 'Cucumber - 1 Kg');
    });
  });