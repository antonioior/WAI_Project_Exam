'use strict';

const express = require('express');

//DAO and database init
const AirplaneSeats_dao = require("./AirplaneSeats-dao");
const user_dao = require("./user-dao");

// init express
const app = new express();
const port = 3001;


// activate the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});


//API LOCAL PLANE
//GET /api/local
//return all seat of airplane of type local
app.get('/api/local', (req, res) => {
  AirplaneSeats_dao.getLocalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err));
});

//API REGIONAL PLANE
//GET /api/regional
//return all seat of airplane of type regional
app.get('/api/regional', (req, res)=>{
  AirplaneSeats_dao.getRegionalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).json(err))
})

//API INTERNATIONAL PLANE
//GET /api/international
//return all seat of airplane of type international
app.get('/api/international', (req, res) => {
  AirplaneSeats_dao.getInternationalSeats()
    .then(seats => {
      res.status(200).json(seats);
    })
    .catch(() => res.status(500).jsno(err))
})