import storageData from '../fixtures/storageData.json'
describe('Follow event', () => {
  it('should filter correctly', () => {
    const eventInfo = {
      name: 'OtherEventTest1'
    }
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.get('[data-testid="EXPLORE_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.contains(eventInfo.name).click()
    cy.get('[data-testid="FOLLOW"]').click()
    cy.get('[data-testid="MY_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.contains(eventInfo.name)
    cy.get('[data-testid="EXPLORE_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.get('[data-testid="FILTER_NOT_FOLLOWING"]').click()
    cy.textExists(eventInfo.name).should('be.false')
    cy.get('[data-testid="FILTER_FOLLOWING"]').click()
    cy.contains(eventInfo.name).click()
    cy.get('[data-testid="FOLLOW"]').click()
    cy.get('[data-testid="MY_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.textExists(eventInfo.name).should('be.false')
    cy.get('[data-testid="EXPLORE_EVENTS"]').click()
    cy.get('[data-testid="FILTER_SEARCH"]').type(eventInfo.name)
    cy.get('[data-testid="FILTER_FOLLOWING"]').click()
    cy.textExists(eventInfo.name).should('be.false')
    cy.get('[data-testid="FILTER_NOT_FOLLOWING"]').click()
    cy.contains(eventInfo.name)
  })
})
