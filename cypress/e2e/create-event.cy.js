import storageData from '../fixtures/storageData.json'
import events from '../fixtures/events.json'

describe('Create event and delete', () => {
  it('should create a new event and delete it', () => {
    const eventInfo = events[2]

    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })

    cy.intercept('POST', '**/events').as('createEvent')
    cy.intercept('DELETE', '**/events/*').as('deleteEvent')

    cy.get('[data-testid="CREATE_EVENT"]').click()
    cy.get('[data-testid="INPUT_NAME"]').type(eventInfo.name)
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get(`[data-testid="${eventInfo.type}"]`).click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('input[type=file]').selectFile(eventInfo.image, { force: true })
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_DATE"]').type(eventInfo.date)
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_ADDRESS"]').type(eventInfo.address)
    cy.contains(eventInfo.address).click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get(`[data-testid="${eventInfo.assistants}"]`).click()
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.get('[data-testid="INPUT_DESCRIPTION"]').type(eventInfo.description)
    cy.get('[data-testid="BUTTON_NEXT"]').click()
    cy.wait('@createEvent').its('response.statusCode').should('eq', 201)
    cy.contains(eventInfo.name).click()
    cy.contains(eventInfo.textDate)
    cy.contains(eventInfo.name)
    cy.contains(eventInfo.textType)
    cy.contains(eventInfo.address)
    cy.contains(eventInfo.description)
    cy.contains(eventInfo.assistants)
    cy.get('[data-testid="CHART"]').click()
    cy.contains('no hay estadísticas')
    cy.get('.absolute').click()
    cy.get('[data-testid="DELETE"]').click()
    cy.get('[data-testid="CONFIRM_DELETE"]').click()
    cy.wait('@deleteEvent').its('response.statusCode').should('eq', 204)
    cy.get('[data-testid="YOUR_EVENTS"]')
  })
})
