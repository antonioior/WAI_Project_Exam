const SERVER_URL = 'http://localhost:3001';
import {Local, Regional, International} from "./Airplane";

//METHOD FOR LOCAL PLANE
//GET seats info
const getLocalSeatsInfo = async () =>{
  const response = await fetch(`${SERVER_URL}/api/local`, { 
    method : 'GET',
    credentials:'include'});
  const seatsInfo = await response.json();
  if(response.ok){
    let seats = seatsInfo.map(s => new Local(s.Id, s.A, s.B, s.C, s.D));
    return seats;
  }
  else
    throw seatsInfo;  //give an error
}

//METHOD FOR REGIONAL PLANE
//GET seats info
const getRegionalSeatsInfo = async() => {
  const response = await fetch(`${SERVER_URL}/api/regional`, {
    method : 'GET',
    credentials : 'include'});
  const seatsInfo = await response.json();
  if(response.ok){
    let seats = seatsInfo.map (s => new Regional(s.Id, s.A, s.B, s.C, s.D, s.E));
    return seats;
  }
  else
    throw seatsInfo;
}

//METHOD FOR INTERNATIONAL PLANE
//GET seats info
const getInternationalSeatsInfo = async() => {
  const response = await fetch(`${SERVER_URL}/api/international`, {
    method : 'GET',
    credentials : 'include'});
  const seatsInfo = await response.json();
  if(response.ok){
    let seats = seatsInfo.map(s => new International(s.Id, s.A, s.B, s.C, s.D, s.E, s.F))
    return seats;
  }
  else
    throw seatsInfo;
}

const API = {getLocalSeatsInfo, getRegionalSeatsInfo, getInternationalSeatsInfo};
export default API;