/// <reference types="cypress" />

const folderTests = './rest-sql/for_tests'

export const resetUploadFolder = () => {  
  const folderDest = './rest-sql/public'

  cy.task('resetFolder', {
    folderName: `${folderDest}/uploads`, 
    folderNameTests: `${folderTests}/uploads_tests`
  })
}

export const resetDatabase = () => {
  const folderDest = './rest-sql'

  cy.task('resetDatabase', {
    databaseName: `${folderDest}/data.sqlite`,
    databaseNameTests: `${folderTests}/data.sqlite.tests`
  })
}

