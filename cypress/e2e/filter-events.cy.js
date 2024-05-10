import storageData from '../fixtures/storageData.json'
describe('Filter events', () => {
  it('should filter correctly', () => {
    const eventInfo = {
      name: 'EventForTesting',
      type: 'CONFERENCE'
    }
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.get('[data-testid="MY_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.contains(eventInfo.name)
    cy.get('[data-testid="FILTER_TYPE"]').click()
    cy.get('[data-testid="CONCERT"]').click()
    cy.textExists(eventInfo.name).should('be.false')
    cy.get('[data-testid="FILTER_TYPE"]').click()
    cy.get('[data-testid="CONFERENCE"]').click()
    cy.contains(eventInfo.name)
    cy.get('[data-testid="FILTER_FOLLOWING"]').click()
    cy.textExists(eventInfo.name).should('be.false')
    cy.get('[data-testid="FILTER_OWNER"]').click()
    cy.contains(eventInfo.name)
    cy.contains('Creado')
  })
})
