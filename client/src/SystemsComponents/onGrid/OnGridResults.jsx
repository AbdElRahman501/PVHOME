import React, { useState } from 'react'
import { useEffect } from 'react';
import { choseInverter } from '../../actions/choseElements';
import CircleProgressBar from '../../components/CircleProgressBar';

function OnGridResults(props) {
    const { data, changeHandler } = props
    const [height, setHeight] = useState(false)
    const [selectedInverter, setSelectedInverter] = useState("")

    const [InverterState, setInverters] = useState({})

    const { inverters, loading: inverterLoading, error: inverterError } = InverterState

    useEffect(() => {
        if (data) {
            choseInverter(data.power, setInverters);
        }
    }, [data])
    useEffect(() => {
        if (selectedInverter) {
            let newArr = [selectedInverter, ...inverters.filter(x => x.id !== selectedInverter.id)]
            if (newArr[0].id !== inverters[0].id) {
                setInverters({ inverters: newArr })
            }
        }

    }, [selectedInverter])
    return (
        <div>
            <div>
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
                        <div className='relative' style={{ height: "90px" }}>
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

                        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
                            <h4>NUMBER</h4>
                            <h4>PRICE</h4>
                            <h4>TOTAL COST</h4>
                            <h4>POWER</h4>
                        </div>
                        <div className='grid data' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
                            <h4>{inverters[0].num} </h4>
                            <h4>{inverters[0].price} EGP </h4>
                            <h4>{inverters[0].totalPrice} EGP </h4>
                            <h4>{inverters[0].power} W</h4>
                        </div>
                    </>}
                    {/* <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice || inverter?.price} EGP </h3> */}


                </div>
            </div>

            <div className="center">
                <button className="btn secondary" onClick={changeHandler}>Change</button>
            </div>

        </div>
    )
}

export default OnGridResults
