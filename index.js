const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { reset } = require("nodemon");

const apiKey = "e6f95f46a3dc82ac8e8ff584311ce59b"
const EVapiKey = 'd4182b2b-8414-4c99-b02a-7322b40cb629'

// let city = 'Chicago'

// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index')
})

const axios = require('axios');

// Make a request for a user with a given ID



app.get('/airquality', (req,res)=>{

    // Take the city and get lon and lat
    let city = req.query.city


axios.get(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`)
  .then(function (response) {
    // handle success
    console.log(response.data);

    let lat = response.data[0].lat;
    let lon = response.data[0].lon;

    console.log(lat, lon);
    let EVurl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=${lat}&longitude=${lon}&distance=1&key=${EVapiKey}`
    
    request(EVurl, function (err,response,body2){
        if(err){
            console.log(`Error: ${err}`)
        }
        else{
            let EVNum = JSON.parse(body2)

            let message = `There are ${EVNum.length} charging stations within 1 mile of ${city}`
            res.send(message);
            console.log(message);
        }
    })
    
    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}1&lon=${lon}&appid=${apiKey}`

    request(url, function(err,response,body){

        if(err){
            console.log(`Error: ${err}`)
        } else{
            // console.log(`Body: ${body}`)
            // console.log(response);

            // console.log(body);
            let list = JSON.parse(body)
            // console.log(`This is my list: ${JSON.stringify(list.list[0].main.aqi)}`);
            // console.log(list?.main);
            // console.log(list?.main?.aqi);
            // console.log(list)

            let message = `The air quality is: ${JSON.stringify(list.list[0].main.aqi)}`
            res.send(message)
            
        }
    
    })

    

  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
    
    
    
//     const geoLocationUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;

//     const geoLocation = request(geoLocationUrl, function(err, response, body) {
//         //
//         const parseBody = JSON.parse(body)

//         const lat = parseBody[0].lat;
//         console.log(parseBody[0].lat)
//         const lon = parseBody[0].lon;
//         console.log(parseBody[0].lon)
//         response.body({
//             lat,lon
//         })
//         /*[
//   {
//     name: 'Charlotte',
//     local_names: {
//       ru: 'Шарлотт',
//       ar: 'شارلت',
//       uk: 'Шарлотт',
//       ur: 'شارلٹ',
//       en: 'Charlotte',
//       fa: 'شارلوت',
//       mk: 'Шарлот'
//     },
//     lat: 35.2272086,
//     lon: -80.8430827,
//     country: 'US',
//     state: 'North Carolina'
//   }
// ]
// */

// //Handle if the city is not found
//     //if the array is empty, the city is not found!
//     //return error

//     //if city is found assign lon and lat
    
    })
//     console.log(geoLocation)

//     console.log(lat, lon);
//     //add lon and lat into the string URL
    // let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=35.2271&lon=80.8431&appid=f49dbbfa8e3250b4fa99956c3ea9d2eb`

    // request(url, function(err,response,body){

    //     if(err){
    //         console.log(`Error: ${err}`)
    //     } else{
    //         // console.log(`Body: ${body}`)
    //         // console.log(response);

    //         // console.log(body);
    //         let list = JSON.parse(body)
    //         // console.log(`This is my list: ${JSON.stringify(list.list[0].main.aqi)}`);
    //         // console.log(list?.main);
    //         // console.log(list?.main?.aqi);
    //         // console.log(list)

    //         let message = `The air quality is: ${JSON.stringify(list.list[0].main.aqi)}`
    //         res.send(message)
            
    //     }

    // })
    // res.send("TEST");
// })

// // request(url, function(err,res,body){

// //     if(err){
// //         console.log(`Error: ${err}`)
// //     } else{
// //         console.log(`Body: ${body}`)

// //         let weather = JSON.parse(body)

// //         let message = `It is ${weather.main.temp} degrees outside`
// //     }

// // })

const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
})
