const { getById, getByVin } = require("./cars-model");

const checkCarId = async (req, res, next) => {
  const car = await getById(req.params.id);
  if(!req.params.id || !car){
    return res.status(404).send({message:`<car id> kimliğine sahip araba bulunamadı`});
  }
  next();
}

const checkCarPayload = (req, res, next) => {
  const requiredFields = ['vin','make','model','mileage','title','transmission'];
  const missingFields = requiredFields.filter(field => !req.body[field]);
  if(missingFields.length > 0){
    return res.status(400).send({message:`${missingFields[0]} is missing`})
  }
}

const checkVinNumberValid = (req, res, next) => {
  const vinValidator = require('vin-validator');
  if(!vinValidator.validate(req.body.vinValidator)){
    return res.status(400).send({message:`vin ${req.body.vin} is invalid`})
  }
}

const checkVinNumberUnique = async (req, res, next) => {
  const car = await getByVin(req.body.vin);
  if(car){
    if(car.id === req.params.id){
      next();
    } else{
      return res.status(400).send({message:`vin ${req.body.vin} already exists`})
    }
  }
  next();
}

module.exports = {
  checkCarId,
  checkCarPayload,
  checkVinNumberUnique,
  checkVinNumberValid
}