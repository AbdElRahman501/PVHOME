import React, { useEffect, useState } from 'react'
import { NumFormatter } from '../actions/Functions'
import CircleProgressBar from './CircleProgressBar'

function BatteryComponents(props) {
    const { BatteryState, setBattery } = props
    const { batteries, loading: batteryLoading, error: batteryError } = BatteryState

    const [height, setHeight] = useState(false)
    const [selectedBattery, setSelectedBattery] = useState("")

    useEffect(() => {
        if (selectedBattery) {
            let newArr = [selectedBattery, ...batteries.filter(x => x.id !== selectedBattery.id)]
            if (newArr[0].id !== batteries[0].id) {
                setBattery({ batteries: newArr })
            }
        }

    }, [selectedBattery])

    return (
        <div className="data-entry-box">
            {batteryLoading && <h3 className='center'>loading</h3>}
            {batteryError && <h3 className='center'>{batteryError}</h3>}
            {batteries?.length > 0 && <>
                <div className='grid'>
                    <p>RANK</p>
                    <p>TOTAL SCORE</p>
                    <p>NUMBER SCORE</p>
                    <p>PRICE SCORE</p>
                    <h6 className='nm'>INVERTER NAME</h6>
                </div>
                <div className='relative horizontal-slider-box'>
                    <div className='horizontal-slider' style={{ height: height ? "300%" : "100%" }}>
                        {batteries.map(battery => <div key={battery.id} className='grid scores '>
                            <h4>#{battery?.rank}</h4>
                            <CircleProgressBar>{battery.totalScore?.toFixed(0)}</CircleProgressBar>
                            <CircleProgressBar>{battery.numScore?.toFixed(0)}</CircleProgressBar>
                            <CircleProgressBar>{battery.priceScore?.toFixed(0)}</CircleProgressBar>
                            <h6 className='nm' onClick={() => {
                                if (battery.id === selectedBattery.id) {
                                    setHeight(pv => pv ? false : true)
                                } else {
                                    setSelectedBattery(battery)
                                    setHeight(pv => pv ? false : true)
                                }
                            }}>{battery.num + " X " + battery.name} <i className='fa fa-angle-down'></i></h6>
                        </div>)}
                    </div>
                </div>

                <div className='grid data' style={{ gridTemplateColumns: "repeat(5,1fr)", height: "50px" }}>
                    <h4>NUMBER</h4>
                    <h4>PRICE</h4>
                    <h4>TOTAL COST</h4>
                    <h4>CAPACITY</h4>
                    <h4>VOLTAGE</h4>


                </div>
                <div className='grid data' style={{ gridTemplateColumns: "repeat(5,1fr)", height: "50px" }}>
                    <h4>{batteries[0].branch + "x" + batteries[0].batteryPerBranch + "=" + batteries[0].num} </h4>
                    <h4>{batteries[0].price} EGP </h4>
                    <h4>{batteries[0].totalPrice} EGP </h4>
                    <h4>{batteries[0].ampereHour} Ah</h4>
                    <h4>{batteries[0].voltage} V</h4>


                </div>
            </>}
            {/* <h3 className='center'>{battery?.num} of {battery?.name} with a total price {battery?.totalPrice || battery?.price} EGP </h3> */}


        </div>
    )
}

export default BatteryComponents
