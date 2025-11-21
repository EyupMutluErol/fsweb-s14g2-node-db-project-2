// HOKUS POKUS
const express = require('express');
const { getAll, getById, updateCarById, create } = require('./cars-model');
const { checkCarId, checkCarPayload, checkVinNumberUnique, checkVinNumberValid } = require('./cars-middleware');
const router = express.Router();

router.get('/', async (req,res)=>{
    const cars = await getAll();
    return res.json(cars);
})

router.get('/:id',checkCarId ,async (req,res)=>{
    const car = await getById(req.params.id);
    return res.json(car);
})

router.put('/:id',checkCarId,checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req,res)=>{
    const car = await updateCarById(req.params.id,req.body);
    return res.json(car);
})

router.post('/',checkCarPayload,checkVinNumberValid,checkVinNumberUnique, async (req,res)=>{
    const car = await create(req.body);
    return res.json(car);
})

module.exporst = router;