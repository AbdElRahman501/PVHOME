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
    console.log(battery);
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


function choseBattery(data,inverter,batteries) {
  let { totalEnergy, loss, dod, autonomyDay , topResults } = data
  let chosenBat = []
  let score = []
  totalEnergy = totalEnergy / ((inverter.efficiency / 100) * loss)

  for (let battery of batteries) {
    dod = dod || battery.dod / 100
    let voltage = bestVoltage(inverter.voltage, battery.ampereHour, totalEnergy, dod, autonomyDay, battery.voltage)
    let batteryOfOne = (totalEnergy * autonomyDay) / (dod * voltage)
    let branch = batteryOfOne / battery.ampereHour;

    // branch = Math.floor(branch) < branch ? Math.floor(branch) + 1 : Math.floor(branch)
    branch = Number(branch.toFixed(0))
    branch = branch > 0 ? branch : 1

    let batteryPerBranch = voltage / battery.voltage
    batteryPerBranch = Math.floor(batteryPerBranch) < batteryPerBranch ? Math.floor(batteryPerBranch) + 1 : Math.floor(batteryPerBranch)
    if (batteryPerBranch >= 1) {

      // console.log(batteryOfOne,branch,batteryPerBranch) 
      let num = branch * batteryPerBranch
      let totalPrice = (num * battery.price);
      chosenBat.push({
        ...battery,
        branch,
        batteryPerBranch,
        num,
        totalPrice
      })
    }

  }
  for (let i = 0; i < chosenBat.length; i++) {
    const battery = chosenBat[i];
    let sum = chosenBat.reduce((b, a) => a.num + b, 0)
    let numScore = 100 - ((battery.num / sum) * 100)
    sum = Math.max(...chosenBat.map(x => (100 - ((x.num / sum) * 100))))
    numScore = (numScore / sum) * 100
    let priceRate = Math.max(...chosenBat.map(x => x.totalPrice))
    // let priceRate =  chosenBat.reduce((b, a) => a.totalPrice+b, 0)
    let priceScore = 100 - ((battery.totalPrice / priceRate) * 100)
    priceRate = Math.max(...chosenBat.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
    priceScore = (priceScore / priceRate) * 100
    let totalScore = (priceScore + numScore) / 2
    score.push({
      ...battery,
      numScore,
      totalScore,
      priceScore
    })
    // console.log(battery.num, battery.ampereHour, "numScore " + numScore.toFixed(2), "priceRate " + priceScore.toFixed(2), "totalScore " + totalScore.toFixed(2));
  }
  // console.log(score.map(x => ({ total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));

  return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({
    ...x,
    rank: i + 1
  })))

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