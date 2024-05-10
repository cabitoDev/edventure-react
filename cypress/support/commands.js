Cypress.Commands.add('textExists', text => {
  return cy.window().then($window => {
    const documentText = $window.document.body.innerText
    return documentText.includes(text)
  })
})
