import storageData from '../fixtures/storageData.json'
import users from '../fixtures/users.json'

describe('Change profile info', () => {
  it('should change correctly', () => {
    let userInfo
    cy.visit('http://127.0.0.1:5173/', {
      onBeforeLoad: function (window) {
        window.localStorage.setItem('persist:root', JSON.stringify(storageData))
      }
    })

    cy.intercept(
      'POST',
      'https://firebasestorage.googleapis.com/v0/b/edventure-419614.appspot.com/o?name=avatars%2F11111'
    ).as('postAvatar')
    cy.intercept('PUT', 'https://key-worm-cabitodev.koyeb.app/users/11111').as(
      'putUser'
    )

    cy.get('[data-testid="NAVBAR_AVATAR"]').click()
    cy.get('[data-testid="PROFILE"]').click()
    cy.get('[data-testid="EDIT"]').click()

    cy.get('[data-testid="NAME"]')
      .invoke('val')
      .then(actualName => {
        if (actualName === users[0].name) {
          userInfo = users[1]
        } else {
          userInfo = users[0]
        }
        cy.get('input[type=file]').selectFile(userInfo.avatar, {
          force: true
        })
        cy.get('[data-testid="EMAIL"]').type(
          '{selectAll}{backSpace}' + userInfo.email
        )
        cy.get('[data-testid="NAME"]').type(
          '{selectAll}{backSpace}' + userInfo.name
        )
        cy.get('[data-testid="LASTNAME"]').type(
          '{selectAll}{backSpace}' + userInfo.lastname
        )
        cy.get('[data-testid="NICKNAME"]').type(
          '{selectAll}{backSpace}' + userInfo.nickname
        )
        cy.get('[data-testid="SAVE"]').click()

        cy.wait('@postAvatar').then(interception => {
          expect(interception.response.statusCode).to.equal(200)
        })
        cy.wait('@putUser').then(interception => {
          expect(interception.response.statusCode).to.equal(200)
        })
      })
  })
})
