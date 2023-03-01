import React, { useEffect, useState } from 'react'
import CircleProgressBar from './CircleProgressBar'
import { chosePanel} from '../actions/choseElements'


function PanelComponents(props) {
  const { data ,InverterState} = props

  const [selectedPanel, setSelectedPanel] = useState("")
  const [height, setHeight] = useState(false)
  const [panelsState, setPanels] = useState({})

  const { panels, loading: panelsLoading, error: panelsError } = panelsState
  const { inverters, loading: inverterLoading, error: inverterError } = InverterState


  useEffect(() => {
    if (data && inverters) {
        chosePanel({energy:data.totalEnergy,inverter:inverters[0],loss:0.85,peakSonHours:5,expectArea:0}, setPanels);
    }
  }, [data,InverterState])


  useEffect(() => {
    if (selectedPanel) {
      let newArr = [selectedPanel, ...panels.filter(x => x.id !== selectedPanel.id)]
      if (newArr[0].id !== panels[0].id) {
        setPanels({ panels: newArr })
      }
    }

  }, [selectedPanel])

  return (
    <div className="data-entry-box">
      {panelsLoading || inverterLoading && <h3 className='center'>loading</h3>}
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
          <div className='horizontal-slider' style={{ height: height ? "300%" : "100%" }}>
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
          <h4>{panels[0].numOfPanels} </h4>
          <h4>{panels[0].power} W </h4>
          <h4>{panels[0].price} EGP X {panels[0].numOfPanels} = {panels[0].totalPrice} EGP </h4>
          <h4>{panels[0].totalArea.toFixed(0)} m<sup>2</sup></h4>
          

        </div>
      </>}
      {/* <h3 className='center'>{panel?.numOfPanels} of {panel?.name} with a total price {panel?.totalPrice || panel?.price} EGP </h3> */}


    </div>
  )
}

export default PanelComponents
