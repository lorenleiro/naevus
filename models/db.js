// import mariadb
var mariadb = require('mariadb');

// create a new connection pool
const pool = mariadb.createPool({
  host: "localhost", 
  user: "naevus", 
  password: process.env.DBPASSWORD,
  database: "naevus",
  dateStrings: true
});

// expose the ability to create new connections
module.exports={
  getConnection: function(){
    return new Promise(function(resolve,reject){
      pool.getConnection().then(function(connection){
        resolve(connection);
      }).catch(function(error){
        reject(error);
      });
    });
  }
} 