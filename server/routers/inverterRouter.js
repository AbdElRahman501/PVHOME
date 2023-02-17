import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Inverters from '../models/invertersModel.js';


const inverterRouter = express.Router();

inverterRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const inverters = await Inverters.find({});
    res.send(inverters);
  })
);

inverterRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Inverters.collection.drop();
    // const createdInverters = await Inverters.insertMany(data.inverters);
    res.json(createdInverters);
  })
);

function choseTheInverter(inp, loadRange, inverters) {
  // console.log(inp, inverters);
  inverters.sort(function (a, b) {
    return a.power - b.power;
  });
  let rang = loadRange >= 0 && loadRange <= 50 ? ((loadRange / 100) + 1) : 1.3
  let power = rang * inp
  if (inverters) {
    let fixedInverter = []
    let score = []
    for (let inverter of inverters) {
      let ratio = (power / inverter.power);
      let num = Math.floor(ratio) < ratio ? Math.floor(ratio) + 1 : Math.floor(ratio)
      let powerRate = power / (num * inverter.power);
      fixedInverter.push({
        ...inverter,
        num,
        powerRate,
        totalPrice: num * inverter.price
      })
      // console.log(inverter.id,ratio,powerRate.toFixed(2),ratio*inverter.price)  
    }
    for (let inverter of fixedInverter) {
      let sum = fixedInverter.reduce((b, a) => a.num + b, 0)
      let numScore = 100 - ((inverter.num / sum) * 100)
      sum = Math.max(...fixedInverter.map(x => (100 - ((x.num / sum) * 100))))
      numScore = (numScore / sum) * 100
      let powerScore = (inverter.powerRate * 100)
      let sumPowerScore = Math.max(...fixedInverter.map(x => (x.powerRate * 100)))
      powerScore = ((powerScore / sumPowerScore) * 100)
      let priceRate = Math.max(...fixedInverter.map(x => x.totalPrice))
      // let priceRate =  fixedInverter.reduce((b, a) => a.totalPrice+b, 0)
      let priceScore = 100 - ((inverter.totalPrice / priceRate) * 100)
      priceRate = Math.max(...fixedInverter.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
      priceScore = (priceScore / priceRate) * 100
      let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
      score.push({
        ...inverter,
        numScore,
        powerScore,
        totalScore,
        priceScore
      })
      // console.log(numScore.toFixed(2),powerScore.toFixed(2),priceScore.toFixed(2),totalScore.toFixed(2))
    }
    // console.log(score.map(x => ({ id:x.id ,total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), powerX: x.powerScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));
    let first = {
      ...score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))),
      rank: 1
    }
    let second = {
      ...score.filter(x => x.id !== first.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id).map(x => x.totalScore))),
      rank: 2
    }
    let third = {
      ...score.filter(x => x.id !== first.id && x.id !== second.id).find(x => x.totalScore === Math.max(...score.filter(x => x.id !== first.id && x.id !== second.id).map(x => x.totalScore))),
      rank: 3
    }

    return ([first, second, third])
  }

}

inverterRouter.post(
  '/choseInverter',
  expressAsyncHandler(async (req, res) => {
    let inverters = await Inverters.find({})
    inverters = inverters.map(x => {
      return { id: x._id, name: x.name, voltage: x.voltage, power: x.power, price: x.price, efficiency: x.efficiency }
    })
    let response = choseTheInverter(req.body.power, req.body.rang, inverters);
    res.json(response);
  })
);
export default inverterRouter;