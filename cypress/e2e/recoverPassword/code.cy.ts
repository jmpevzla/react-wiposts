/// <reference types="cypress" />
/// <reference types="../../support" />

import { fullRoute } from '../../support/functions'
import routes from '../../fixtures/routes.js'
import { code, codeError
  ,codegt, codelt } from '../../fixtures/recoverPassword/code.json'
import { resetDatabase } from '../../support/utils'

describe('Recover Password Code Page', () => {
  before(() => {
    resetDatabase()
  })
  
  beforeEach(() => {
    cy.visit(routes.recover.code())
  })

  it('displays code & recover elements', () => {
    cy.get('[data-test=code]').should('exist')
    cy.get('[data-test=create]').should('exist')
    cy.get('[data-test=send-code]').should('exist')
  })

  it('can do create if input data is valid', () => {
    cy.get('[data-test=code]').first().type(`${code}`)

    cy.get('[data-test=create]').first().click()
    const url = (contain: string) => cy.url().should('contain', contain)

    url(fullRoute(''))
    url('recover-password')
    url('code')
    url('change')
  })

  it('can not do create if input data is not valid', () => {
    cy.get('[data-test=code]').first().type(`${codeError}`)

    cy.get('[data-test=create]').first().click()
    cy.get('[data-test=error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.code()))
  })

  it('can not do create if fields are empty', () => {
    cy.get('[data-test=create]').first().click()
    
    cy.get('[data-test=code-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.code()))
  })

  it('can not do create if code gt or lt to 6 chars', () => {
    cy.get('[data-test=code]').first().type(`${codelt}`)
    cy.get('[data-test=create]').first().click()
    
    cy.get('[data-test=code-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.code()))

    cy.get('[data-test=code]').first().type(`${codegt}`)
    cy.get('[data-test=create]').first().click()
    
    cy.get('[data-test=code-error]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.code()))
  })

  it('can give me a new code', () => {
    cy.get('[data-test=send-code]').first().click()
    
    cy.get('[data-test=result-code]').should('exist')
    cy.url().should('equal', fullRoute(routes.recover.code()))
  })

  it('can go to login', () => {
    cy.get('[data-test=login]').first().click()
    cy.url().should('equal', fullRoute(routes.login))
  })

})