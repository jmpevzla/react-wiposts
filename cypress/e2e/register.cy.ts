/// <reference types="cypress" />
/// <reference types="../support" />

import { fullRoute 
  , showPassword, hidePassword
  ,showConfPassword, hideConfPassword } from '../support/functions'
import routes from '../fixtures/routes.js'
import { username, email, password
  , confPassword, confPasswordError } from '../fixtures/register.json'

describe('Register Page', () => {
  before(() => {
    cy.resetDB()
  })

  beforeEach(() => {
    cy.visit(routes.register)
  })

  it('displays email, username, password, confPassword & register elements', () => {
    cy.get('[data-test=email]').should('exist')
    cy.get('[data-test=username]').should('exist')
    cy.get('[data-test=password]').should('exist')
    cy.get('[data-test=conf-password]').should('exist')
    cy.get('[data-test=show-password]').should('exist')
    cy.get('[data-test=show-conf-password]').should('exist')
    cy.get('[data-test=register]').should('exist')
  })

  it('show password if show button is clicked', () => {
    showPassword()
    cy.get('[data-test=password]').should('have.attr', 'type', 'text')
  })

  it('hide password if hide button is clicked', () => {
    hidePassword()
    cy.get('[data-test=password]').should('have.attr', 'type', 'password')
  })

  it('show confirm password if show button is clicked', () => {
    showConfPassword()
    cy.get('[data-test=conf-password]').should('have.attr', 'type', 'text')
  })

  it('hide confirm password if hide button is clicked', () => {
    hideConfPassword()
    cy.get('[data-test=conf-password]').should('have.attr', 'type', 'password')
  })

  it('can do register if input data is valid', () => {
    cy.get('[data-test=email]').first().type(`${email}`)
    cy.get('[data-test=username]').first().type(`${username}`)
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPassword}`)

    cy.get('[data-test=register]').first().click()
    cy.url().should('equal', fullRoute(routes.home))
  })

  it('can not do register if confirm password is not valid', () => {
    cy.get('[data-test=email]').first().type(`${email}`)
    cy.get('[data-test=username]').first().type(`${username}`)
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPasswordError}`)

    cy.get('[data-test=register]').first().click()
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.register))
  })

  it('can not do register if fields are empty', () => {
    cy.get('[data-test=register]').first().click()
    
    cy.get('[data-test=email-error]').should('exist')
    cy.get('[data-test=username-error]').should('exist')
    cy.get('[data-test=password-error]').should('exist')
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.register))
  })

  it('can go to login', () => {
    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(routes.login))
  })

})