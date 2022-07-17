/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes.js'
import { fullRoute
  ,showPassword, hidePassword
  ,showConfPassword, hideConfPassword } from '../../support/functions'
import { oldPassword, password
  ,oldPasswordError
  ,confPassword, confPasswordError } from '../../fixtures/profile/changePassword.json'
import { resetDatabase } from '../../support/utils'

describe('Profile: Change Password', () => {

  before(() => {
    resetDatabase()    
  })
  
  beforeEach(() => {
    cy.visit(routes.profile.changePassword)
  })

  it('displays old-password, password, conf-password & change elements', () => {
    cy.get('[data-test=old-password]').should('exist')
    cy.get('[data-test=password]').should('exist')
    cy.get('[data-test=conf-password]').should('exist')
    cy.get('[data-test=change]').should('exist')
  })

  it('show old-password if show button is clicked', () => {
    showPassword('show-old-password')
    cy.get('[data-test=old-password]').should('have.attr', 'type', 'text')
  })

  it('hide old-password if hide button is clicked', () => {
    hidePassword('show-old-password')
    cy.get('[data-test=old-password]').should('have.attr', 'type', 'password')
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
    cy.get('[data-test=old-password]').first().type(`${oldPassword}`)
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPassword}`)

    cy.get('[data-test=change]').first().click()
    cy.url().should('equal', fullRoute(routes.profile.show))
  })

  it('can not do change if input data is not valid', () => {
    cy.get('[data-test=old-password]').first().type(`${oldPasswordError}`)
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPassword}`)

    cy.get('[data-test=change]').first().click()
    cy.get('[data-test=error]').should('exist')
    cy.url().should('equal', fullRoute(routes.profile.changePassword))
  })

  it('can not do change if input conf-password is not valid', () => {
    cy.get('[data-test=old-password]').first().type(`${oldPassword}`)
    cy.get('[data-test=password]').first().type(`${password}`)
    cy.get('[data-test=conf-password]').first().type(`${confPasswordError}`)

    cy.get('[data-test=change]').first().click()
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.profile.changePassword))
  })

  it('can not do change if fields are empty', () => {
    cy.get('[data-test=change]').first().click()

    cy.get('[data-test=old-password-error]').should('exist')
    cy.get('[data-test=password-error]').should('exist')
    cy.get('[data-test=conf-password-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.profile.changePassword))
  })

  it('can go to profile', () => {
    cy.get('[data-test=profile]').first().click()
    cy.url().should('equal', fullRoute(routes.profile.show))
  })

})