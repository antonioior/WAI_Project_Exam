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
//API PATCH RESERVE SEAT
//
export const patchReserveSeat = async(Id, column, planeType) => {
  const response = await fetch(`${SERVER_URL}/api${planeType}`, {
    method : 'PATCH',
    headers: {'Content-Type': 'application/json'},
      credentials: 'include',
      body: JSON.stringify({
        Id:Id,
        Column : column})
    });
}