import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Batteries from '../models/batteriesModel.js';


const batteryRouter = express.Router();

batteryRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const batteries = await Batteries.find({});
    res.send(batteries);
  })
);

batteryRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Batteries.collection.drop();
    // const createdBatteries = await Batteries.insertMany(data.batteries);
    res.json(createdBatteries);
  })
);
batteryRouter.post(
  '/addBattery',
  expressAsyncHandler(async (req, res) => {
    const battery = req.body
    const newBattery = new Batteries(battery);
    const createdBattery = await newBattery.save();
    res.send({ message: 'battery Added Successfully', battery: createdBattery });
  })
);
batteryRouter.post(
  '/UpdateBattery/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    // console.log(req.body);
    const battery = await Batteries.findById(id);
    if (battery) {
      battery.name = req.body.name || battery.name;
      battery.manufacturer = req.body.manufacturer || battery.manufacturer;
      battery.model = req.body.model || battery.model;
      battery.voltage = req.body.voltage || battery.voltage;
      battery.ampereHour = req.body.ampereHour || battery.ampereHour;
      battery.price = req.body.price || battery.price;
      battery.dod = req.body.dod || battery.dod;

    }
    const updatedBattery = await battery.save();
    res.send({ message: 'battery Updated Successfully', updatedBattery: updatedBattery });
  })
);
batteryRouter.delete(
  '/RemoveBattery/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const battery = await Batteries.findById(id);
    if (battery) {
      const deletedBattery = await battery.remove();
      res.send({ message: 'battery Deleted Successfully', deletedBattery: deletedBattery });
    }
  })
);

function choseBattery(data, inverter, batteries) {
  let { totalEnergy, loss, dod, autonomyDay, topResults } = data
  totalEnergy = totalEnergy / ((inverter.efficiency / 100) * loss)

  let initBatteries = []
  let score = []

  batteries.forEach(battery => {
      dod = dod || battery.dod / 100
      let systemVoltage = bestVoltage(inverter.voltage, battery.ampereHour, totalEnergy, dod, autonomyDay, battery.voltage)
      let totalCapacity = (totalEnergy * autonomyDay) / (dod * systemVoltage)
      let branch = Math.ceil(totalCapacity / battery.ampereHour);
      let batteryPerBranch = Math.ceil(systemVoltage / battery.voltage)
      let num = branch * batteryPerBranch
      let totalPrice = (num * battery.price);
      if (systemVoltage) {
          initBatteries.push({ ...battery, systemVoltage, branch, batteryPerBranch, num, totalPrice })
      }
  });
  initBatteries.forEach(battery => {
      let numScore = getScore("num", battery, initBatteries)
      let priceScore = getScore("totalPrice", battery, initBatteries)
      let totalScore = (priceScore + numScore) / 2
      score.push({ ...battery, numScore, totalScore, priceScore })
  });
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
function bestVoltage(voltageArr, capacity, energy, dod, autonomyDay, batteryVolt) {
  let vs = []
  for (let volt of voltageArr) {
    let batteryOfOne = (energy * autonomyDay) / (dod * volt)
    if ((volt / batteryVolt) >= 1) { vs.push({ r: batteryOfOne / capacity, volt }) }
  }
  return (vs.find(x => x.r == closestNum(vs.map(x => x.r), 1))?.volt)
}
function closestNum(array, target) {
  return array.reduce(function (prev, curr) {
    return (Math.abs(curr - target) < Math.abs(prev - target) ? curr : prev);
  });
}

batteryRouter.post(
  '/choseBattery',
  expressAsyncHandler(async (req, res) => {
    let batteries = await Batteries.find({})
    batteries = batteries.map(x => {
      return { id: x._id, name: x.name, voltage: x.voltage, ampereHour: x.ampereHour, price: x.price, dod: x.dod }
    })
    const {data, inverter} = req.body
    let response = choseBattery(data,inverter,batteries);
    res.json(response);
  })
);

export default batteryRouter;