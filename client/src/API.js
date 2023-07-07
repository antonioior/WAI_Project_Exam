const SERVER_URL = 'http://localhost:3001';

//API FOR AUTHENTICATION
//LOGIN
export async function login(userData) {
  const response = await fetch(`${SERVER_URL}/api/sessions`,{
    method :"POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  if(response.ok)
    return await response.json();
  throw await response.json();
}

//GET SESSION
export async function getSession() {
  const response = await fetch(`${SERVER_URL}/api/sessions/current`,{
    method: "GET",
    credentials: "include" });
  if(response.ok)
    return await response.json();
  throw await response.json();
}

//LOGOUT
export async function logout() {
  const response = await fetch(`${SERVER_URL}/api/sessions/current`, {
    method: "DELETE",
    credentials: "include" });

  if(response.ok)
    return await response.json();
  throw await response.json();
}

//API GET SEATSINFO
//To retrieve if seats is free or not
//GET seats info
export const getSeatsInfo = async (planeType) =>{
  const response = await fetch(`${SERVER_URL}/api${planeType}`, { 
    method : 'GET',
    });
  const seatsInfo = await response.json();
  if(response.ok)
    return seatsInfo;
  throw new Error('Internal server error');  //give an error
}

//API TO VIEW THE RESERVATION OF A USER
export const getReservationByUser = async (IdUser) =>{
  const response = await fetch(`${SERVER_URL}/api/bookings/${IdUser}`, {
    method :"GET",
    credentials : "include"});
    
  if(response.ok)
    return await response.json();
  throw new Error("Internal server error");
}

//API TO RESERVE SEAT
export const reserveSeats = async (idUser, planeType, seats) => {
  const response = await fetch(`${SERVER_URL}/api/bookings`, {
    method : 'POST',
    credentials : 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({
      "IdUser": idUser,
      "PlaneType" : planeType,
      "Seats" : seats
    })
  })
  if(response.ok)
    throw await response.json();
} 

//API TO DELETE RESERVATION ON A PLANE
export const deleteSeats = async(idUser, planeType) => {
  const response = await fetch(`${SERVER_URL}/api/bookings`, {
    method : 'DELETE',
    credentials : 'include',
    headers: {
      "Content-Type": "application/json",
    },
    body : JSON.stringify({
      "IdUser" : idUser,
      "AirplaneType" : planeType
    })
  })
  if(!response.ok)
    throw await response.json();
}
