'use strict'

//imports
const express = require('express');
const morgan = require('morgan'); // Middleware for logging messages
const cors = require('cors'); // Middleware to enable CORS support

const {check, validationResult} = require('express-validator'); // Middleware for validation

// DAO and Database Init
const AirplaneSeats_dao = require("./AirplaneSeats-dao");//module for accessing the pages table in the DB
const userDao = require("./user-dao");//module for accessing the user table in the DB


const session = require("express-session");

// init express
const app = express();
const port = 3001;

// set up the middlewares
app.use(express.json()); // for parsing json request body
app.use(morgan("dev"));

// set up and enable cors
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//Passport-related imports
const passport = require("passport"); //authentication middleware
const LocalStrategy = require("passport-local"); //authentication strategy(username and password)

// Passport: set up local strategy to search in the DB a user with matching password
passport.use(new LocalStrategy(async function verify(username, password, cb) {
  const user = await userDao.getUser(username, password);
  if(!user)
    return cb(null, false, 'Incorrect username or password.');
    
  return cb(null, user);
}));

// Serializing in the session the user object given from LocalStrategy(verify).
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// Starting from the data in the session, we extract the current (logged-in) user.
passport.deserializeUser(function (user, cb) { 
  //double check that user is still in User db
  return userDao.getUserById(user.id)
  .then(user => cb(null, user))
  .catch(err => callback(err, null));
});

//creating the session
app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));

//creating the session
app.use(passport.authenticate('session'));

//authentication verification of log in
const isLoggedIn = (req, res, next) => {
  if(req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({error: 'Not authorized'});
}

app.listen(port, () => {
  console.log(`Server listenting at http://localhost:${port}`)
})

/*************************/
/*                       */
/*      API LOG IN       */
/*                       */
/*************************/
// POST /api/sessions
//This route that is used for performing login
app.post('/api/sessions', function(req, res, next) {
  passport.authenticate('local', (err, user, info) => {
    if (err)
      return next(err);
      if (!user) {
        return res.status(401).send(info);
      }
   
      req.login(user, (err) => {
        if (err)
          return next(err);
        
        // req.user contains the authenticated user, we send all the user info back
        return res.status(201).json(req.user);
      });
  })(req, res, next);
});


// GET /api/sessions/current
//This route check if the user is logged in or not
app.get('/api/sessions/current',isLoggedIn, (req, res) => {
  if(req.isAuthenticated()) {
    res.json(req.user);}
  else
    res.status(401).json({error: 'Not authenticated'});
});

// DELETE /api/session/current
//This route checks that user is logged in or not
app.delete('/api/sessions/current', (req, res) => {
  req.logout(() => {
    res.end();
  });
});

const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  return `${location}[${param}]: ${msg}`;
};


/****************************/
/*                          */
/*      API LOCAL PLANE     */
/*                          */
/****************************/

//GET /api/local
//return all seat of airplane of type local
app.get('/api/local',  (req, res) => {
  AirplaneSeats_dao.getLocalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err));
});


//GET /api/local
//return the info of a single seat
app.get('/api/local/:id/:column', (req, res) => {
  AirplaneSeats_dao.getLocalSeat(req.params.id, req.params.column)
    .then(seat => {
      res.status(200).json(seat);
    })
    .catch(() => res.status(500).json(err));
})


//PATCH /api/local
app.patch('/api/local', async (req, res) => {
  try {
    const result = await AirplaneSeats_dao.reserveLocalSeats(req.body.Id, req.body.Column, req.body.Reserve);
    return res.status(201).json(result)
  }
  catch(e){
    return res.status(401).json({error : "It is not possible reserve seat"})
  }
})


/****************************/
/*                          */
/*    API REGIONAL PLANE    */
/*                          */
/****************************/

//GET /api/regional
//return all seat of airplane of type regional
app.get('/api/regional', (req, res)=>{
  AirplaneSeats_dao.getRegionalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err))
})

//GET /api/local
//return the info of a single seat
app.get('/api/regional/:id/:column', (req, res) => {
  AirplaneSeats_dao.getRegionalSeat(req.params.id, req.params.column)
    .then(seat => {
      res.status(200).json(seat);
    })
    .catch(() => res.status(500).json(err));
})

//PATCH /api/regional
app.patch('/api/regional', async (req, res) => {
  try {
    const result = await AirplaneSeats_dao.reserveRegionalSeats(req.body.Id, req.body.Column, req.body.Reserve);
    return res.status(201).json(result);
  }
  catch(e){
    return res.status(401).json({error : "It is not possible reserve seat"});
  }
})


/****************************/
/*                          */
/* API INTERNATIONAL PLANE  */
/*                          */
/****************************/
//GET /api/international
//return all seat of airplane of type international
app.get('/api/international', async (req, res) => {
  await AirplaneSeats_dao.getInternationalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).jsno(err))
})

//GET /api/international
//return info about one seat
app.get('/api/international/:id/:column', async(req, res) => {
  await AirplaneSeats_dao.getInternationalSeat(req.params.id, req.params.column)
    .then(seat => {
      res.status(200).json(seat);
    })
    .catch(() => res.status(500).json(err));
})

//PATCH /api/international
app.patch('/api/international', async (req, res) => {
  try{
    const result = await AirplaneSeats_dao.reserveInternationalSeats(req.body.Id, req.body.Column, req.body.Reserve);
    return res.status(201).json(result);
  }
  catch(e){
    return res.status(401).json({error : "It is not possible reserve seat"});
  }
})

/****************************/
/*                          */
/*    API RESERVE SEATS     */
/*                          */
/****************************/
app.get('/api/bookings/:IdUser/:AirplaneType', async(req, res) => {
  await AirplaneSeats_dao.getBookingByUserIdAndByPlane(parseInt(req.params.IdUser), req.params.AirplaneType)
    .then(reservation => {
      res.status(200).json(reservation);
    })
    .catch(() => res.status(500).json(err))
})

//POST to reserve one or more seat
//flag 1 the value in the table of airplane
//add a record 
app.post('/api/bookings', isLoggedIn, async(req, res) => {
  const idUser = req.body.IdUser;
  const seats = req.body.Seats;
  const planeType = req.body.PlaneType;
  const alreadyReservation = await AirplaneSeats_dao.getBookingByUserIdAndByPlane(idUser, planeType);
  if(alreadyReservation.length > 0)
    return res.status(500).json({"Message" : "You have altready a reservation"});
  for (const seat of seats){
    switch(planeType) {
      case 'local': {
        try{
          const result = await AirplaneSeats_dao.getLocalSeat(seat.Id, seat.Column);
          if(result.Occupied === 1)
            return res.status(500).json({"Message" : "It is not possible reserve seats"});
        }
        catch(error) {
          return res.status(500).json(error);
        }
        break;
      }
      case 'regional': {
        try {
          const result = await AirplaneSeats_dao.getRegionalSeat(seat.Id, seat.Column);
          if(result.Occupied == 1)
            return res.status(500).json({"Message" : "It is not possible reserve seats"})
        }
        catch (error) {
          return res.status(500).json(error)
        }
        break;
      }
      case 'international' : {
        try {
          const result = await AirplaneSeats_dao.getInternationalSeat(seat.Id, seat.Column);
          if(result.Occupied==1)
            return res.status(500).json({"Message" : "It is not possible reserve seats"})
        }
        catch (error) {
          return res.status(500).json(error)
        }
        break;
      }
      default :
        res.status(500).json({"Message" : "not valid plane"})
        break;
    }
  }
  for(const seat of seats){
    switch(planeType){
      case 'local': {
        try{
        const updatePlane = await AirplaneSeats_dao.reserveLocalSeats(seat.Id, seat.Column, 1);
        const insertBooking = await AirplaneSeats_dao.insertBookings(idUser, seat.Id, seat.Column, planeType);
        if(!updatePlane.reserved || !insertBooking.Booked)
           return res.status(503).json({"Message" : "Impossible complete booking"});
        }
        catch (error){
          return res.status(500).json(error);
        }
        break; 
      }
      case 'regional':{
        try{
          const updatePlane = await AirplaneSeats_dao.reserveRegionalSeats(seat.Id, seat.Column, 1);
          const insertBooking = await AirplaneSeats_dao.insertBookings(idUser, seat.Id, seat.Column, planeType);
          if(!updatePlane.reserved || !insertBooking.Booked) 
            return res.status(503).json({"Message" : "Impossible complete booking"});
        }
        catch (error){
          return res.status(500).json(error);
        }
        break;
      }
      case 'international': {
        try{
          const updatePlane = await AirplaneSeats_dao.reserveInternationalSeats(seat.Id, seat.Column, 1);
          const insertBooking = await AirplaneSeats_dao.insertBookings(idUser, seat.Id, seat.Column, planeType);
          if(!updatePlane.reserved || !insertBooking.Booked) 
            return res.status(503).json({"Message" : "Impossible complete booking"});
          }
        catch (error){
          return res.status(500).json(error);
        }
        break;
      }
      default:
        return res.status(500).json({"Message" : "not valid plane"})
    }
  }
  return res.status(201).json({"Message" : "Booked successfully"}) 
})

app.delete('/api/bookings', isLoggedIn, async(req, res) => {
  const idUser = req.body.IdUser;
  const airplaneType = req.body.AirplaneType;
  try {
    const listSeat = await AirplaneSeats_dao.getBookingByUserIdAndByPlane(idUser, airplaneType);
    for(const seat of listSeat){
      switch(airplaneType){
        case 'local':{
          try {
            await AirplaneSeats_dao.reserveLocalSeats(seat.SeatRow, seat.SeatColumn, 0);
          }
          catch(e){
            return res.status(401).json({error : "It is not possible reserve seat"})
          }
          break;
        }
        case 'regional': {
          try {
            await AirplaneSeats_dao.reserveRegionalSeats(seat.SeatRow, seat.SeatColumn, 0);
          }
          catch(e){
            return res.status(401).json({error : "It is not possible reserve seat"})
          }
          break;
        }
        case 'international':{
          try {
            await AirplaneSeats_dao.reserveInternationalSeats(seat.SeatRow, seat.SeatColumn, 0);
          }
          catch(e){
            return res.status(401).json({error : "It is not possible reserve seat"})
          }
          break;
        }
        default: {
          return res.status(500).json({"message" : "plane not valid"});
        }
      }
    }
    await AirplaneSeats_dao.deleteBooking(idUser, airplaneType);
    return res.status(202).json({"message" : "deleted with success"})
  }
  catch(err){
    return res.status(503).json({"message" : "error"});
  }
  
})

app.get('/api/bookings/:IdUser', isLoggedIn,(req, res) => {
  AirplaneSeats_dao.getBookingByUser(req.params.IdUser)
    .then(booking => {
      res.status(200).json(booking);
    })
    .catch(() => res.status(500).json(err));
})