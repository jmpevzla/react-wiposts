/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes.js'
import { fullRoute } from '../../support/functions'
import { resetUploadFolder, resetDatabase } from '../../support/utils'

describe('Profile: Show Profile', () => {

  before(() => {
    resetDatabase()
    resetUploadFolder()
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