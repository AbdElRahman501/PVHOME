import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Panels from '../models/panelsModel.js';
import axios from 'axios';

const panelRouter = express.Router();
const PI = Math.PI;
const RAD = PI / 180;
const DEG = 180 / PI;

panelRouter.get(
  '/',
  expressAsyncHandler(async (req, res) => {
    const panels = await Panels.find({});
    res.send(panels);
  })
);

panelRouter.get(
  '/seed',
  expressAsyncHandler(async (req, res) => {
    // await Panels.collection.drop();
    // const createdPanels = await Panels.insertMany(data.panels);
    res.json(createdPanels);
  })
);

panelRouter.post(
  '/addPanel',
  expressAsyncHandler(async (req, res) => {
    console.log(req.body);
    const panel = req.body
    const newPanel = new Panels(panel);
    const createdPanel = await newPanel.save();
    res.send({ message: 'inverter added', panel: createdPanel });
  })
);

panelRouter.post(
  '/chosePanel',
  expressAsyncHandler(async (req, res) => {
    let panels = await Panels.find({})
    panels = panels.map(x => {
      return { id: x._id, name: x.name, power: x.power, vmpp: x.vmpp, impp: x.impp, voc: x.voc, isc: x.isc, dimensions: x.dimensions, price: x.price, efficiency: x.efficiency }
    })
    const { totalPower, energy, inverter, loss, powerRang, tiltAngle, coordinates, dailyIrradiation, expectedArea } = req.body
    let response = chosePanels({
      totalPower, energy, inverter, loss, panels, powerRang,
      coordinates, dailyIrradiation, tiltAngle,
      expectedArea
    })
    res.json(response);
  })
);

panelRouter.post(
  '/getDailyIrradiation',
  expressAsyncHandler(async (req, res) => {
    const { lat, lon, tilt } = req.body

    const url = `https://re.jrc.ec.europa.eu/api/MRcalc?lat=${lat}&lon=${lon}&horirrad=1&startyear=2016&endyear=2016&d2g=1&outputformat=json&angle=${tilt}`;

    // Use axios.get() method to send a GET request to the API and get a promise
    axios.get(url)
      // Use .then() method to handle the promise and get a response object
      .then(response => {
        // Access the data object from the response object using dot notation
        const data = response.data;
        // Get the monthly data
        const months = data.outputs.monthly;
        //init solar irradiation per month 
        let dailyIrradiation = 0
        for (const month of months) {
          dailyIrradiation += month["H(h)_m"]
        }
        dailyIrradiation = (dailyIrradiation * 1000) / 365
        // Display the value of irradiation  and divide it by 365 to get the solar irradiation per day Wh/m2/day
        res.json({ dailyIrradiation });
      })
      // Use .catch() method to handle any errors or rejections
      .catch(error => {
        // Display error message 
        res.json({ message: error.message });
        console.error(error.message);
      });
  })
);

export default panelRouter;

function chosePanels(data) {
  let { totalPower, energy, inverter, powerRang, loss, panels, tiltAngle, coordinates, dailyIrradiation, expectedArea } = data

  let elevationAngle = getElevationAngle(coordinates.lat)
  let maxStringVoltage
  let maxArrayAmps = 100;

  let shPanels = [];
  let score = []

  panels.sort(function (a, b) {
    return a.power - b.power;
  });
  let panelsPower
  let peakSonHours

  if (inverter?.type === "On Grid") {
    maxStringVoltage = inverter.voltageRang.max
  } else {
    maxStringVoltage = 400
  }
  if (energy) {
    energy = energy / (inverter.efficiency / 100) || energy / 0.97
    energy = energy / loss || energy / 0.85
    peakSonHours = dailyIrradiation / 1000 || 5
    panelsPower = energy / peakSonHours
  } else if (totalPower) {
    powerRang = (powerRang / 100) + 1
    panelsPower = powerRang * totalPower
  } else if (expectedArea) {
    peakSonHours = dailyIrradiation / 1000
  }
  for (let panel of panels) {
    if (dailyIrradiation) {
      energy = dailyIrradiation * expectedArea * (panel.efficiency / 100) * 0.75
      peakSonHours = dailyIrradiation / 1000 || 5
      panelsPower = energy / peakSonHours
      // console.log(panelsPower);
    }
    let numOfPanels = panelsPower / panel.power
    numOfPanels = toBigFixed(numOfPanels)
    numOfPanels = numOfPanels > 0 ? numOfPanels : numOfPanels + 1
    maxStringVoltage = panel.maxStringVoltage ? Math.min(maxStringVoltage, panel.maxStringVoltage) : maxStringVoltage
    let maxNumSeries = maxStringVoltage / panel.voc
    maxNumSeries = Math.floor(maxNumSeries)
    let numOfSeries
    let numParallelString
    if (maxNumSeries >= numOfPanels) {
      maxNumSeries = numOfPanels
      numOfSeries = numOfPanels
      numParallelString = 1
    } else {
      // numOfPanels = numOfPanels % 2 !== 0 ? numOfPanels + 1 : numOfPanels
      let newNumOfPanels = 0
      numParallelString = toBigFixed(numOfPanels / maxNumSeries)
      newNumOfPanels = toBigFixed(numOfPanels / numParallelString) * numParallelString
      numOfSeries = newNumOfPanels / numParallelString
      while ((newNumOfPanels - numOfPanels) > 2) {
        numParallelString = toBigFixed(numOfPanels / maxNumSeries)
        newNumOfPanels = toBigFixed(numOfPanels / numParallelString) * numParallelString
        numOfSeries = newNumOfPanels / numParallelString
        maxNumSeries = maxNumSeries - 1
      }
      numOfPanels = newNumOfPanels
    }
    let totalPrice = numOfPanels * panel.price
    let height = Math.max((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
    let width = Math.min((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
    height = (height * Math.cos(tiltAngle * RAD)) + ((height * Math.sin(tiltAngle * RAD)) / Math.tan(elevationAngle * RAD))
    // console.log(height);
    let area = width * height
    let totalArea = numOfPanels * area

    shPanels.push({
      ...panel,
      numOfPanels,
      numOfSeries,
      numParallelString,
      area,
      totalArea,
      totalPrice
    })
    // console.log(energy,panelsPower,numOfPanels,numOfPanels % 2==0)
  }
  // console.log(shPanels)
  for (let panel of shPanels) {
    let sum = shPanels.reduce((b, a) => a.numOfPanels + b, 0)
    // let sum = Math.max(...shPanels.map(x => x.numOfPanels))
    let numScore = 100 - ((panel.numOfPanels / sum) * 100)
    sum = Math.max(...shPanels.map(x => (100 - ((x.numOfPanels / sum) * 100))))
    numScore = (numScore / sum) * 100
    let priceRate = Math.max(...shPanels.map(x => x.totalPrice))
    // let priceRate =  shPanels.reduce((b, a) => a.totalPrice+b, 0)
    let priceScore = 100 - ((panel.totalPrice / priceRate) * 100)
    priceRate = Math.max(...shPanels.map(x => (100 - ((x.totalPrice / priceRate) * 100))))
    priceScore = (priceScore / priceRate) * 100

    let maxArea = Math.max(...shPanels.map(x => x.totalArea))
    let areaScore = 100 - ((panel.totalArea / maxArea) * 100)
    maxArea = Math.max(...shPanels.map(x => (100 - ((x.totalArea / maxArea) * 100))))
    areaScore = (areaScore / maxArea) * 100
    // console.log( closeTo(shPanels.map(x=> x.totalArea),panel.totalArea,area))
    let totalScore = (priceScore + numScore + areaScore) / 3
    // console.log(panel.id, "n " + panel.numOfPanels, "nS " + numScore.toFixed(2), "p " + panel.totalPrice, "pS " + priceScore.toFixed(2), "A " + panel.totalArea.toFixed(2), "AS " + areaScore.toFixed(2), "T " + totalScore.toFixed(2))

    score.push({
      ...panel,
      numScore,
      areaScore,
      totalScore,
      priceScore
    })
  }
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





// Define a function to calculate the solar declination angle for a given day of the year
function getElevationAngle(latitude) {
  // Get the day of the year from the date object

  let declinationAngle = Math.floor(23.45 * Math.sin(RAD * ((360 / 365) * (355 + 284))))
  declinationAngle = declinationAngle < 0 ? -declinationAngle : declinationAngle
  // console.log(declinationAngle)
  return 90 - (declinationAngle + latitude);
}


function toBigFixed(num) {
  return Math.floor(num) < num ? Math.floor(num) + 1 : Math.floor(num)
}

