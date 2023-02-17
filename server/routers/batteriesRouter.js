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



function choseBattery(data) {
  let { energy, loss, dod, autonomyDay, inverter, batteries } = data
  let chosenBat = []
  let score = []
  energy = energy / (inverter.efficiency / 100) || energy / 0.97
  energy = energy / loss || energy / 0.85
  // console.log(energy)
  batteries.sort(function (a, b) {
    return a.ampereHour - b.ampereHour;
  });
  for (let battery of batteries) {
    let voltage
    if (Math.max(...inverter.voltage.map(x => x)) >= battery.voltage) {
      voltage = Math.max(...inverter.voltage.map(x => x))
    }
    // = inverter.voltage.find(x => x > ) || inverter.voltage.find(x => x >= battery.voltage)
    // console.log(voltage)
    if (voltage) {
      let batteryOfOne = energy / (dod * voltage) || energy / (battery.dod * voltage)
      // console.log(batteryOfOne);
      batteryOfOne = batteryOfOne * autonomyDay || batteryOfOne
      let branch = batteryOfOne / battery.ampereHour;
      // branch = Math.floor(branch) < branch ? Math.floor(branch) + 1 : Math.floor(branch)
      branch = Number(branch.toFixed(0))
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

  }
  for (let i = 0; i < chosenBat.length; i++) {
    const battery = chosenBat[i];
    let sum = chosenBat.reduce((b, a) => a.num + b, 0)
    let numScore = 100 - ((battery.num / sum) * 100)
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

  // console.log(score);
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

batteryRouter.post(
  '/choseBattery',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    let batteries = await Batteries.find({})
    batteries = batteries.map(x => {
      return { id: x._id, name: x.name, voltage: x.voltage, ampereHour: x.ampereHour, price: x.price, dod: x.dod }
    })
    let response = choseBattery(
      {
        energy: req.body.energy,
        loss: req.body.loss,
        dod: req.body.dod,
        autonomyDay: req.body.autonomyDay,
        inverter: req.body.inverter,
        batteries
      });
    res.json(response);
  })
);

export default batteryRouter;