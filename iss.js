const request = require('request')

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
fetchMyIP()