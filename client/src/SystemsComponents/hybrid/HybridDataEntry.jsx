import React, { useEffect, useState } from 'react'
import governments from "../../components/governments.json"
import cities from "../../components/cities.json"
import { getLocation } from '../../actions/choseElements'

export default function HybridDataEntry(props) {
    const { setOnSubmit, setData, data } = props

    const [totalEnergy, setTotalEnergy] = useState(0)
    const [totalPower, setTotalPower] = useState(0)

    const [{ coordinates, loading: coordinateLoading, error: coodrinateError }, setCoordinates] = useState({});
    const [{ dailyIrradiation, loading: irradiationLoading, error: irradiationError }, setIrradiation] = useState({});


    useEffect(() => {
        if (data.government && data.city) {
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

    const [devices, setDevices] = useState(data.devices || [{
        deviceName: "lamps",
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "fridge",
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "TV",
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }, {
        deviceName: "fan",
        device: "",
        quantity: 0,
        power: 0,
        hours: 0

    }])

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
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center">
                <div>
                    <div className="data-grid-container" >
                        <label className="data-input hd " htmlFor="government">Government
                            {/* <input type="text" name="" id="" onChange={(e) => setData((pv) => pv && { ...pv, government: e.target.value })} /> */}

                            <select name="government" id="government" required style={{ color: data.government ? "black" : "#838383" }}
                                value={data.government || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, government: e.target.value, governorate_id: e.target[e.target.selectedIndex].id, city: "" })}
                            ><option value='' disabled  >Select your government</option>
                                {governments.map((x, i) => <option key={i} value={x.governorate_name_en} id={x.id}>{x.governorate_name_en}</option>)}
                            </select>

                        </label>

                        <label className="data-input device" htmlFor="city" style={{ display: data.government ? "grid" : "none" }}>city
                            <select name="city" id="city" required style={{ color: data.city ? "black" : "#838383" }}
                                value={data.city || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, city: e.target.value })}
                            ><option value='' disabled  >Select your city</option>
                                {cities.filter((x) => x.governorate_id === data.governorate_id).map((x, i) => <option key={i} value={x.city_name_en}>{x.city_name_en}</option>)}
                            </select>
                        </label>
                    </div>
                    <hr />
                    <div className="data-grid-container">
                        <p className='device'>Device</p>
                        <p>Quantity</p>
                        <p>Power</p>
                        <p>Operation Hours</p>

                    </div>
                    {devices.map((x, i) =>
                        <div className="data-grid-container" key={i}>
                            <div className='bbtn delete'>
                                <button type='button' disabled={devices.length === 1} className={devices.length > 1 ? 'device btn remove' : "device btn remove disabled "}
                                    onClick={() => setDevices(pv => pv.filter((x, index) => i !== index))}>
                                    <i className='fa fa-trash'></i>
                                </button>
                            </div>
                            <label className="data-input device" htmlFor="device" >
                                <div>
                                    <input type="text" name="device" id="device" required={i === 0} placeholder={x.deviceName}
                                        value={x.device}
                                        onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, device: e.target.value } : y))}
                                    />

                                </div>
                            </label>
                            <label className="data-input " htmlFor="quantity">
                                <div>
                                    <input type="number" name="quantity" id="quantity" required={devices[i].device ? true : false} placeholder={0}
                                        value={x.quantity === 0 ? "" : x.quantity}
                                        onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, quantity: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                    />

                                </div>

                            </label>
                            <label className="data-input " htmlFor="power">
                                <div>
                                    <input type="number" name="Power" id="power" required={devices[i]?.device ? true : false} placeholder={0}
                                        value={x.power === 0 ? "" : x.power}
                                        onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, power: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                    />
                                    <span>W</span>
                                </div>
                            </label>
                            <label className="data-input " htmlFor="hours">
                                <div>
                                    <input type="number" name="hours" id="hours" required={devices[i]?.device ? true : false} placeholder={0}
                                        value={x.hours === 0 ? "" : x.hours}
                                        onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, hours: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                    />
                                    <span>H</span>
                                </div>

                            </label>
                        </div>
                    )}
                    <div className="data-grid-container results">
                        <button type='button' className='device btn add'
                            onClick={() => setDevices(pv => [...pv, {
                                deviceName: "Device Name",
                                device: "",
                                quantity: 0,
                                power: 0,
                                hours: 0

                            }])}>
                            <span>Add device</span>+
                        </button>
                        
                        <p></p>
                        <p>total Power = {nFormatter(totalPower, 1)}W</p>
                        <p>total Energy = {nFormatter(totalEnergy, 1)}Whr</p>

                    </div>


                </div>

            </div>

            <div className="center">
                <button className={totalEnergy === 0 ? "btn primary disabled" : "btn primary"} disabled={totalEnergy === 0 || coordinateLoading || irradiationLoading}>{coordinateLoading || irradiationLoading ? <i className="fa fa-spinner fa-pulse"></i> : "submit"}</button>
            </div>

        </form>
    )
}

