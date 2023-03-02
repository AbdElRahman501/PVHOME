import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Panels from '../models/panelsModel.js';


const panelRouter = express.Router();

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
  '/chosePanel',
  expressAsyncHandler(async (req, res) => {
    let panels = await Panels.find({})
    panels = panels.map(x => {
      return { id: x._id, name: x.name, power: x.power, vmpp: x.vmpp, impp: x.impp, voc: x.voc, isc: x.isc, dimensions: x.dimensions, price: x.price, efficiency: x.efficiency }
    })
    const { energy, inverter, loss, peakSonHours, expectArea } = req.body
    let response = chosePanels({
      energy, inverter, loss, peakSonHours, panels,
      tiltAngle: 28,
      AzimuthAngle: 23,
      expectArea
    })
    res.json(response);
  })
);



export default panelRouter;

function chosePanels(data) {
  let { energy, inverter, loss, peakSonHours, panels, tiltAngle, AzimuthAngle, expectArea } = data

  tiltAngle = tiltAngle * (Math.PI / 180)
  AzimuthAngle = AzimuthAngle * (Math.PI / 180)

  let maxStringVoltage = 400;
  let maxArrayAmps = 100;

  let shPanels = [];
  let score = []

  panels.sort(function (a, b) {
    return a.power - b.power;
  });

  energy = energy / (inverter.efficiency / 100) || energy / 0.97
  energy = energy / loss || energy / 0.85
  let panelsPower = energy / peakSonHours || energy / 5
  for (let panel of panels) {
    let numOfPanels = Number((panelsPower / panel.power).toFixed(0))
    numOfPanels = numOfPanels > 0 ? numOfPanels : numOfPanels + 1
    // numOfPanels = numOfPanels % 2 !== 0 && numOfPanels !== 1 ? numOfPanels + 1 : numOfPanels
    let totalPrice = numOfPanels * panel.price
    let height = Math.max((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
    height = (height * Math.cos(tiltAngle)) + ((height * Math.sin(tiltAngle)) / Math.tan(AzimuthAngle))
    let width = Math.min((panel.dimensions.width / 1000), (panel.dimensions.height / 1000))
    let area = width * height
    let totalArea = numOfPanels * area

    shPanels.push({
      ...panel,
      numOfPanels,
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
    // console.log( closeTo(shPanels.map(x=> x.totalArea),panel.totalArea,expectArea))
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
