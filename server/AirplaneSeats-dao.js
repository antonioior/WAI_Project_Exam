const sqlite = require('sqlite3');
const {Local, Regional, International, Bookings} = require('./AirplaneSeatsModels');

//open the database
const db = new sqlite.Database('AirplaneSeats.sqlite', (err) => {
  if (err) throw err;
});

/*****************************/
/*                           */
/*  OPERATION LOCAL PLANE    */
/*                           */
/*****************************/
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

//GET seat to obtain if a specific place is free or not
exports.getLocalSeat = (id, column) => {
  let query;
  switch(column){
    case 'A':
      query = 'SELECT Id, A AS Column FROM Local WHERE Id=?';
      break;
    case 'B':
      query = 'SELECT Id, B AS Column FROM Local WHERE Id=?';
      break;
    case 'C':
      query = 'SELECT Id, C AS Column FROM Local WHERE Id=?';
      break
    case 'D':
      query = 'SELECT Id, D AS Column FROM Local WHERE Id=?';
      break;
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    db.all(query, [id], (err, rows) => {
      if(err)
        reject(err);
      resolve({
        "Id" : rows[0].Id,
        "Column" : [column][0],
        "Occupied" : rows[0].Column
      })
    })
  })
}

//PATCH UPDATE seats
exports.reserveLocalSeats = (Id, column, reserve) => {
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
        query = 'UPDATE Local SET D = ? WHERE Id=?';
        break;
      default : 
        reject(err);
        break;
    }
  return new Promise((resolve, reject) => {
    db.all(query, [reserve, Id], (err, rows) => {
      if(err)
        reject(err);
      if(reserve)
        resolve({'reserved' : 1});
      resolve({'released' : 0})
    })
  })
}

/********************************/
/*                              */
/*   OPERATION REGIONAL PLANE   */
/*                              */
/********************************/
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

//GET seat to obtain if a specific place is free or not
exports.getRegionalSeat = (id, column) => {
  let query;
  switch(column){
    case 'A':
      query = 'SELECT Id, A AS Column FROM Regional WHERE Id=?';
      break;
    case 'B':
      query = 'SELECT Id, B AS Column FROM Regional WHERE Id=?';
      break;
    case 'C':
      query = 'SELECT Id, C AS Column FROM Regional WHERE Id=?';
      break
    case 'D':
      query = 'SELECT Id, D AS Column FROM Regional WHERE Id=?';
      break;
    case 'E':
      query = 'SELECT Id, E AS Column FROM Regional WHERE Id=?';
      break;
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    db.all(query, [id], (err, rows) => {
      if(err)
        reject(err);
      resolve({
        "Id" : rows[0].Id,
        "Column" : [column][0],
        "Occupied" : rows[0].Column
      })
    })
  })
}

//PATCH UPDATE SEATS
exports.reserveRegionalSeats = (Id, column, reserve) => {
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
    db.all(query, [reserve, Id], (err, rows) => {
      if (err)
        reject(err);
      if(reserve)
        resolve({'reserved' : 1});
      resolve({'released' : 0})
    })
  })
}

/**********************************/
/*                                */
/* OPERATION INTERNATIONAL PLANE  */
/*                                */
/**********************************/
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

//GET single seat
exports.getInternationalSeat = (id, column) => {
  let query;
  switch(column){
    case 'A':
      query = 'SELECT Id, A AS Column FROM International WHERE Id=?';
      break;
    case 'B':
      query = 'SELECT Id, B AS Column FROM International WHERE Id=?';
      break;
    case 'C':
      query = 'SELECT Id, C AS Column FROM International WHERE Id=?';
      break
    case 'D':
      query = 'SELECT Id, D AS Column FROM International WHERE Id=?';
      break;
    case 'E':
      query = 'SELECT Id, E AS Column FROM International WHERE Id=?';
      break;
    case 'F':
      query = 'SELECT Id, F AS Column FROM International WHERE Id=?';
    default:
      break;
  }
  return new Promise((resolve, reject) => {
    db.all(query, [id], (err, rows) => {
      if(err)
        reject(err);
      resolve({
        "Id" : rows[0].Id,
        "Column" : [column],
        "Occupied" : rows[0].Column
      })
    })
  })
}

//PATCH UPDATE SEATS
exports.reserveInternationalSeats = (Id, column, reserve) => {
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
    db.all(query, [reserve, Id], (err, rows) => {
      if(err)
        reject(err);
        if(reserve)
        resolve({'reserved' : 1});
      resolve({'released' : 0})
    })
  })
}

/**********************************/
/*                                */
/*        OPERATION BOOKINGS      */
/*                                */
/**********************************/
//POST insert in booking table
exports.getBookingByUserIdAndByPlane = (user, planeType) => {
  let query = "SELECT * FROM Bookings WHERE IdUser=? AND AirplaneType=?";
  return new Promise((resolve, reject) => {
    db.all(query, [user, planeType], (err, rows) => {
      if(err)
        reject(err);
      const seatReserved = [];
      rows.map(x => seatReserved.push({
        "SeatRow" : x.SeatRow,
        "SeatColumn" : x.SeatColumn
      }))
      resolve(seatReserved);
    });
  });
}

exports.insertBookings = (IdUser, SeatRow, SeatColumn, AirplaneType) => {
  let query = "INSERT INTO Bookings(IdUser, SeatRow, SeatColumn, AirplaneType) VALUES (?,?,?,?)";
  return new Promise((resolve, reject) => {
    db.run(query, [IdUser, SeatRow, SeatColumn, AirplaneType], function(err) {
      if(err)
        reject(err);
      resolve({"Booked" : 1});
    });
  })
}

exports.deleteBooking =(IdUser, AirplaneType) => {
  const query = "DELETE FROM Bookings WHERE IdUser=? AND AirplaneType=?"
  return new Promise((resolve, reject) => {
    db.run(query, [IdUser, AirplaneType], function(err) {
      if(err)
        reject(err);
      resolve({"Deleted" : 1})
    });
  });
}

exports.getBookingByUser = (user) => {
  let query = "SELECT DISTINCT AirplaneType FROM Bookings WHERE IdUser=?";
  return new Promise((resolve, reject) => {
    db.all(query, [user], (err, rows) => {
      if(err)
        reject(err);
      const result = []
      rows.map(x => result.push(x.AirplaneType))
      resolve(result);
    });
  });
}