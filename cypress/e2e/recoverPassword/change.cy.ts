/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes.js'
import { fullRoute
  ,showPassword, hidePassword
  ,showConfPassword, hideConfPassword } from '../../support/functions'
import { password
  ,confPassword, confPasswordError } from '../../fixtures/recoverPassword/change.json'

describe('Recover Password Change Page', () => {

  before(() => {
    cy.resetDB()
  })
  
  beforeEach(() => {
    cy.visit(routes.recover.change())
  })

  it('displays password, conf-password & change elements', () => {
    cy.get('[data-test=password]').should('exist')
    cy.get('[data-test=conf-password]').should('exist')
    cy.get('[data-test=change]').should('exist')
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

  it('can do change if input data is valid', () => {
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPassword}`)

    cy.get('[data-test=change]').first().click()
    cy.url().should('equal', fullRoute(routes.login))
  })

  it('can not do change if input data confirm is not valid', () => {
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPasswordError}`)

    cy.get('[data-test=change]').first().click()
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.change()))
  })

  it('can not do change if fields are empty', () => {
    cy.get('[data-test=change]').first().click()

    cy.get('[data-test=password-error]').should('exist')
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.change()))
  })

  it('can go to login', () => {
    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(routes.login))
  })

})