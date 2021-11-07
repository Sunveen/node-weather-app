const request= require('postman-request');


const geocode= (location,callback)=>{
    const loc = encodeURIComponent(location);
    const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${loc}.json?access_token=pk.eyJ1Ijoic3VudmVlbiIsImEiOiJja3ZkdXFwZGQzOTE0Mm5sdW9oMTlpaTc4In0.T3zJq4dtd80A-jzqMhEq8g`;
    request(url, {json: true}, (error,response,body)=>{
        if(error){
            callback('Unable to connect with location services!',undefined)
        }
        else if(body.features.length==0){
            // console.log('Incorrect request made', undefined);
            callback('Incorrect request made',undefined)

        }
        else{
            let data= body.features[0];
            callback(undefined, {
                latitude: data.center[1],
                longitude: data.center[0],
                location: data.place_name
            })
        }
    });
}

module.exports=geocode;