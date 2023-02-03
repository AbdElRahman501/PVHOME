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
    await Batteries.collection.drop();
    const createdBatteries = await Batteries.insertMany(data.batteries);
    res.json(createdBatteries);
  })
);



export function choseBattery(energy, inverter,batteries) {
  let chosenBat = []
  let score = []

  batteries.sort(function (a, b) {
    return a.ampereHour - b.ampereHour;
  });
  for (let battery of batteries) {
    let batteryOfOne = energy / (battery.dod * inverter.voltage)
    // console.log(batteryOfOne);
    let branch = batteryOfOne / battery.ampereHour;
    branch = Math.floor(branch) < branch ? Math.floor(branch) + 1 : Math.floor(branch)
    let batteryPerBranch = inverter.voltage / battery.voltage
    batteryPerBranch = Math.floor(batteryPerBranch) < batteryPerBranch ? Math.floor(batteryPerBranch) + 1 : Math.floor(batteryPerBranch)
    if (batteryPerBranch >= 1) {
      // console.log(batteryOfOne,branch,batteryPerBranch) 
      if (batteryOfOne < battery.ampereHour) {
        return { branch, batteryPerBranch, num: branch * batteryPerBranch, ...battery }
      } else {
        let num = branch * batteryPerBranch
        let totalPrice = (num * battery.price);
        chosenBat.push({ ...battery, branch, batteryPerBranch, num, totalPrice })

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
    let totalScore = (priceScore + numScore) / 2
    score.push({ ...battery, numScore, totalScore, priceScore })
    // console.log(battery.num,battery.amperHour,"numScore "+numScore.toFixed(2),"priceRate "+priceScore.toFixed(2),"totalScore "+totalScore.toFixed(2));
  }
  // console.log(score.map(x => ({ total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));

  // console.log(score);
  return (score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))));

}
batteryRouter.post(
  '/choseBattery',
  expressAsyncHandler(async (req, res) => {
    // console.log(req.body);
    let batteries = await Batteries.find({})
    batteries = batteries.map(x => {
      return { id: x._id, name: x.name, voltage: x.voltage, ampereHour: x.ampereHour, price: x.price, dod: x.dod }
    })
    let response = choseBattery(req.body.energy,req.body.inverter,batteries );
    res.json(response);
  })
);

export default batteryRouter;