const Promise = require('bluebird')
const sqlite = require('sqlite')

const dbPromise = Promise.resolve()
  .then(() => sqlite.open('./piadaruim.sqlite', { Promise }))
  .then(db => db.migrate({ force: 'last' }));

console.log('DB Migration completed')
