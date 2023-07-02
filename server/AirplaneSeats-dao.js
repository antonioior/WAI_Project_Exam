const sqlite = require('sqlite3');
const {Local, Regional, International, Bookings, Seats} = require('./AirplaneSeatsModels');

//open the database
const db = new sqlite.Database('AirplaneSeats.sqlite', (err) => {
  if (err) throw err;
});

//Operation on LOCAL PLANE
//GET SEATS
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

//Operation on INTERNATIONAL PLANE
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