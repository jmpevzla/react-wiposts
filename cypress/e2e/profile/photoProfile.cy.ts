/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes'
import { fullRoute } from '../../support/functions'
import { resetUploadFolder, resetDatabase } from '../../support/utils'

describe('Profile: Photo Profile', () => {

  before(() => {
    resetDatabase()
    resetUploadFolder()
  })
  
  beforeEach(() => {
    cy.visit(routes.profile.photo)
  })

  it('displays photo profile elements', () => {
    cy.get('[data-test=photo]').should('exist')
    cy.get('[data-test=input-photo').should('exist')
    cy.get('[data-test=change-photo').should('exist')
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

  it('can go to home', () => {
    cy.get('[data-test=home]').click()
    cy.url().should('equal', fullRoute(routes.home))
  })

  it('can go to profile', () => {
    cy.get('[data-test=profile]').click()
    cy.url().should('equal', fullRoute(routes.profile.show))
  })

  it('can change photo', () => {

    cy.waitUntil(function() {
      return cy.get('[data-test=photo]').should('not.have.attr', 'src', '');
    })
   
    cy.get('[data-test=photo]').invoke('attr', 'src').then(photo => {
      cy.get('[data-test=input-photo]').selectFile('cypress/fixtures/profile/my-photo.jpg', { force: true })
      cy.get('[data-test=photo]').should('not.have.attr', 'src', photo)
    })

  })

})