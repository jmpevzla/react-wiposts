/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes.js'
import { fullRoute } from '../../support/functions'

describe('Profile: Show Profile', () => {

  beforeEach(() => {
    cy.resetDB()
  })
  
  beforeEach(() => {
    cy.visit(routes.profile.show)
  })

  it('displays show profile elements', () => {
    cy.get('[data-test=edit-profile]').should('exist')
    cy.get('[data-test=photo]').should('exist')
    cy.get('[data-test=link-photo]').should('exist')
    cy.get('[data-test=input-photo').should('exist')
    cy.get('[data-test=change-photo').should('exist')

    cy.get('[data-test=username').should('exist')
    cy.get('[data-test=num-posts').should('exist')
    cy.get('[data-test=name').should('exist')
    cy.get('[data-test=description').should('exist')
    cy.get('[data-test=website').should('exist')
  })

  it('displays error if there was one', () => {
    cy.intercept('GET', '*', {
      statusCode: 400,
      body: {
        error: 'Cypress Test Error'
      }
    })
    
    cy.get('[data-test=error').should('exist')

  })

  it('can go to edit profile', () => {
    cy.get('[data-test=edit-profile]').click()
    cy.url().should('equal', fullRoute(routes.profile.edit))
  })

  it('can go to photo profile', () => {
    cy.get('[data-test=link-photo]').click()
    cy.url().should('equal', fullRoute(routes.profile.photo))
  })

})