const sqlite = require('sqlite3');
const {Local, Regional, International, Bookings, Seats} = require('./AirplaneSeatsModels');

//open the database
const db = new sqlite.Database('AirplaneSeats.sqlite', (err) => {
  if (err) throw err;
});

//OPERATION ON LOCAL PLANE
//GET seats
exports.getLocalSeats = () => {
  return new Promise((resolve, reject) =>{
    const query = 'SELECT * FROM Local';
    db.all(query, [], (err, rows)=>{
      if(err)
        reject(err);
      const seats = rows.map(row => new Local(row.Id, row.A, row.B, row.C, row.D));
      resolve(seats);
    })
  })
}

//POST UPDATE seats
exports.reserveLocalSeats = (Id, column) => {
  let query;
    switch(column) {
      case 'A' : 
        query = 'UPDATE Local SET A = ? WHERE Id=?';
        break;
      case 'B' :
        query = 'UPDATE Local SET B = ? WHERE Id=?';
        break;
      case 'C' :
        query = 'UPDATE Local SET C = ? WHERE Id=?';
        break;
      case 'D' :
        query = 'UPDATE Local SET C = ? WHERE Id=?';
        break;
      default : 
        reject(err);
        break;
    }
  return new Promise((resolve, reject) => {
    db.all(query, [1, Id], (err, rows) => {
      if(err)
        reject(err);
      resolve({'seat' : 'reserved'});
    })
  })
}

//Operation on REGIONAL PLANE
//GET SEATS
exports.getRegionalSeats = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Regional';
    db.all(query, [], (err, rows) => {
      if(err)
        reject(err);
      const seats = rows.map(row => new Regional(row.Id, row.A, row.B, row.C, row.D, row.E));
      resolve(seats);
    })
  })
}

//POST UPDATE SEATS
exports.reserveRegionalSeats = (Id, column) => {
  let query;
  switch(column) {
    case 'A':
      query = 'UPDATE Regional SET A = ? WHERE Id = ?'; 
      break;
    case 'B':
      query = 'UPDATE Regional SET B = ? WHERE Id = ?';
      break;
    case 'C':
      query = 'UPDATE Regional SET C = ? WHERE Id = ?';
      break;
    case 'D':
      query = 'UPDATE Regional SET D = ? WHERE Id = ?';
      break;
    case 'E':
      query = 'UPDATE Regional SET E = ? WHERE Id = ?';
      break;
    default:
      reject(err);
      break;
  }
  return new Promise((resolve, reject) => {
    db.all(query, [1, Id], (err, rows) => {
      if (err)
        reject(err);
      resolve({'seat' : 'reserved'});
    })
  })
}

//OPERATION ON INTERNATIONAL PLANE
//GET SEATS
exports.getInternationalSeats = () => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM International';
    db.all(query, [], (err,rows) => {
      if(err)
        reject(err);
      const seats = rows.map(row => new International(row.Id, row.A, row.B, row.C, row.D, row.E, row.F));
      resolve(seats);
    })
  })
}

//POST UPDATE SEATS
exports.reserveInternationalSeats = (Id, column) => {
  let query;
  switch(column) {
    case 'A':
      query = 'UPDATE International SET A = ? WHERE Id = ?'; 
      break;
    case 'B':
      query = 'UPDATE International SET B = ? WHERE Id = ?';
      break;
    case 'C':
      query = 'UPDATE International SET C = ? WHERE Id = ?';
      break;
    case 'D':
      query = 'UPDATE International SET D = ? WHERE Id = ?';
      break;
    case 'E':
      query = 'UPDATE International SET E = ? WHERE Id = ?';
      break;
    case 'F':
      query = 'UPDATE International SET F = ? WHERE Id = ?';
      break;
    default:
      reject(err);
      break;
  }
  return new Promise((resolve, reject) => {
    db.all(query, [1, Id], (err, rows) => {
      if(err)
        reject(err);
      resolve({'seat' : 'reserved'});
    })
  })
}