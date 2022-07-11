import 'cypress-wait-until'

declare global {
  namespace Cypress {
    interface Chainable {
      resetDB(): Chainable<void>,
    }
  }
}

export {}