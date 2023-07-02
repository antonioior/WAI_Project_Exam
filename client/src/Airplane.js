'use strict';
export class Local{
  /**
  * Creates a new instance of Local
  * @param {number} Id id to identificate row
  * @param {number} A column
  * @param {number} B 
  * @param {number} C 
  * @param {number} D 
  */
  constructor(Id, A, B, C, D){      
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
  }
}

export class Regional{
  /**
  * Creates a new instance of Local
  * @param {number} Id id to identificate row
  * @param {number} A column
  * @param {number} B 
  * @param {number} C 
  * @param {number} D 
  * @param {number} E
  */
  constructor (Id, A, B, C, D, E){
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
  }
}

export class International{
  /**
  * Creates a new instance of Local
  * @param {number} Id id to identificate row
  * @param {number} A column
  * @param {number} B 
  * @param {number} C 
  * @param {number} D 
  * @param {number} E
  * @param {number} F
  */
  constructor (Id, A, B, C, D, E, F){
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
    this.F = F;
  }
}

function Bookings(IdUser, IdReservation, Data){
    this.IdReservation = IdReservation;
    this.IdUser = IdUser;
    this.Data = Data;
}

function Seats(Id, IdReservation, Seat, AirplaneType){
    this.Id = Id;
    this.IdReservation = IdReservation;
    this.Seat = Seat;
    this.AirplaneType = AirplaneType
}

export default {Local, Regional, International}