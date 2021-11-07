const request = require("postman-request");


const forecast= (lat,long, callback)=>{
    const url= `http://api.weatherstack.com/current?access_key=9df93db47597852ffa29a739c9869fab&query=${lat},${long}`;
    console.log(url);
    request(url, {json:true}, (error,response,body)=>{
        if(error){
            callback('Network error',undefined);
        }
        else if(response.body.error){
            callback('Incorrect request made!',undefined);
        }
        else{
            const data= body.current;
            callback(undefined, {
                temperature: data.temperature,
                feelsLike: data.feelslike
            })
        }
    })
}

module.exports= forecast;