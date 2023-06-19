import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import SolarCharger from '../models/solarChargerModel.js';


const solarChargerRouter = express.Router();
solarChargerRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const solarChargers = await SolarCharger.find({});
    res.json(solarChargers);
  })
);

solarChargerRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await SolarCharger.collection.drop();
    // const createdSolarChargers = await SolarCharger.insertMany(data.solarChargers);
    res.json(createdSolarChargers);
  })
);

solarChargerRouter.post(
  '/choseSolarCharger',
  expressAsyncHandler(async (req, res) => {
    let solarChargers = await SolarCharger.find({})
    solarChargers = solarChargers.map(x => {
      return {
        id: x._id,
        name: x.name,
        model: x.model,
        manufacturer: x.manufacturer,
        maxStringVoltage: x.maxStringVoltage,
        systemVoltage: x.systemVoltage,
        type: x.type,
        rateCurrent: x.rateCurrent,
        features: x.features,
        maxPower: x.maxPower,
        price: x.price,
        efficiency: x.efficiency
      }
    })
    console.log(req.body);
    let response = choseSolarCharger(req.body, solarChargers)
    res.json(response);
  })
);
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
function isDivisible(number, minDivisor, maxDivisor) {
  for (let i = minDivisor; i <= maxDivisor; i++) {
    if (number % i === 0) {
      return true;
    }
  }
  return false;
}
function findNumbers(minDivisor, maxDivisor, start, end) {
  const numbers = [];
  for (let i = start; i <= end; i++) {
    if (isDivisible(i, minDivisor, maxDivisor)) {
      numbers.push(i);
    }
  }
  return numbers;
}
function choseSolarCharger(data, solarChargers) {
  console.log(data);
  let { systemVoltage, topResults, panel } = data

  let initArr = [];
  let scoreArr = []
  solarChargers.filter(x => x.systemVoltage.includes(systemVoltage)).forEach(solarCharger => {
    let panelsPerString = Math.floor(Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage) / panel.voc)
    let maxParallelStrings = Math.floor((solarCharger.rateCurrent * 0.9) / panel.isc)
    let maxPanelsPerArr = Math.min(Math.floor(solarCharger.maxPower / panel.power), panelsPerString * maxParallelStrings)
    let result = findNumbers(Math.floor(panelsPerString / 2), panelsPerString, Math.floor(maxPanelsPerArr / 2), maxPanelsPerArr);
    let num = Math.ceil(panel.numOfPanels / Math.max(...result))
    let totalPrice = num * solarCharger.price
    if (num && totalPrice) {
      initArr.push({ ...solarCharger, num, totalPrice })
    }
  });
  initArr.forEach(solarCharger => {
    let numScore = getScore("num", solarCharger, initArr)
    let priceScore = getScore("totalPrice", solarCharger, initArr)
    let totalScore = (priceScore + numScore) / 2
    scoreArr.push({ ...solarCharger, numScore, totalScore, priceScore })
  });
  return (scoreArr.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}

export default solarChargerRouter;