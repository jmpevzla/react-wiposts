/// <reference types="cypress" />

const { rmdir, copyFile, rm } = require('fs')
const ncp = require('ncp').ncp;

function resetFolder({ folderName, folderNameTests }) {
  console.log('deleting folder %s', folderName)

  return new Promise((resolve, reject) => {
    rmdir(folderName, { maxRetries: 10, recursive: true }, (err) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      ncp.limit = 16;
      console.log('copying folder %s', folderNameTests)
      ncp(folderNameTests, folderName, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
        resolve(null)
      });
    })
  })
}

function resetDatabase({ databaseName, databaseNameTests }) {
  console.log('deleting db %s', databaseName)

  return new Promise((resolve, reject) => {
    rm(databaseName, { maxRetries: 10, recursive: true }, (err) => {
      if (err) {
        console.error(err)
        return reject(err)
      }

      console.log('copying db %s', databaseNameTests)
      copyFile(databaseNameTests, databaseName, function (err) {
        if (err) {
          return console.error(err);
        }
        console.log('done!');
        resolve(null)
      });
    })
  })
}

export default (on: Cypress.PluginEvents, config: Cypress.PluginConfigOptions) => {
  on('task', {
    resetFolder,
    resetDatabase
  })
} 