/// <reference types="cypress" />

export function fullRoute(route: string) {
  return Cypress.config('baseUrl') + route
}

export function showPassword(select = 'show-password') {
  const btn = cy.get(`[data-test=${select}]`)
  btn.find('[data-test=show-icon]').should('exist')
  btn.click()
}

export function hidePassword(select = 'show-password') {
  showPassword(select)
  const btn = cy.get(`[data-test=${select}]`)
  btn.find('[data-test=hide-icon]').should('exist')
  btn.click()
}

export function showConfPassword() {
  showPassword('show-conf-password')
}

export function hideConfPassword() {
  hidePassword('show-conf-password')
}