const Database = require('better-sqlite3')
const path = require('path')
const dbPath = process.env.SQLITE_DB_PATH || path.join(__dirname, '..', 'data', 'ecom.db')
const db = new Database(dbPath)
db.pragma('foreign_keys = ON')
module.exports = db