const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser');


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
    res.render('index', {message: null, error: "Air Quality and Charging Stations"})
})

const axios = require('axios');
const { response } = require("express");

// Make a request for a user with a given ID

app.get('/airquality', (req, res) => {
    res.render('index', {message: null, error: "Invalid city, please try again."})
})


app.post('/airquality', (req, res) => {

    // Take the city and get lon and lat
    let city = req.body.city
    let lat, lon;


    let latlongAPI = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${apiKey}`;
    EVandAQI();

    async function EVandAQI(){
         await axios.get(latlongAPI)
        .then(response =>{
            //grabs Lat/Long from API
            lat = response.data[0].lat;
            lon = response.data[0].lon;

        }).catch(function (error) {
            response.render('index', {message: null, error: "City does not exist!"})
            })
       
        let aqiAPI = `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}1&lon=${lon}&appid=${apiKey}`;
        let evAPI = `https://api.openchargemap.io/v3/poi/?output=json&countrycode=US&maxresults=100&compact=true&verbose=false&latitude=${lat}&longitude=${lon}&distance=1&key=${EVapiKey}`;
        
        const aqiRequest = axios.get(aqiAPI);
        const evRequest = axios.get(evAPI);

        //Grabs data from both EV and AQI APIs at the same time and stores data into the array "responses"
        axios.all([aqiRequest, evRequest], response)
        .then(axios.spread((...responses)=>{
            const aqiResponse = responses[0];
            const evResponse = responses[1];
            const cityInfo = [];
            console.log(aqiResponse.data.list[0].main.aqi);
            console.log(evResponse.data.length)




            let messages = {
                message: 
                    `The air quality is: ${aqiResponse.data.list[0].main.aqi}. There are ${evResponse.data.length} EV charging stations within 1 mile of ${city}.`
            }

            console.log(messages.message)

            

            cityInfo.push(messages);
            

            //Writes the constructed message onto the page
            res.render('index', {message: messages.message, error: null})
        }))
        .catch(error =>{
            res.render('index', {message: null, error: "Put in a valid city"})
        })
    }
    
})


const port = 5000
app.listen(port, () => {
    console.log(`This server is running on ${port}`)
})