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
  let { safetyFactor, totalPower, topResults } = data
  totalPower = (1 + (safetyFactor / 100)) * totalPower

  let initInverters = []
  let score = []
  for (let inverter of inverters) {
    let num = Math.ceil(totalPower / inverter.power)
    // let powerDiff = 1 - (totalPower / (num * inverter.power))
    let powerDiff = (totalPower / (num * inverter.power))
    let totalPrice = num * inverter.price
    initInverters.push({ ...inverter, num, powerDiff, totalPrice })
  }
  for (let inverter of initInverters) {
    let numScore = adjustScoreToLower(getScore("num", inverter, initInverters, true))
    let powerScore = adjustScoreToBigger(((inverter.powerDiff * 100) / Math.max(...initInverters.map(x => (x.powerDiff * 100)))) * 100)
    // let powerScore = adjustScoreToBigger(getScore("powerDiff", inverter, initInverters))
    let priceScore = adjustScoreToBigger(getScore("totalPrice", inverter, initInverters, true))
    let totalScore = (priceScore + numScore + (powerScore / 3)) / 3
    totalScore = (totalScore / (((2 * 100) + (100 / 3)) / 3)) * 100
    // totalScore = (totalScore + inverter.efficiency) / 2
    score.push({ ...inverter, numScore, powerScore, totalScore, priceScore })
  }
  return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}
function getScore(scoreName, item, array, sum) {
  let max
  if (sum) {
    max = array.reduce((b, a) => a[scoreName] + b, 0)
  } else {
    max = Math.max(...array.map(x => x[scoreName]))

  }
  max = max === Math.min(...array.map(x => x[scoreName])) ? 2 * max : max
  let initScore = 100 - ((item[scoreName] / max) * 100)
  max = Math.max(...array.map(x => (100 - ((x[scoreName] / max) * 100))))
  return ((initScore / max) * 100)
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