declare global {
  namespace Cypress {
    interface Chainable {
      resetDB(): Chainable<void>,
    }
  }
}

export {}