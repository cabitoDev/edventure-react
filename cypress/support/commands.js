Cypress.Commands.add('textExists', text => {
  return cy.window().then($window => {
    const documentText = $window.document.body.innerText
    console.log(documentText)
    return documentText.includes(text)
  })
})
