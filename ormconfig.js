module.exports = {
  "type": "sqlite",
  "database": process.env.DATABASE,
  "entities": [
     process.env.ENTITIES,
  ],
  "migrations": [
     process.env.MIGRATIONS
  ],
  "cli": {
      "migrationsDir": process.env.CLIMIGRATIONSDIR
  }
}
