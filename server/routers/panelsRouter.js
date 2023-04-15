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
    res.send({ message: 'Panel Added Successfully', panel: createdPanel });
  })
);
panelRouter.post(
  '/UpdatePanel/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const panel = await Panels.findById(id);
    if (panel) {
      panel.name = req.body.name || panel.name;
      panel.manufacturer = req.body.manufacturer || panel.manufacturer;
      panel.model = req.body.model || panel.model;
      panel.type = req.body.type || panel.type;
      panel.power = req.body.power || panel.power;
      panel.maxStringVoltage = req.body.maxStringVoltage || panel.maxStringVoltage;
      panel.vmpp = req.body.vmpp || panel.vmpp;
      panel.impp = req.body.impp || panel.impp;
      panel.voc = req.body.voc || panel.voc;
      panel.isc = req.body.isc || panel.isc;
      panel.dimensions = req.body.dimensions || panel.dimensions;
      panel.price = req.body.price || panel.price;
      panel.efficiency = req.body.efficiency || panel.efficiency;
      panel.type = req.body.type || panel.type;
    }
    const updatedPanel = await panel.save();
    res.send({ message: 'Panel Updated Successfully', updatedPanel: updatedPanel });
  })
);
panelRouter.delete(
  '/deletePanel/:id',
  expressAsyncHandler(async (req, res) => {
    const id = req.params.id;
    const panel = await Panels.findById(id);
    if (panel) {
      const deletedPanel = await panel.remove();
      res.send({ message: 'Panel Deleted Successfully', deletedPanel: deletedPanel });
    }
  })
);
panelRouter.post(
  '/chosePanel',
  expressAsyncHandler(async (req, res) => {
    let panels = await Panels.find({})
    panels = panels.map(x => {
      return {
        id: x._id,
        name: x.name,
        model: x.model,
        manufacturer: x.manufacturer,
        maxStringVoltage: x.maxStringVoltage,
        power: x.power,
        vmpp: x.vmpp,
        impp: x.impp,
        voc: x.voc,
        isc: x.isc,
        dimensions: x.dimensions,
        price: x.price,
        efficiency: x.efficiency
      }
    })
    const { totalPower, energy, inverter, loss, coordinates, dailyIrradiation, expectedArea } = req.body
    let response = chosePanels({
      totalPower, energy, inverter, loss, panels,
      coordinates, dailyIrradiation,
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
  let { totalPower, energy, inverter, loss, panels, coordinates, expectedArea } = data

  let { elevationAngle, tiltAngle, peakSonHours } = coordinates
  let maxStringVoltage
  let maxArrayAmps = 100;

  let shPanels = [];
  let score = []

  panels.sort(function (a, b) {
    return a.power - b.power;
  });
  let panelsPower

  if (inverter?.type === "On Grid") {
    maxStringVoltage = inverter.voltageRang.max
  } else {
    maxStringVoltage = 400
  }

  if (energy) {
    energy = energy / (inverter.efficiency / 100)
    energy = energy / loss
    panelsPower = energy / peakSonHours || energy / 5
  } else if (totalPower) {
    panelsPower = totalPower
  }

  for (let panel of panels) {
    let height = (panel.dimensions.height / 1000)
    let width = (panel.dimensions.width / 1000)
    height = (height * Math.cos(tiltAngle * RAD)) + ((height * Math.sin(tiltAngle * RAD)) / Math.tan(elevationAngle * RAD))
    let area = width * height
    let numOfPanels
    if (expectedArea) {
      numOfPanels = Math.floor(expectedArea / area)
    } else {
      numOfPanels = toBigFixed(panelsPower / panel.power)
      numOfPanels = numOfPanels > 0 ? numOfPanels : numOfPanels + 1
    }
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
      let newNumOfPanels = 0
      numParallelString = toBigFixed(numOfPanels / maxNumSeries)
      newNumOfPanels = toBigFixed(numOfPanels / numParallelString) * numParallelString
      numOfSeries = newNumOfPanels / numParallelString
      // console.log(newNumOfPanels, numOfPanels);
      while ((newNumOfPanels - numOfPanels) > 1) {
        numParallelString = toBigFixed(numOfPanels / maxNumSeries)
        newNumOfPanels = toBigFixed(numOfPanels / numParallelString) * numParallelString
        numOfSeries = newNumOfPanels / numParallelString
        maxNumSeries = maxNumSeries - 1
      }
      numOfPanels = newNumOfPanels
    }
    let totalPrice = numOfPanels * panel.price
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
  return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, 3).map((x, i) => ({ ...x, rank: i + 1 })))
}

function toBigFixed(num) {
  return Math.floor(num) < num ? Math.floor(num) + 1 : Math.floor(num)
}

