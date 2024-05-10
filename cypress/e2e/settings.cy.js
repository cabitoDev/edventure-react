import storageData from '../fixtures/storageData.json'
describe('Apply settings', () => {
  it('should apply correctly', () => {
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })
  })
})
