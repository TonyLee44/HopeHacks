const request = require("request");
const express = require('express')
const bodyParser = require('body-parser')

const apiKey = "f49dbbfa8e3250b4fa99956c3ea9d2eb";

const app = {
    init: () => {
        document
            .getElementById('btnGet')
            .addEventListener('click', app.getLocation);
        document
            .getElementById('btnAirQuality')
            .addEventListener('click', app.getAirQuality);
    },
    
    getLocation: (ev) => {
        
    },

    getAirQuality: (ev) => {

    }
}

app.init();





const port = 5000
app.listen(port, ()=>{
    console.log(`This server is running on ${port}`)
})