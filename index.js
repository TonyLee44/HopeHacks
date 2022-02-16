const request = require("request");
const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const apiKey = "f49dbbfa8e3250b4fa99956c3ea9d2eb";

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({extended : true}));
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.render('index');
})

app.post('/', (req,res) => {
let city = req.body.city;
let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

request(url, function(err,res,body) {

    if(err) {
        console.log(`Error: ${err}`)
        res.render('index', {weather : null, error: err})
    } else {
        // console.log(`Body: ${body}`)

        let weather = JSON.parse(body);

        let message = `It is ${weather.main.temp} degrees outside in ${weather.name}`;

        console.log(message)


        
    }


})

})




const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
})