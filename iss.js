const request = require('request')
let ip = 'https://api.ipify.org?format=json'
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return callback(error, null);
    }

    fetchCoordsByIP(ip, (error, loc) => {
      if (error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if (error) {
          return callback(error, null);
        }

        callback(null, nextPasses);
      });
    });
  });
};
const fetchMyIP = function(callback) { 
  request(ip,(error,response,body)=>{
    if(error){
      callback(error,null);
    }
    const data = JSON.parse(body);
    console.log(data)
  })
  // use request to fetch IP address from JSON API
}

fethcCoordsByIp=(ip, callback)=>{
request(`https://freegeoip.app/json/${ip}`,(error,response,body)=>{
  if (error){
    callback(error,null)
    return 
  }
  if (response.statusCode !== 200){
    callback(Error(`Status Code:${response.statusCode} when fetching IP Coordinates from ${body}`),null)
  return 
  }
  const {latitude , longitude} = JSON.parse(body)
  callback(null,{latitude,longitude})
})
}
//fetchMyIP()
const fetchISSFlyOverTimes = (coords , callback)=>{
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`,(error,response,body)=>{
if (error){
  callback(null,error)
  return
} if (response.statusCode !== 200){
  callback(error,(`Status Code: ${response.statusCode} when fetching ISS pass times: ${body}`), null)
}
const passes =JSON.parse(body).response
callback(null,passes)
  })
}


module.exports = {fethcCoordsByIp, fetchMyIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation}