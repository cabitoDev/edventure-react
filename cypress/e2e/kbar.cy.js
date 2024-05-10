import storageData from '../fixtures/storageData.json'
describe('Search in kbar', () => {
  it('should search correctly', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.get('[data-testid="KBAR"]').click().type('ajus')
    cy.textExists('Perfil').should('be.false')
    cy.contains('Ajustes').click()
    cy.url().should('include', 'settings').wait(300)
    cy.get('[data-testid="KBAR"]').click().type('perfi')
    cy.textExists('Inicio').should('be.false')
    cy.contains('Perfil').click()
    cy.url().should('include', 'profile')
  })
})
