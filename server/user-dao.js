'use strict';

//INIT
const sqlite = require('sqlite3');
const crypto = require('crypto');
const db = new sqlite.Database('AirplaneSeats.sqlite', (err) => {
  if (err) throw err;
});

//USER METHO
//GET
exports.getUser = (email, password) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE Email = ?';
    db.get(sql, [email], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve(false); 
      }
      else {
        const user = {id: row.Id, name: row.Name,email:row.Email};
        
        crypto.scrypt(password, row.Salt, 32, function(err, hashedPassword) {
          if (err) reject(err);
          if(!crypto.timingSafeEqual(Buffer.from(row.Password, 'hex'), hashedPassword))
            resolve(false);
          else
            resolve(user);
        });
      }
    });
  });
};

exports.getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const sql = 'SELECT * FROM User WHERE Id = ?';
    db.get(sql, [id], (err, row) => {
      if (err) { 
        reject(err); 
      }
      else if (row === undefined) { 
        resolve({error: 'User not found!'}); 
      }
      else {
        const user = {id: row.Id, username: row.Email, name: row.Name};
        resolve(user);
      }
    });
  });
};
