/// <reference types="cypress" />

const urlRoot = 'http://localhost:3000'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(`${urlRoot}/login`)
  })

  function showPassword() {
    const btn = cy.get('[data-test=show-password]')
    btn.find('[data-test=show-icon]').should('exist')
    btn.click()
  }

  it('displays email, password & login elements', () => {
    cy.get('[data-test=email]').should('exist')
    cy.get('[data-test=password]').should('exist')
    cy.get('[data-test=show-password]').should('exist')
    cy.get('[data-test=login]').should('exist')
  })

  it('show password if show button is clicked', () => {
    showPassword()
    cy.get('[data-test=password]').should('have.attr', 'type', 'text')
  })

  it('hide password if hide button is clicked', () => {
    showPassword()
    const btn = cy.get('[data-test=show-password]')
    btn.find('[data-test=hide-icon]').should('exist')
    btn.click()
    cy.get('[data-test=password]').should('have.attr', 'type', 'password')
  })

  it('can do login if input data is valid', () => {
    const testEmail = 'joseperez@wipost.io'
    const testPassword = '12345'

    cy.get('[data-test=email]').first().type(`${testEmail}`)
    cy.get('[data-test=password]').first().type(`${testPassword}`)

    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', `${urlRoot}/`)
  })

  it('can not do login if input data is not valid', () => {
    const testEmail = 'joseperez@wipost.io'
    const testPassword = '1234567890'

    cy.get('[data-test=email]').first().type(`${testEmail}`)
    cy.get('[data-test=password]').first().type(`${testPassword}`)

    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', `${urlRoot}/login`)
    cy.get('[data-test=error]').should('exist')
  })

  it('can go to register', () => {
    cy.get('[data-test=register]').first().click()
    cy.url().should('equal', `${urlRoot}/register`)
  })

  it('can go to recover password', () => {
    cy.get('[data-test=recover]').first().click()
    cy.url().should('equal', `${urlRoot}/recover-password`)
  })
})