import storageData from '../fixtures/storageData.json'
import events from '../fixtures/events.json'
describe('Create event and delete', () => {
  it('should create a new event and delete it', () => {
    let eventInfo
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
    cy.intercept('PUT', '**/events/**').as('editEvent')
    cy.get('[data-testid="MY_EVENTS"]').click()
    cy.contains('Seguidores')
    cy.textExists(events[0].name).then(res => {
      if (res) {
        eventInfo = events[1]
        cy.contains(events[0].name).click()
      } else {
        eventInfo = events[0]
        cy.contains(events[1].name).click()
      }
      cy.get('[data-testid="EDIT"]').click()
      cy.get('[data-testid="INPUT_NAME"]').type(
        `{selectAll}{backSpace}${eventInfo.name}`
      )
      cy.get('[data-testid="INPUT_DATE"]').type(eventInfo.date)
      cy.get('[data-testid="SELECT_TYPE"]').click()
      cy.get(`[data-testid="${eventInfo.type}"]`).click().wait(200)
      cy.get('[data-testid="SELECT_ASSISTANTS"]').click()
      cy.get(`[data-testid="${eventInfo.assistants}"]`).click()
      cy.get('[data-testid="INPUT_ADDRESS"]').type(
        `{selectAll}{backSpace}${eventInfo.address}`,
        { force: true }
      )

      cy.contains(eventInfo.address).click()
      cy.get('[data-testid="INPUT_DESCRIPTION"]').type(
        `{selectAll}{backSpace}${eventInfo.description}`
      )
      cy.get('[data-testid="SAVE"]').click()
      cy.wait('@editEvent').its('response.statusCode').should('eq', 200)
      cy.contains(eventInfo.textDate)
      cy.contains(eventInfo.name)
      cy.contains(eventInfo.textType)
      cy.contains(eventInfo.address)
      cy.contains(eventInfo.description)
      cy.contains(eventInfo.assistants)
    })
  })
})
