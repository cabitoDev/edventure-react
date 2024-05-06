describe('Login', () => {
  it('should login correctly', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad (win) {
        cy.stub(win, 'open').as('open')
      }
    })
    cy.get('[data-testid="SIGN_UP"]').click()
    cy.get('.auth0-lock-social-button-text', { timeout: 10000 }).click()
    cy.get('@open').should('have.been.calledOnce')
  })
})
