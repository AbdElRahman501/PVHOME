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
    const { data, inverter } = req.body
    let response = chosePanels(data, panels, inverter)
    res.json(response);
  })
);



function chosePanels(data, panels, inverter) {
  let { totalPower, totalEnergy, loss, coordinates, expectedArea, peakSonHours,safetyFactor, topResults, priority } = data
  let { elevationAngle, tiltAngle } = coordinates

  let shPanels = [];
  let score = []
  totalPower = inverter?.type === "OFF Grid" ? totalEnergy / ((inverter.efficiency / 100) * loss * peakSonHours) : ((100 + safetyFactor) * totalPower) / 100
  for (let panel of panels) {
    let area = getArea(panel, tiltAngle, elevationAngle)
    let numOfPanels = expectedArea ? Math.floor(expectedArea / area) : inverter?.type === "On Grid" ? Math.ceil(totalPower / panel.power) : Math.floor(totalPower / panel.power) || 1
    let totalPrice = numOfPanels * panel.price
    let totalArea = numOfPanels * area
    shPanels.push({ ...panel, numOfPanels, area, totalArea, totalPrice })
  }

  for (let panel of shPanels) {
    let numScore = getScore("numOfPanels", panel, shPanels)
    let priceScore = getScore("totalPrice", panel, shPanels)
    let areaScore = getScore("totalArea", panel, shPanels)
    let totalScore = Math.sqrt(((Math.pow(priceScore, 2) * priority.price) + (Math.pow(numScore, 2) * priority.num) + (Math.pow(areaScore, 2) * priority.area)) / (priority.price + priority.num + priority.area))
    score.push({ ...panel, numScore, areaScore, totalScore, priceScore })
  }
  return (score.sort((a, b) => b.totalScore - a.totalScore).slice(0, topResults).map((x, i) => ({ ...x, rank: i + 1 })))
}
function getScore(scoreName, item, array) {
  // let max = array.reduce((b, a) => a[scoreName] + b, 0)
  let max = Math.max(...array.map(x => x[scoreName]))
  max = max > 1 ? max : 2
  let initScore = 100 - ((item[scoreName] / max) * 100)
  max = Math.max(...array.map(x => (100 - ((x[scoreName] / max) * 100))))
  return ((initScore / max) * 100)
}
function getArea(panel, tiltAngle, elevationAngle) {
  let height = (panel.dimensions.height / 1000)
  let width = (panel.dimensions.width / 1000)
  height = tiltAngle > 0 && elevationAngle > 0 ? (height * Math.cos(tiltAngle * RAD)) + ((height * Math.sin(tiltAngle * RAD)) / Math.tan(elevationAngle * RAD)) : height
  return width * height
}

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