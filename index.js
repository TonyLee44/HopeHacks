const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const { reset } = require("nodemon");

const apiKey = "e6f95f46a3dc82ac8e8ff584311ce59b"


// let city = 'Chicago'

// let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req,res)=>{
    res.render('index')
})

app.get('/airquality', (req,res)=>{
    let city = req.body.city

    let url = `http://api.openweathermap.org/data/2.5/air_pollution?lat=35.2271&lon=80.8431&appid=f49dbbfa8e3250b4fa99956c3ea9d2eb`

    request(url, function(err,response,body){

        if(err){
            console.log(`Error: ${err}`)
        } else{
            console.log(`Body: ${body}`)
            console.log(response);

            console.log(body);
            let list = JSON.parse(body)
            console.log(`This is my list: ${JSON.stringify(list.list[0].main.aqi)}`);
            console.log(list?.main);
            console.log(list?.main?.aqi);

            let message = `The air quality is: ${JSON.stringify(list.list[0].main.aqi)}`
            res.send(message)
            
        }

    })
    // res.send("TEST");
})

// request(url, function(err,res,body){

//     if(err){
//         console.log(`Error: ${err}`)
//     } else{
//         console.log(`Body: ${body}`)

//         let weather = JSON.parse(body)

//         let message = `It is ${weather.main.temp} degrees outside`
//     }

// })

const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
})
