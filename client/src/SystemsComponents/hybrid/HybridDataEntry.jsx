import React, { useEffect, useState } from 'react'
import { getLocation } from '../../actions/choseElements'
import LoadData from '../offGrid/LoadData'
import LocationData from '../offGrid/LocationData'

export default function HybridDataEntry(props) {
    const { setOnSubmit, setData, data, localData } = props

    const [{ coordinates, loading: coordinateLoading, error: coordinateError }, setCoordinates] = useState({});

    const [{ dailyIrradiation, loading: irradiationLoading, error: irradiationError }, setIrradiation] = useState({});

    useEffect(() => {
        if (coordinateError || irradiationError) {
            setData(pv => ({ ...pv, error: coordinateError || irradiationError }))
        }
    }, [coordinateError, irradiationError])

    useEffect(() => {
        if (data.government && data.city && (localData?.city !== data?.city)) {
            getLocation(data.government, data.city, setCoordinates, setIrradiation)
        } else {
            setCoordinates({})
        }
    }, [data?.city])

    useEffect(() => {
        if (coordinates && dailyIrradiation) {
            setData(pv => ({ ...pv, coordinates, dailyIrradiation }))
        }
    }, [coordinates && dailyIrradiation])

    const [totalEnergy, setTotalEnergy] = useState(0)
    const [totalPower, setTotalPower] = useState(0)
    const [devices, setDevices] = useState(data.devices || [{
        deviceName: "ex: lamps",
        id: 1,
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "ex: fridge",
        id: 2,
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "ex: TV",
        id: 3,
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "ex: fan",
        id: 4,
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }])
    useEffect(() => {
        if (totalPower > 0) {
            setData(pv => ({ ...pv, devices }))
        }
    }, [devices])
    useEffect(() => {
        setTotalEnergy(devices.map(x => x.power * x.hours * x.quantity).reduce((a, b) => a + b))
        setTotalPower(devices.map(x => x.power * x.quantity).reduce((a, b) => a + b))
    }, [devices])



    function submitHandler(e) {
        e.preventDefault();
        setOnSubmit(true)
        setData(pv => ({ ...pv, totalEnergy, totalPower, devices }))
        localStorage.setItem("DATA-" + data.type, JSON.stringify(data))
        // console.log(devices);
    }

    const [active, setActive] = useState(0)
    const dataSlider = document.querySelector(".data-slider")
    const dataBox = dataSlider?.querySelectorAll(".data-entry-box")

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
    return (
        <form onSubmit={submitHandler}>
            <div className='center relative'>
                <div className='data-slider'>
                    <LoadData data={data} setData={setData} totalEnergy={totalEnergy} totalPower={totalPower} devices={devices} setDevices={setDevices} />
                    <LocationData data={data} setData={setData} coordinates={coordinates} setCoordinates={setCoordinates} />

                </div>
            </div>
            {active < dataBox?.length - 1 ? <div className="center">
                <button type='button' onClick={() => slide("next")} className={totalEnergy === 0 ? "btn primary disabled" : "btn primary"} disabled={totalEnergy === 0}>Next</button>
            </div> : <div className="center">
                <div className="flex-container">
                    <button type='button' onClick={() => slide("back")} className="btn secondary" >back</button>
                    <button className={totalEnergy === 0 || !data?.coordinates ? "btn primary disabled" : "btn primary"} disabled={totalEnergy === 0 || !data?.coordinates}>submit</button>

                </div>
            </div>}

        </form>
    )

}

