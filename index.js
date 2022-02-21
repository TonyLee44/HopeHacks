const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const {
    reset
} = require("nodemon");

const apiKey = "e6f95f46a3dc82ac8e8ff584311ce59b"
const EVapiKey = 'd4182b2b-8414-4c99-b02a-7322b40cb629'

// let city = 'Chicago'

// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.render('index')
})

const axios = require('axios');
const { message } = require("statuses");

// Make a request for a user with a given ID


app.get('/', (req, res) => {

    // Take the city and get lon and lat
    let city = req.query.city
    let lat, lon;

    let latlongAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    EVandAQI();

    async function EVandAQI(){
         await axios.get(latlongAPI)
        .then(response =>{
            //grabs Lat/Long from API
            lat = response.data[0].lat;
            lon = response.data[0].lon;
            console.log(lat,lon)
        }).catch(function (e) {
                res.render('index', {response: null, error: "Put in valid city"})
            })
            console.log(lat,lon)
        let aqiAPI = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}1&lon=${lon}&appid=${apiKey}`;
        let evAPI = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=${lat}&longitude=${lon}&distance=1&key=${EVapiKey}`;
        
        const aqiRequest = axios.get(aqiAPI);
        const evRequest = axios.get(evAPI);

        //Grabs data from both EV and AQI APIs at the same time and stores data into the array "responses"
        axios.all([aqiRequest, evRequest]).then(axios.spread((...responses)=>{
            const aqiResponse = responses[0];
            const evResponse = responses[1];

            
            
                let message = `The air quality is: ${aqiResponse.data.list[0].main.aqi}. There are ${evResponse.data.length} EV charging stations within 1 mile of ${city}.`
                console.log(message);
                res.render('index', {data:message, error:null})
            
            //Writes the constructed message onto the page
            
            console.log(aqiResponse.data.list[0].main.aqi);
            console.log(evResponse.data.length)
        })).catch(errors =>{
            console.log('broke')
        })
    }
})
    // axios.get(latlongAPI)
    //     .then(function (response) {
    //         // handle success
    //         // console.log(response.data);

    //         lat = response.data[0].lat;
    //         lon = response.data[0].lon;



    //         return response
    //     }).then(function (res) {

    //         // https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=35.227&longitude=-80.843&distance=1&key=d4182b2b-8414-4c99-b02a-7322b40cb629
    //         axios.get(`https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=${lat}&longitude=${lon}&distance=1&key=${EVapiKey}`)
    //             .then(function (res) {
    //                 console.log(res.data.length);

    //                 console.log('EVNum')
    //                 // console.log(EVNum)

    //                 // let message = `There are ${EVNum.length} charging stations within 1 mile of ${city}`
    //                 // res.send(message);
    //                 // console.log(message);
    //                 responseMsg += "yurr charge"
    //             }).catch(function (e) {
    //                 console.log("it errored")
    //             })

    //     }).then(function (res) {

    //         axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}1&lon=${lon}&appid=${apiKey}`)
    //             .then(function (response) {
    //                 console.log("weather yurrr")
    //                 console.log(response.data.list[0].main.aqi);
    //                 // let list = JSON.parse(body)
    // //             // console.log(`This is my list: ${JSON.stringify(list.list[0].main.aqi)}`);
    //                 // console.log(list?.main);
    // //             // console.log(list?.main?.aqi);
    // //             // console.log(list)

    // //             let message = `The air quality is: ${JSON.stringify(list.list[0].main.aqi)}`
    // //             res.send(message)
    //                 responseMsg += "yurr charge"
    //             }).catch(function (e) {
    //                 console.log("weather error")
    //             })

    //     }).then(function(){
    //         res.send("why tho")
    //     }).catch(function (error) {
    //         // handle error
    //         console.log(error);
    //     })

        

    // ^^^^
    // console.log(lat, lon);
    // let EVurl = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=${lat}&longitude=${lon}&distance=1&key=${EVapiKey}`

    // request(EVurl, function (err, response, body2) {
    //     if (err) {
    //         console.log(`Error: ${err}`)
    //     } else {
    //         let EVNum = JSON.parse(body2)

    //         let message = `There are ${EVNum.length} charging stations within 1 mile of ${city}`
    //         res.send(message);
    //         console.log(message);
    //     }
    // })





    //     let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}1&lon=${lon}&appid=${apiKey}`

    //     request(url, function (err, response, body) {

    //         if (err) {
    //             console.log(`Error: ${err}`)
    //         } else {
    //             // console.log(`Body: ${body}`)
    //             // console.log(response);

    //             // console.log(body);
    //             let list = JSON.parse(body)
    //             // console.log(`This is my list: ${JSON.stringify(list.list[0].main.aqi)}`);
    //             // console.log(list?.main);
    //             // console.log(list?.main?.aqi);
    //             // console.log(list)

    //             let message = `The air quality is: ${JSON.stringify(list.list[0].main.aqi)}`
    //             res.send(message)

    //         }

    //     })
    // })




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
app.listen(port, () => {
    console.log(`This server is running on ${port}`)
})