import storageData from '../fixtures/storageData.json'

describe('Apply settings', () => {
  it('should apply correctly', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.intercept('PUT', 'https://key-worm-cabitodev.koyeb.app/users/11111').as(
      'putRequest'
    )
    cy.get('[data-testid="NAVBAR_AVATAR"]').click()
    cy.get('[data-testid="SETTINGS"]').click()
    cy.get('[data-testid="CHANGE_EMAIL_TYPE"]').click()
    cy.wait('@putRequest').then(interception => {
      expect(interception.response.statusCode).to.equal(200)
    })
    cy.get('html').should('have.class', 'dark')
    cy.get('[data-testid="CHANGE_THEME"]').click()
    cy.get('html').should('have.class', 'light')
    cy.contains('Cambiar idioma')
    cy.get('[data-testid="LANGUAGE_EN"]').click()
    cy.contains('Change language')
    cy.get('[data-testid="DELETE_ACCOUNT"]').click()
    cy.get('[data-testid="CONFIRM_DELETE"]')
    cy.get('[data-testid="CANCEL"]').click()
    cy.get('[data-testid="LOGOUT"]').click()
    cy.contains('Sign Up')
  })
})
