
const SERVER_URL = 'http://localhost:3001';

//Get seats info
const getSeatsInfo = async () =>{
  const response = await fetch(`${SERVER_URL}/api/local`, { 
    method : 'GET',
    credentials:'include'});
  const seatsInfo = await response.json();
  if(response.ok)
    return seatsInfo;
  else
    throw seatsInfo;  //give an error
}