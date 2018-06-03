// require knex file
// connect to pg
const knex = require('knex')({
  client: 'pg',
  connection: {
    host : '127.0.0.1',
    database : 'monday-demo'
  }
});

// CRUD commands

knex('allergies')
  .then(data => {
    console.log('SELECT', data)
  })
  .catch(err => {
    console.log('BAD THING...', err)
  })

knex('allergies')
  .insert({ allergen: 'grasses', pollen_count: 3 })
  .returning('*') // <--- common pattern with insertions
  .then(data => {
    console.log("RETURN FROM INSERT", data);
  })
let user_id = 4
knex('allergies')
  .select('id', 'allergen')
  .where('id', +(user_id)) /* <-- sanitizes user input '+' means convert to number */ 
  .then(data => {
    console.log("SELECT WITH WHERE CLAUSE", data);
  })

knex('allergies')
  .update({ allergen: 'grasses' })
  .where('id', 3)
  .then(data => console.log("RETURN FROM UPDATE", data))

knex('allergies')
  .delete()
  .where('id', 2)
  .returning('*')
  .then(data => console.log("RETURN FROM DELETE", data))
