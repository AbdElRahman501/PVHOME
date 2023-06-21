import React, { useEffect, useState } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { choseSolarCharger } from '../actions/choseElements'

function SolarChargerComponent(props) {
  const { data, BatteryState, panelsState, chargerState, setSolarCharger } = props

  const [selectedSolarCharger, setSelectedCharger] = useState("")
  const [height, setHeight] = useState(false)

  const { panels, loading: panelsLoading, error: panelsError } = panelsState
  const { batteries, loading: batteryLoading, error: batteryError } = BatteryState
  const { chargers, loading: chargerLoading, error: chargerError } = chargerState

  useEffect(() => {
    if (batteries?.length > 0 && panels?.length > 0) {
      choseSolarCharger({ systemVoltage: batteries[0].systemVoltage, topResults: data.topResults, panel: panels[0] }, setSolarCharger)
    }
  }, [data, panels, batteries])


  useEffect(() => {
    if (selectedSolarCharger) {
      let newArr = [selectedSolarCharger, ...chargers.filter(x => x.id !== selectedSolarCharger.id)]
      if (newArr[0].id !== chargers[0].id) {
        setSolarCharger({ chargers: newArr })
      }
    }
  }, [selectedSolarCharger])

  const Slider = document.querySelector(".horizontal-slider.panel")
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
      {chargerLoading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
      {chargers?.length > 0 && <>
        <div className='grid'>
          <p>RANK</p>
          <p>TOTAL SCORE</p>
          <p>NUMBER SCORE</p>
          <p>PRICE SCORE</p>
          <h6 className='nm'>NAME</h6>
        </div>
        <div className='relative horizontal-slider-box'>
          <div className='horizontal-slider panel' style={{ height: height ? "300%" : "100%", overflow: height ? "scroll" : "hidden" }}>
            {chargers.map(charger => <div key={charger.id} className='grid scores '>
              <h4>#{charger?.rank}</h4>
              <CircleProgressBar>{charger.totalScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{charger.numScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{charger.priceScore.toFixed(0)}</CircleProgressBar>
              <h6 className='nm' onClick={() => {
                if (charger.id === selectedSolarCharger.id) {
                  setHeight(pv => pv ? false : true)
                } else {
                  setSelectedCharger(charger)
                  setHeight(pv => pv ? false : true)
                }
              }}>{charger.num + " X " + charger.name} <i className='fa fa-angle-down'></i></h6>
            </div>)}
          </div>
        </div>

        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
          <h4>NUMBER</h4>
          <h4>POWER</h4>
          <h4>TOTAL COST</h4>
          <h4>SYSTEM VOLTAGE</h4>

        </div>
        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
          <h4>{chargers[0]?.num}</h4>
          <h4>{chargers[0]?.maxPower} W </h4>
          <h4>{chargers[0]?.price} EGP X {chargers[0].num} = {chargers[0].totalPrice} EGP </h4>
          <h4>{chargers[0]?.systemVoltage.map((x, i) => i === 0 ? x : " / " + x)}</h4>

        </div>
      </>}
    </div>
  )
}

export default SolarChargerComponent
