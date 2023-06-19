import React, { useEffect, useState } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { chosePanel } from '../actions/choseElements'
import { getArrangements } from '../actions/GetArrangements'

function PanelComponents(props) {
  const { data, InverterState, panelsState, setPanels } = props

  const [selectedPanel, setSelectedPanel] = useState("")
  const [height, setHeight] = useState(false)

  const { panels, loading: panelsLoading, error: panelsError } = panelsState
  const { inverters, loading: inverterLoading, error: inverterError } = InverterState
  const [arrangement, setArrangement] = useState("")

  useEffect(() => {
    if ((data.totalEnergy || data.totalPower) && inverters) {
      chosePanel({ data, inverter: inverters[0] }, setPanels);
    }
  }, [data, InverterState])

  useEffect(() => {
    if (data.area && data.dailyIrradiation) {
      chosePanel({ data }, setPanels)
    }
  }, [data])

  useEffect(() => {
    if (selectedPanel) {
      let newArr = [selectedPanel, ...panels.filter(x => x.id !== selectedPanel.id)]
      if (newArr[0].id !== panels[0].id) {
        setPanels({ panels: newArr })
      }
    }
    setArrangement("")
  }, [selectedPanel])

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

  useEffect(() => {
    if (panels?.length > 0 && !arrangement) {
      setArrangement(getArrangements(panels[0], { maxStringVoltage: 400, maxArrCurrent: 100, maxPower: 10000 })?.message)
    }
  }, [panels,arrangement])

  return (
    <div className="data-entry-box">
      {panelsLoading && <div className='center grid-item'><i style={{ fontSize: "60px" }} className=" fa fa-spinner fa-pulse"></i></div>}
      {panels?.length > 0 && <>
        <div className='grid'>
          <p>RANK</p>
          <p>TOTAL SCORE</p>
          <p>NUMBER SCORE</p>
          <p>AREA SCORE</p>
          <p>PRICE SCORE</p>
          <h6 className='nm'>PANEL NAME</h6>
        </div>
        <div className='relative horizontal-slider-box'>
          <div className='horizontal-slider panel' style={{ height: height ? "300%" : "100%", overflow: height ? "scroll" : "hidden" }}>
            {panels.map(panel => <div key={panel.id} className='grid scores '>
              <h4>#{panel?.rank}</h4>
              <CircleProgressBar>{panel.totalScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{panel.numScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{panel.areaScore.toFixed(0)}</CircleProgressBar>
              <CircleProgressBar>{panel.priceScore.toFixed(0)}</CircleProgressBar>
              <h6 className='nm' onClick={() => {
                if (panel.id === selectedPanel.id) {
                  setHeight(pv => pv ? false : true)
                } else {
                  setSelectedPanel(panel)
                  setHeight(pv => pv ? false : true)
                }
              }}>{panel.numOfPanels + " X " + panel.name} <i className='fa fa-angle-down'></i></h6>
            </div>)}
          </div>
        </div>

        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
          <h4>NUMBER</h4>
          <h4>POWER</h4>
          <h4>TOTAL COST</h4>
          <h4>TOTAL AREA</h4>

        </div>
        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
          <h4>{arrangement}</h4>
          <h4>{panels[0]?.power} W </h4>
          <h4>{panels[0]?.price} EGP X {panels[0].numOfPanels} = {panels[0].totalPrice} EGP </h4>
          <h4>{panels[0]?.totalArea?.toFixed(0)} m<sup>2</sup></h4>


        </div>
      </>}
      {/* <h3 className='center'>{panel?.numOfPanels} of {panel?.name} with a total price {panel?.totalPrice || panel?.price} EGP </h3> */}


    </div>
  )
}

export default PanelComponents
