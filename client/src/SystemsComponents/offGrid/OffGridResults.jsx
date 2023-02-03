import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { choseBattery, choseInverter } from '../../actions/choseElements'

function OffGridResults(props) {
    const { setOnSubmit, data } = props
    const [active, setActive] = useState(0)
    const [height, setHeight] = useState(90)

    const dataSlider = document.querySelector(".data-slider")
    const dataBox = dataSlider?.querySelectorAll(".data-entry-box")
    const [{ inverters, loading: inverterLoading, error: inverterError },
        setInverter
    ] = useState({})
    const [{ battery, loading: batteryLoading, error: BatteryError },
        setBattery
    ] = useState({})

    useEffect(() => {
        if (data) {
            choseInverter(data.totalPower, setInverter);
        }
    }, [data])
    useEffect(() => {
        if (inverters) {

            choseBattery(data.totalEnergy, inverters[0], setBattery)
        }
    }, [inverters])

    function slide(dec) {
        let x
        if (dec === "next") {
            x = (active + 1) < dataBox.length ? (active + 1) : active
            setActive(x)
        } else {
            x = (active - 1) >= 0 ? (active - 1) : active
            setActive(x)
        }
        x = x * dataSlider.offsetWidth
        dataSlider.scrollTo({
            left: x,
            top: 0,
            behavior: 'smooth'
        })
    }
    function nFormatter(num, digits) {
        const lookup = [
            { value: 1, symbol: " " },
            { value: 1e3, symbol: " k" },
            { value: 1e6, symbol: " M" },
        ];
        const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
        var item = lookup.slice().reverse().find(function (item) {
            return num >= item.value;
        });
        return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
    }
    return (
        <div>
            <div className='center relative'>
                <div className='back'>{active !== 0 && <button onClick={() => slide("back")}><i className='fa fa-angle-left'></i></button>}</div>
                <div className='data-slider'>
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
                                <div className='horizontal-slider' style={{ height: height + "px" }}>
                                    {inverters.map(inverter => <div key={inverter.id} className='grid scores '>
                                        <h4>#{inverter?.rank}</h4>
                                        <p><span className='center' style={{ clip: `rect(0px,${inverter.totalScore < 50 ? (75 - ((inverter.totalScore / 100) * 70)) : 35}px,${inverter.totalScore > 50 ? (75 - ((inverter.totalScore / 100) * 70)) : 71}px,0px)`, rotate: `${inverter.totalScore < 50 ? 35 - (75 - ((inverter.totalScore / 100) * 70)) : 0}deg` }}></span>{inverter.totalScore.toFixed( )}%</p>
                                        <p><span className='center' style={{ clip: `rect(0px,${inverter.numScore < 50 ? (75 - ((inverter.numScore / 100) * 70)) : 35}px,${inverter.numScore > 50 ? (75 - ((inverter.numScore / 100) * 70)) : 71}px,0px)`, rotate: `${inverter.numScore < 50 ? 35 - (75 - ((inverter.numScore / 100) * 70)) : 0}deg` }}></span>{inverter.numScore.toFixed( )}%</p>
                                        <p><span className='center' style={{ clip: `rect(0px,${inverter.powerScore < 50 ? (75 - ((inverter.powerScore / 100) * 70)) : 35}px,${inverter.powerScore > 50 ? (75 - ((inverter.powerScore / 100) * 70)) : 71}px,0px)`, rotate: `${inverter.powerScore < 50 ? 35 - (75 - ((inverter.powerScore / 100) * 70)) : 0}deg` }}></span>{inverter.powerScore.toFixed( )}%</p>
                                        <p><span className='center' style={{ clip: `rect(0px,${inverter.priceScore < 50 ? (75 - ((inverter.priceScore / 100) * 70)) : 35}px,${inverter.priceScore > 50 ? (75 - ((inverter.priceScore / 100) * 70)) : 71}px,0px)`, rotate: `${inverter.priceScore < 50 ? 35 - (75 - ((inverter.priceScore / 100) * 70)) : 0}deg` }}></span>{inverter.priceScore.toFixed( )}%</p>
                                        <h6 className='nm' onClick={() => setHeight(pv => pv == 90 ? 90 * 3 : 90)}>{inverter.num +" X "+ inverter.name} <i  className='fa fa-angle-down'></i></h6>
                                    </div>)}
                                </div>
                            </div>

                            <div className='grid' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
                                <h4>NUMBER</h4>
                                <h4>PRICE</h4>
                                <h4>TOTAL COST</h4>
                                <h4>POWER</h4>
                            </div>
                            <div className='grid' style={{ gridTemplateColumns: "repeat(4,1fr)", height: "50px" }}>
                                <h4>{inverters[0].num} </h4>
                                <h4>{inverters[0].price} EGP </h4>
                                <h4>{inverters[0].totalPrice} EGP </h4>
                                <h4>{inverters[0].power} W</h4>
                            </div>
                        </>}
                        {/* <h3 className='center'>{inverter?.num} of {inverter?.name} with a total price {inverter?.totalPrice || inverter?.price} EGP </h3> */}


                    </div>
                    <div className="data-entry-box">
                        <p className='center'> battery capacity you will need = </p>
                        {batteryLoading ? <h3 className='center' >loading</h3> : <h3 className='center'>{battery?.num} of {battery?.name} with total price  {battery?.totalPrice} EGP </h3>
                        }
                        <p className='center'> Solar Panels you will need = </p>
                        <h3 className='center'>{Math.floor(((data.totalEnergy) / (0.75 * 5)) / 330) + 1} of 330w panels</h3>

                    </div>
                </div>
                <div className='next'>{active < dataBox?.length - 1 ? <button onClick={() => slide("next")} ><i className='fa fa-angle-right'></i></button> : ""} </div>
            </div>


            <div className="center relative">
                <div className='absolute'>
                        <p>{nFormatter(data.totalPower,2)} W</p>
                        <p>{nFormatter(data.totalEnergy,2)} whr</p>
                </div>
                <button className="btn secondary" onClick={() => setOnSubmit(false)} >Change</button>
            </div>

        </div>
    )
}

export default OffGridResults
