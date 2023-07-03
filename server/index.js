'use strict';

//Imports
const express = require('express');
const morgan = require('morgan'); // Middleware for logging messages
const cors = require('cors'); // Middleware to enable CORS support

//DAO and database init
const AirplaneSeats_dao = require("./AirplaneSeats-dao");
const user_dao = require("./user-dao");

const session = require("express-session");

// init express
const app = new express();
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

// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


/****************************/
/*                          */
/*      API LOCAL PLANE     */
/*                          */
/****************************/

//GET /api/local
//return all seat of airplane of type local
app.get('/api/local', async (req, res) => {
  await AirplaneSeats_dao.getLocalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err));
});

//POST /api/local
app.patch('/api/local', async (req, res) => {
  try {
    const result = await AirplaneSeats_dao.reserveLocalSeats(req.body.Id, req.body.Column);
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
app.get('/api/regional', async (req, res)=>{
  await AirplaneSeats_dao.getRegionalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err))
})

app.patch('/api/regional', async (req, res) => {
  try {
    const result = await AirplaneSeats_dao.reserveRegionalSeats(req.body.Id, req.body.Column);
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

app.patch('/api/international', async (req, res) => {
  try{
    const result = await AirplaneSeats_dao.reserveInternationalSeats(req.body.Id, req.body.Column);
    return res.status(201).json(result);
  }
  catch(e){
    return res.status(401).json({error : "It is not possible reserve seat"});
  }
})