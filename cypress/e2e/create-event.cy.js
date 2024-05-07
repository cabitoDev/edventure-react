import storageData from '../fixtures/storageData.json'
describe('Create event', () => {
  it('should create a new event', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.get('[data-testid="CREATE_EVENT"]').click()
    cy.get('[data-testid="INPUT_NAME"]').type('Evento hamburguesa')
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="CONCERT"]').click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('input[type=file]').selectFile('cypress/fixtures/hamburguer.png', {
      force: true
    })
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_DATE"]').type('2037-06-01T08:30')
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_ADDRESS"]').type('city')
    cy.get('[data-testid="OPTION_0"]').click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="< 25"]').click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_DESCRIPTION"]').type(
      'El maravilloso evento hamburguesa'
    )
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.contains('Evento hamburguesa').click()
    cy.get('[data-testid="DELETE"]').click()
    cy.get('[data-testid="CONFIRM_DELETE"]').click()
    cy.get('[data-testid="YOUR_EVENTS"]')
  })
})
