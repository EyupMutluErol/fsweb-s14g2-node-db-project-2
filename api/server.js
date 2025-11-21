const express = require("express")

const server = express()

server.use(express.json());
const apiCars = require('./cars/cars-router');
server.use('/api/cars',apiCars);
// SİHRİNİZİ GÖSTERİN

module.exports = server
