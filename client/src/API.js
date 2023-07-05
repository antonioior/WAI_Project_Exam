const SERVER_URL = 'http://localhost:3001';

//API GET SEATSINFO
//To retrieve if seats is free or not
//GET seats info
export const getSeatsInfo = async (planeType) =>{
  const response = await fetch(`${SERVER_URL}/api${planeType}`, { 
    method : 'GET',
    });
  const seatsInfo = await response.json();
  if(response.ok){
    return seatsInfo;
  }
  else
    throw seatsInfo;  //give an error
}
//API PATCH RESERVE OR RELEASE A SEAT
export const patchReserveSeat = async(Id, column, reserve, planeType) => {
  const response = await fetch(`${SERVER_URL}/api${planeType}`, {
    method : 'PATCH',
    headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        Id:Id,
        Column : column,
        Reserve : reserve})
  });
  return await response.json();
}

//API FOR AUTHENTICATION
//LOGIN
export async function login(userData) {
  const response = await fetch("/api/sessions",{
    method :"POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  })
  return await response.json();
}

//GET SESSION
export async function getSession() {
  const response = await fetch("/api/sessions/current",{
    method: "GET",
    credentials: "include" });
  return await response.json();
}

//LOGOUT
export async function logout() {
  const response = await fetch("/api/sessions/current", {
    method: "DELETE",
    credentials: "include" });
  return await response.json();
}