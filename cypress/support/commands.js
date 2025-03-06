// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

// Helper function to sanitize strings for logging

function addTestContext(value) {
  let title = "action";
  cy.log(`${title}: ${value}`);
}

const sanitizeForLogging = (input) => {
  return JSON.stringify(input)
    .replace(/\\n/g, '') // Remove newlines
    .replace(/\\/g, '')  // Remove backslashes
    .replace(/'/g, '')   // Remove single quotes
    .replace(/"/g, '');  // Remove double quotes
};

// Custom Cypress command to save key-value pair and log it
Cypress.Commands.add('save', (key, value) => {
  const sanitizedKey = sanitizeForLogging(key);
  const sanitizedValue = sanitizeForLogging(value);

  // Log the key-value pair
  addTestContext(`Saving ${sanitizedKey} as ${sanitizedValue}`);

  // Persist the data using a Cypress task
  cy.task('setData', { k: key, v: value });
});

Cypress.Commands.add('setData', (key, value) => {
  cy.window().then((win) => {
    // Ensure runtimeData exists
    if (!win.runtimeData) {
      win.runtimeData = {};
    }
    win.runtimeData[key] = value;
  });
});

// Cypress.Commands.add('Get', (inst) => {
//   cy.log(inst.description);
//   if (inst.delay) cy.wait(inst.delay);
//   return inst.assertion ?
//       inst.postDelay ? cy.get(inst.selector, inst.options).should(inst.assertion, inst.assertionValue).wait(inst.postDelay) :
//           cy.get(inst.selector, inst.options).should(inst.assertion, inst.assertionValue) :
//       inst.postDelay ? cy.get(inst.selector).wait(inst.postDelay) :
//           cy.get(inst.selector);
// });


Cypress.Commands.add('Get', (inst) => {
  cy.log(inst.description);
  if (inst.delay) cy.wait(inst.delay);
  
  const command = inst.assertion ?
      inst.postDelay ? cy.get(inst.selector, inst.options).should(inst.assertion, inst.assertionValue).wait(inst.postDelay) :
          cy.get(inst.selector, inst.options).should(inst.assertion, inst.assertionValue) :
      inst.postDelay ? cy.get(inst.selector).wait(inst.postDelay) :
          cy.get(inst.selector);
  
  return command.then(
      () => {
          // Success callback: Do nothing
      },
      (error) => {
          // Failure callback: Log the error with the description
          cy.log(`Error occurred: ${error.message}`);
          cy.log(`Description: ${inst.description}`);
          throw error; // Rethrow the error to fail the test
      }
  );
});

Cypress.Commands.add('getData', (key) => {
  return cy.window().then((win) => {
    // Retrieve the data
    return win.runtimeData ? win.runtimeData[key] : null;
  });
});


Cypress.Commands.add('getAllData', () => {
  return cy.window().then((win) => {
    // Retrieve the entire runtimeData object
    return win.runtimeData || {};
  });
});

Cypress.Commands.add('launchAndWaitForSpinner', (url, spinnerSelector = null) => {
  // Visit the URL
  cy.visit(url);

  // If spinnerSelector is provided, wait until the spinner disappears
  if (spinnerSelector) {
      cy.get(spinnerSelector).should('not.exist');
  }
});




// Cypress.Commands.add('retrieve', (key) => {
//   cy.task('getData', key).then((value) => {
//     //cy.log('Retrieved value: ' + value); // Log the retrieved value
//     return value;
//   });
// });

/* Cypress.Commands.add('retrieve', (key) => {
  cy.task('getData', key).then((value) => {
      //addTestContext('retrieve','Retrieving ' + key + ' as ' + value);
      return value;
  });
});
 */



Cypress.Commands.add('validateWebText', (selector, expectedValue) => {
  cy.get(selector)
    .invoke('text')
    .then((text) => {
      const trimmedText = text.trim(); // Trim the extracted text
      expect(trimmedText).to.equal(expectedValue); // Validate the trimmed text
    });
});


Cypress.Commands.add('validateWebTextContains', (selector, expectedValue) => {
  cy.get(selector)
    .invoke('text')
    .then((text) => {
      const trimmedText = text.trim(); // Trim the extracted text
      expect(trimmedText).to.include(expectedValue); // Validate the trimmed text
    });
});

Cypress.Commands.add('validateNumberContent', (selector, expectedNumber) => {
  cy.get(selector)
    .invoke('text') // Use 'val' for input fields if needed
    .then((text) => {
      const trimmedText = text.trim(); // Trim the text
      const extractedNumber = parseFloat(trimmedText); // Convert to number
      expect(extractedNumber).to.equal(parseFloat(expectedNumber)); // Validate with the expected number
    });
});

// Cypress.Commands.add('validateNumberContent', (selector, expectedNumber) => {
//   cy.get(selector)
//     .invoke('text') // Use 'val' for input fields if needed
//     .then((text) => {
//       const trimmedText = text.trim(); // Trim the text
//       const extractedNumber = parseFloat(trimmedText); // Convert to number
//       const expectedNum = parseFloat(expectedNumber); // Ensure expectedNumber is converted to a number
//       expect(extractedNumber).to.equal(expectedNum); // Validate the extracted number
//     });
// });


// Define a custom command for comparing values before and after a transaction
Cypress.Commands.add('compareNumValuesBeforeAndAfter', (selector, transactionAction, expectedChange) => {
  let valueBefore;

  // Extract the value before the transaction
  cy.get(selector)
    .invoke('text') // Use 'val' for input fields
    .then((textBefore) => {
      valueBefore = parseFloat(textBefore.trim()); // Convert to number and store it

      // Perform the transaction
      transactionAction(); // Call the function that performs the transaction

      // Extract the value after the transaction
      cy.get(selector)
        .invoke('text') // Use 'val' for input fields
        .then((textAfter) => {
          const valueAfter = parseFloat(textAfter.trim()); // Convert to number

          // Compare the values
          expect(valueAfter).to.equal(valueBefore + parseFloat(expectedChange.trim()));
        });
    });
});


Cypress.Commands.add('isElementVisible', (element) => {
  cy.get('body').then($body => {
      if ($body.find(element).length) {
          return true
      } else {
          return false
      }
  })
})


Cypress.Commands.add('waitForText', (selector, expectedText, retryDelay = 600, maxRetries = 10) => {
  let retries = 0;

  function checkText() {
    cy.get(selector, { timeout: retryDelay * maxRetries }).then(($el) => {
      if ($el.length === 0) {
        throw new Error(`Element with selector "${selector}" not found`);
      }
      if ($el.text().trim() !== expectedText && retries < maxRetries) {
        retries++;
        cy.wait(retryDelay); // Wait before retrying
        checkText(); // Retry the check
      } else {
        expect($el.text().trim()).to.eq(expectedText);
      }
    });
  }

  checkText();
});


