// describe('Google Search - Mock API Response', () => {
  
//   it('Searches for "games" and mocks API response', () => {
//     // Intercept Google search API response
//     cy.intercept('GET', '**/search?*q=games*', {
//       statusCode: 200,
//       body: {
//         searchResults: [
//           { title: 'Top 10 Online Games', link: 'https://games.com/top10' },
//           { title: 'Best Free PC Games', link: 'https://games.com/free-pc' },
//         ],
//       },
//     }).as('mockSearch');

//     // Visit Google
//     cy.visit('https://www.google.com');

//     // Type "games" in the search bar and press Enter
//     cy.get('#APjFqb').type('games{enter}');

//     // Wait for the mocked response
//     cy.wait('@mockSearch');

//     // Verify mocked data appears in UI (Modify selector if needed)
//     cy.contains('Top 10 Online Games').should('be.visible');
//     cy.contains('Best Free PC Games').should('be.visible');
//   });

// });

// describe('Monitor API Response for Google Search', () => {
  
//   it('Intercepts and monitors API response after searching "games"', () => {
//     // Intercept the search API response and monitor its details
//     cy.intercept('GET', '**/search?*q=games*').as('searchRequest');

//     // Visit Google
//     cy.visit('https://www.google.com');

//     // Type "games" in the search bar and press Enter
//     cy.get('#APjFqb').type('games{enter}');

//     // Wait for the search API response
//     cy.wait('@searchRequest').then((interception) => {
//       // Log the intercepted request and response
//       cy.log('Intercepted Request:', interception.request);
//       cy.log('Intercepted Response:', interception.response);

//       // Assert response status
//       expect(interception.response.statusCode).to.eq(200);

//       // Assert the response body contains expected data (modify based on actual API response)
//       expect(interception.response.body).to.exist;
//     });
//   });

// });
describe('Webpage Load Test', () => {
  it('Should load the webpage successfully', () => {
    // Visit the webpage
    cy.visit('https://google.com');

    // Verify the status code is 200 (page loaded successfully)
    cy.request('https://google.com').its('status').should('eq', 200);

  
  });
});

