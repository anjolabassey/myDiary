import pg from 'pg';

// process.env.DATABASE_URL ||
require('dotenv').config();

// const connectionString = process.env.CONSTRING;

const client = new pg.Client(process.env.CONSTRING);

const db = () => {
  client.connect((err) => {
    if (err) {
      console.error('connection error', err);
    } else {
      console.log('Connected to the database');
    }
  });
  return client;
};

client.query('CREATE TABLE IF NOT EXISTS entries (id SERIAL PRIMARY KEY, title CHARACTER VARYING(50) NOT NULL, body CHARACTER VARYING(1000) NOT NULL, created_at TIMESTAMP NOT NULL DEFAULT(NOW()), last_updated TIMESTAMP NOT NULL DEFAULT(NOW()))', (err, res) => {
  if (err) {
    console.log(err);
  } else {
    console.log('Created entries table succesfully');
  }
});

export { db, client };