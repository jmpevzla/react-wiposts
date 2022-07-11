/// <reference types="cypress" />
/// <reference types="../../support" />

import routes from '../../fixtures/routes.js'
import { fullRoute } from '../../support/functions'
import { resetUploadFolder } from '../../support/utils'
import { 
  fullName, description,
  gender, birthday,
  phone, website,
  websiteError
 } from '../../fixtures/profile/edit.json'

describe('Profile: Edit Profile', () => {

  before(() => {
    cy.resetDB()
    resetUploadFolder()
  })
  
  beforeEach(() => {
    cy.visit(routes.profile.edit)
  })

  it('displays edit profile elements', () => {
    cy.get('[data-test=photo]').should('exist')
    cy.get('[data-test=link-photo]').should('exist')
    cy.get('[data-test=input-photo]').should('exist')
    cy.get('[data-test=change-photo]').should('exist')

    cy.get('[data-test=username]').should('exist')
    cy.get('[data-test=email]').should('exist')
    cy.get('[data-test=change-email]').should('exist')
    cy.get('[data-test=change-password]').should('exist')
    cy.get('[data-test=full-name]').should('exist')
    cy.get('[data-test=phone]').should('exist')
    cy.get('[data-test=birthday]').should('exist')
    cy.get('[data-test=gender]').should('exist')
    cy.get('[data-test=description]').should('exist')
    cy.get('[data-test=website]').should('exist')

    cy.get('[data-test=edit]').should('exist')
  })

  it('can go to photo profile', () => {
    cy.get('[data-test=link-photo]').click()
    cy.url().should('equal', fullRoute(routes.profile.photo))
  })

  it('can not edit username', () => {
    cy.get('[data-test=username]').type('testing', { force: true })
    cy.get('[data-test=username]').should('not.equal', 'testing')
  })

  it('can not edit email', () => {
    cy.get('[data-test=email]').type('test@test.com', { force: true })
    cy.get('[data-test=email]').should('not.equal', 'test@test.com')
  })

  it('can go to change email', () => {
    cy.get('[data-test=change-email]').click()
    cy.url().should('equal', fullRoute(routes.profile.changeEmail))
  })

  it('can go to change password', () => {
    cy.get('[data-test=change-password]').click()
    cy.url().should('equal', fullRoute(routes.profile.changePassword))
  })

  it('can do edit if input data is valid', () => {
    cy.get('[data-test=full-name]').clear().type(`${fullName}`)
    cy.get('[data-test=phone]').clear().type(`${phone}`)
    cy.get('[data-test=birthday]').clear().type(`${birthday}`)
    cy.get('[data-test=gender]').select(`${gender}`)
    cy.get('[data-test=description]').clear().type(`${description}`)
    cy.get('[data-test=website]').clear().type(`${website}`)

    cy.get('[data-test=edit]').click()
    cy.url().should('equal', fullRoute(routes.profile.show))
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

  it('can not do edit if input website is not valid', () => {
    const website = () => cy.get('[data-test=website]')
    website().invoke('val').then(value => {

      website().clear().type(`${websiteError}`)

      cy.get('[data-test=edit]').click()
      cy.url().should('equal', fullRoute(routes.profile.edit))

      cy.reload()
      website().should('have.value', value)
    }) 
    
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