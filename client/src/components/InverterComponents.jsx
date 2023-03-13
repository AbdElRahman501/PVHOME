import React, { useEffect, useState } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { NumFormatter } from '../actions/Functions'
import { choseBattery, choseInverter } from '../actions/choseElements'


function InverterComponents(props) {
  const { data, setBattery, InverterState, panelsState, setInverters } = props

  const [selectedInverter, setSelectedInverter] = useState("")
  const [height, setHeight] = useState(false)

  const { panels, loading: panelsLoading, error: panelsError } = panelsState
  const { inverters, loading: inverterLoading, error: inverterError } = InverterState

  useEffect(() => {
    if (data.totalPower && !inverters) {
      choseInverter(data.totalPower, data.rang, setInverters);
    } 
  }, [data])

  useEffect(() => {
    if (data.area && panels) {
      let power = panels[0].power * panels[0].numOfPanels
      choseInverter(power, 0 , setInverters);
    }
  }, [panels])

  useEffect(() => {
    if (inverters) {
      if (data.totalEnergy) {
        choseBattery(data.totalEnergy, inverters[0], setBattery)
      }
      setSelectedInverter(inverters[0])
    }
  }, [inverters])

  useEffect(() => {
    if (selectedInverter && inverters) {
      let newArr = [selectedInverter, ...inverters.filter(x => x.id !== selectedInverter.id)]
      if (newArr[0].id !== inverters[0].id) {
        setInverters({ inverters: newArr })
      }
    }

  }, [selectedInverter])


  return (
    <div className="data-entry-box">
      {inverterLoading && <h3 className='center'>loading</h3>}
      {inverters?.length > 0 && <>
        <div className='grid'>
          <p>RANK</p>
          <p>TOTAL SCORE</p>
          <p>NUMBER SCORE</p>
          <p>POWER SCORE</p>
          <p>PRICE SCORE</p>
          <h6 className='nm'>INVERTER NAME</h6>
        </div>
        <div className='relative horizontal-slider-box'>
          <div className='horizontal-slider' style={{ height: height ? "300%" : "100%" }}>
            {inverters.map(inverter => <div key={inverter.id} className='grid scores '>
              <h4>#{inverter?.rank}</h4>
              <CircleProgressBar>{inverter.totalScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{inverter.numScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{inverter.powerScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{inverter.priceScore.toFixed(0)}</CircleProgressBar>
              <h6 className='nm' onClick={() => {
                if (inverter.id === selectedInverter.id) {
                  setHeight(pv => pv ? false : true)
                } else {
                  setSelectedInverter(inverter)
                  setHeight(pv => pv ? false : true)
                }
              }}>{inverter.num + " X " + inverter.name} <i className='fa fa-angle-down'></i></h6>
            </div>)}
          </div>
        </div>

        <div className='grid data' style={{ gridTemplateColumns: "repeat(5,1fr)", height: "50px" }}>
          <h4>NUMBER</h4>
          <h4>TOTAL COST</h4>
          <h4>POWER</h4>
          {inverters[0].num > 1 && <h4>TOTAL POWER</h4>}
          <h4>VOLTAGE</h4>

        </div>
        <div className='grid data' style={{ gridTemplateColumns: "repeat(5,1fr)", height: "50px" }}>
          <h4>{inverters[0].num} </h4>
          <h4>{inverters[0].price} EGP X {inverters[0].num} = {inverters[0].totalPrice} EGP </h4>
          <h4>{inverters[0].power} W</h4>
          {inverters[0].num > 1 && <h4>{NumFormatter(inverters[0].power * inverters[0].num, 2)} W</h4>}

          <h4> {inverters[0].voltage.map((x, i) => i === 0 ? x : "/" + x)} V</h4>

        </div>
      </>}
      {/* <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice || inverter?.price} EGP </h3> */}


    </div>
  )
}

export default InverterComponents
