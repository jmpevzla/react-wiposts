/// <reference types="cypress" />
/// <reference types="../../support" />

import { fullRoute } from '../../support/functions'
import routes from '../../fixtures/routes.js'
import { email, emailError } from '../../fixtures/recoverPassword/recover.json'

describe('Recover Password Page', () => {
  beforeEach(() => {
    cy.resetDB()
  })
  
  beforeEach(() => {
    cy.visit(routes.recover.init)
  })

  it('displays email & recover elements', () => {
    cy.get('[data-test=email]').should('exist')
    cy.get('[data-test=recover]').should('exist')
  })

  it('can do recover if input data is valid', () => {
    cy.get('[data-test=email]').first().type(`${email}`)

    cy.get('[data-test=recover]').first().click()
    const url = (contain: string) => cy.url().should('contain', contain)

    url(fullRoute(''))
    url('recover-password')
    url('code')
  })

  it('can not do recover if input data is not valid', () => {
    cy.get('[data-test=email]').first().type(`${emailError}`)

    cy.get('[data-test=recover]').first().click()
    cy.get('[data-test=error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.init))
  })

  it('can not do recover if fields are empty', () => {
    cy.get('[data-test=recover]').first().click()
    
    cy.get('[data-test=email-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.init))
  })

  it('can go to login', () => {
    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(routes.login))
  })
})