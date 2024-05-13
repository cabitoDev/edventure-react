import storageDataExpired from '../fixtures/storageDataExpired.json'
describe('Search in kbar', () => {
  it('should search correctly', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem(
          'persist:root',
          JSON.stringify(storageDataExpired)
        )
      }
    })
    cy.intercept('GET', 'https://key-worm-cabitodev.koyeb.app/users/11111').as(
      'getUser'
    )
    cy.get('[data-testid="MY_EVENTS"]').click()
    cy.wait('@getUser').then(interception => {
      expect(interception.response.statusCode).to.equal(401)
    })
    cy.get('[data-testid="ACCEPT"]').click()
    cy.contains('Iniciar sesión')
  })
})
