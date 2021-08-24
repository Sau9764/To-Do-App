require('dotenv').config()

console.log(process.env.NODE_ENV)

module.exports = {
  "development": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.host,
    "dialect": "mysql"
  },
  "test": {
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_DATABASE,
    "host": process.env.host,
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": "Root@123",
    "database": "todoApplication",
    "host": process.env.host,
    "dialect": "mysql"
  }
}
