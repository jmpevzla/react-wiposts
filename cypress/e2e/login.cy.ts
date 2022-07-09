/// <reference types="cypress" />

import { fullRoute, showPassword
  , hidePassword } from '../support/functions'
import { login, home
  , recover, register } from '../fixtures/routes.json'
import { email, password
  , passwordError } from '../fixtures/login.json'

describe('Login Page', () => {
  beforeEach(() => {
    cy.visit(login)
  })

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
    hidePassword()
    cy.get('[data-test=password]').should('have.attr', 'type', 'password')
  })

  it('can do login if input data is valid', () => {
    cy.get('[data-test=email]').first().type(`${email}`)
    cy.get('[data-test=password]').first().type(`${password}`)

    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(home))
  })

  it('can not do login if input data is not valid', () => {
    cy.get('[data-test=email]').first().type(`${email}`)
    cy.get('[data-test=password]').first().type(`${passwordError}`)

    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(login))
    cy.get('[data-test=error]').should('exist')
  })

  it('can not do login if fields are empty', () => {
    cy.get('[data-test=login]').first().click()
    
    cy.get('[data-test=email-error]').should('exist')
    cy.get('[data-test=password-error]').should('exist')
    cy.url().should('equal', fullRoute(login))
  })

  it('can go to register', () => {
    cy.get('[data-test=register]').first().click()
    cy.url().should('equal', fullRoute(register))
  })

  it('can go to recover password', () => {
    cy.get('[data-test=recover]').first().click()
    cy.url().should('equal', fullRoute(recover))
  })
})