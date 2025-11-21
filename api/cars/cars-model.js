const db = require('../../data/db-config');

const getAll = async () => {
  const carsTable = db('cars');
  return await carsTable;
}

const getById = async (id) => {
  const carsTable = db('cars');
  return await carsTable.where('id',id);
}

const getByVin = async (vin) => {
  const carsTable = db('cars');
  return await carsTable.where('vin',vin);
}
const create = async (car) => {
  const carsDb = db('cars');
  await carsDb.insert(car);
  const createdCar = await getByVin(car.vin);
  return createdCar;
}
const updateCarById = async (id,car)=> {
  const carsDB = db('cars');
  await carsDB.where('id',id).update(car);
  const updatedCar = await getById(id);
  return updatedCar;
}

module.exports = {
  getAll,
  getById,
  create,
  getByVin,
  updateCarById
}