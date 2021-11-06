//let request = require('request')
const {fethcCoordsByIp} = require('./iss')
const {fetchMyIP} = require('./iss')
const {fetchIssFlyOverTimes} = require('./iss')
const {nextISSTimesForMyLocation} = require('./iss')
// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//let ip = 'https://api.ipify.org?format=json'
// fethcCoordsByIp('162.245.144.188',(error,coordinates)=>{
//   if (error){
//     console.log('It Didnt Work', error);
//     return 
//   }
//   console.log('It worked, Returned Coordinates', coordinates)
// })
const exampleCoords = {latitude: '49.27670', longitude:'-123.13000'}

// fetchISSFlyOverTimes(exampleCoords, (error,passTimes)=>{
//   if (error){
//     callback(null,error)
//     return
//   }
//   console.log('It worked! returned FlyOver Times' , passTimes)
// })
const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printPassTimes(passTimes);
});