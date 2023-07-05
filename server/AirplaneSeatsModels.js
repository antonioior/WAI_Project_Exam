'use strict'

function Local(Id, A, B, C, D){
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D
}

function Regional(Id, A, B, C, D, E){
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
}

function International(Id, A, B, C, D, E, F){
    this.Id = Id;
    this.A = A;
    this.B = B;
    this.C = C;
    this.D = D;
    this.E = E;
    this.F = F;
}

function Bookings(Id, IdUser, SeatRow, SeatColumn, AirplaneType){
    this.Id = Id;
    this.IdUser = IdUser;
    this.SeatRow = SeatRow;
    this.SeatColumn = SeatColumn;
    this.AirplaneType = AirplaneType;
}

module.exports={Local, Regional, International, Bookings}