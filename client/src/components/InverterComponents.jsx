import React, { useEffect, useState } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { NumFormatter } from '../actions/Functions'
import { choseBattery, choseInverter } from '../actions/choseElements'


function InverterComponents(props) {
  const { data, setData, setBattery, InverterState, panelsState, setInverters } = props

  const [selectedInverter, setSelectedInverter] = useState("")
  const [height, setHeight] = useState(false)

  const { panels, loading: panelsLoading, error: panelsError } = panelsState
  const { inverters, loading: inverterLoading, error: inverterError } = InverterState

  useEffect(() => {
    if (data.totalPower) {
      choseInverter(data, setInverters);
    }
  }, [data.totalPower])

  useEffect(() => {
    if (data.expectedArea && panels?.length > 0) {
      setData(pv => ({ ...pv, totalPower: (panels[0].power * panels[0].numOfPanels) }))
    }
  }, [panels])

  useEffect(() => {
    if (inverters) {
      if (data.totalEnergy) {
        choseBattery(data, inverters[0], setBattery)
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

  const Slider = document.querySelector(".horizontal-slider.inverter")
  useEffect(() => {
    if (!height && Slider) {
      Slider.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      })
    }
  }, [height, Slider])

  return (
    <div className="data-entry-box">
      {inverterLoading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
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
          <div className='horizontal-slider inverter' style={{ height: height ? "300%" : "100%", overflow: height ? "scroll" : "hidden" }}>

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

          <h4> {inverters[0].type === "On Grid" ? inverters[0].voltageRang.min + " >> " + inverters[0].voltageRang.max : inverters[0].voltage.map((x, i) => i === 0 ? x : " / " + x)} V</h4>

        </div>
      </>}
      {/* <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice || inverter?.price} EGP </h3> */}


    </div>
  )
}

export default InverterComponents
