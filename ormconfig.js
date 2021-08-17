module.exports = {
  "type": "sqlite",
  "database": "./dist/database/database.sqlite",
  "entities": [
     "./dist/models/**.js",
  ],
  "migrations": [
    "./dist/database/migrations/**.js"
  ],
  "cli": {
      "migrationsDir": "./dist/database/migrations"
  }
}
