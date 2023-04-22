import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Inverters from '../models/invertersModel.js';


const inverterRouter = express.Router();

inverterRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const inverters = await Inverters.find({});
    res.json(inverters);
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
inverterRouter.post(
  '/addInverter',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    const inverter = req.body
    const NewInverter = new Inverters(inverter);
    const createdInverter = await NewInverter.save();
    res.send({ message: 'inverter added Successfully', inverter: createdInverter });
  })
);
inverterRouter.post(
  '/UpdateInverter/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const inverter = await Inverters.findById(id);
    if (inverter) {
      inverter.name = req.body.name || inverter.name;
      inverter.manufacturer = req.body.manufacturer || inverter.manufacturer;
      inverter.model = req.body.model || inverter.model;
      inverter.type = req.body.type || inverter.type;
      inverter.power = req.body.power || inverter.power;
      inverter.price = req.body.price || inverter.price;
      inverter.voltage = req.body.voltage || inverter.voltage;
      inverter.voltageRang = req.body.voltageRang || inverter.voltageRang;
      inverter.inputPowerMax = req.body.inputPowerMax || inverter.inputPowerMax;
      inverter.efficiency = req.body.efficiency || inverter.efficiency;
    }
    const updateInverter = await inverter.save();
    res.send({ message: 'inverter Updated Successfully', updateInverter: updateInverter });
  })
);
inverterRouter.delete(
  '/deleteInverter/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const inverter = await Inverters.findById(id);
    if (inverter) {
      const deletedInverter = await inverter.remove();
      res.send({ message: 'inverter Deleted Successfully', deletedInverter: deletedInverter });
    }
  })
);
function choseTheInverter(data, inverters) {
  let  {safetyFactor ,totalPower,topResults } = data
  
  safetyFactor = 1 + (safetyFactor / 100)
  totalPower = safetyFactor * totalPower

  if (inverters) {
    let fixedInverter = []
    let score = []
    for (let inverter of inverters) {
      let ratio = (totalPower / inverter.power);
      let num = Math.floor(ratio) < ratio ? Math.floor(ratio) + 1 : Math.floor(ratio)
      let powerRate = totalPower / (num * inverter.power);
      fixedInverter.push({
        ...inverter,
        num,
        powerRate,
        totalPrice: num * inverter.price
      })
      // console.log(inverter.id, ratio, powerRate.toFixed(2), ratio * inverter.price)
    }
    for (let inverter of fixedInverter) {
      let sum = fixedInverter.reduce((b, a) => a.num + b, 0)
      let numScore = 100 - ((inverter.num / sum) * 100)
      sum = Math.max(...fixedInverter.map(x => (100 - ((x.num / sum) * 100))))
      numScore = (numScore / sum) * 100
      numScore = adjustScoreToLower(numScore)
      let powerScore = (inverter.powerRate * 100)
      let maxPowerScore = Math.max(...fixedInverter.map(x => (x.powerRate * 100)))
      powerScore = adjustScoreToBigger((powerScore / maxPowerScore) * 100)
      let priceRate = Math.max(...fixedInverter.map(x => x.totalPrice))
      // let priceRate =  fixedInverter.reduce((b, a) => a.totalPrice+b, 0)
      let priceScore = 100 - ((inverter.totalPrice / priceRate) * 100)
      priceRate = Math.max(...fixedInverter.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
      priceScore = adjustScoreToBigger((priceScore / priceRate) * 100)
      let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
      totalScore = (totalScore / (((2 * 100) + (100 / 3)) / 3)) * 100
      score.push({
        ...inverter,
        numScore,
        powerScore,
        totalScore,
        priceScore
      })
      // console.log(numScore.toFixed(2), powerScore.toFixed(2), priceScore.toFixed(2), totalScore.toFixed(2))
    }
    // console.log(score.map(x => ({ id: x.id, total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), powerX: x.powerScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));
    return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))

  }

}
function adjustScoreToLower(score) {
  if (score >= 95 && score <= 100) {
    return score;
  } else if (score >= 85 && score < 95) {
    return score - 3;
  } else if (score >= 70 && score < 85) {
    return score - 15;
  } else if (score >= 50 && score < 70) {
    return score - 20;
  } else if (score >= 30 && score < 50) {
    return score - 25;
  } else if (score > 10 && score < 30) {
    return score - 10;
  } else {
    return score
  }
}
function adjustScoreToBigger(score) {
  if (score >= 95 && score < 99) {
    return score + 2;
  } else if (score >= 90 && score < 95) {
    return score + 4;
  } else if (score >= 85 && score < 90) {
    return score + 6;
  } else if (score >= 70 && score < 85) {
    return score + 7;
  } else if (score >= 50 && score < 70) {
    return score + 20;
  } else if (score >= 30 && score < 50) {
    return score + 25;
  } else {
    return score
  }
}
inverterRouter.post(
  '/choseInverter',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body.type);
    let inverters = await Inverters.find({ type: req.body.type })
    // console.log(inverters);
    inverters = inverters.map(x => {
      return { id: x._id, name: x.name, voltageRang: x.voltageRang, type: x.type, manufacturer: x.manufacturer, voltage: x.voltage, power: x.power, price: x.price, efficiency: x.efficiency }
    })
    let response = choseTheInverter(req.body, inverters);
    res.json(response);
  })
);
export default inverterRouter;