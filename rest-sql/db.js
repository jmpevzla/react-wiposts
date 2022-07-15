const sqlite3 = require('sqlite3').verbose();
const sqlite3Trans = require('sqlite3-trans');

const file = './data.sqlite'

const getDb = () => new sqlite3.Database(file)
const getDbTrans = () => sqlite3Trans.wrap(getDb())

module.exports = {
  getDb,
  getDbTrans
}