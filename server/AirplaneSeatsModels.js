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