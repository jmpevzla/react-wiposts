export const resetUploadFolder = () => {
  cy.task('resetFolder', {
    folderName: './rest-server/public/uploads',
    folderNameTests: './rest-server/public/uploads-tests'
  })
}