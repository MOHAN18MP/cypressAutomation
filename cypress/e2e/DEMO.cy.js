

describe('My First Test', () => {
    it('Does not do much!', () => {
     
        
        cy.visit('https://www.ironspider.ca/forms/checkradio.htm');

        
        
        // Then select the checkbox by its label text
        cy.get('input[type="checkbox"][value="red"]').check();

    })
  })
