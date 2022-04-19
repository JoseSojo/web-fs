const mysql = require('mysql'); // Connection to mysql

const { promisify } = require('util'); // module for use asycn await

// Requiere connection a la base de datos (datos)
const { database } = require('./keys.js');

const pool = mysql.createPool(database); // crear connection (pool)

pool.getConnection((err, connection) => {
  if (err) {
    // ERROR: CONNECTION FAILED
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('database connection was close');
    }
    // ERROR:
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('database has to many connection');
    }
    // ERROR: CONNECTION RECHAZADA
    if (err.code === 'ECONNREFUSED') {
      console.error('database connection was refused');
    }
  }

  // Connection success
  if(connection) connection.release(); // start connection
  console.log('   >_  DATABASE IS CONNECTED');
  console.log('');
  return;
});

// MIDDEWARE FOR USE async await
pool.query = promisify(pool.query);

// EXPORTAR CONNCETION
module.exports = pool;
