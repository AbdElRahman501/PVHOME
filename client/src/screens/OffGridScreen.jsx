import React, { useEffect } from 'react'
import { useState } from 'react';


function OffGridScreen() {

    const [onSubmit, setOnSubmit] = useState(false)
    const [totalEnergy, setTotalEnergy] = useState(0)
    const [totalPower, setTotalPower] = useState(0)


    function submitHandler(e) {
        e.preventDefault();
        setOnSubmit(true)
        console.log(devices);
    }

    const [devices, setDevices] = useState([{
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

    return (
        <section id="data-entry">
            <div className="center bk">
                <div className="data-entry-container content">
                    <div className="center">
                        <h1>OFF Grid</h1>
                    </div>

                    <form onSubmit={submitHandler}>
                        <div className="data-entry-box center">
                            <div>
                                <div className="data-grid-container">
                                    <p className='device'>Device</p>
                                    <p>Quantity</p>
                                    <p>Power</p>
                                    <p>Operation Hours</p>

                                </div>
                                {devices.map((x, i) =>
                                    <div className="data-grid-container" key={i}>
                                        <label className="data-input device" htmlFor="device" >
                                            <div>
                                                <input type="text" name="device" id="device" required placeholder={x.deviceName}
                                                    value={x.device}
                                                    onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, device: e.target.value } : y))}
                                                />

                                            </div>
                                        </label>
                                        <label className="data-input " htmlFor="quantity">
                                            <div>
                                                <input type="number" name="quantity" id="quantity" required
                                                    value={x.quantity}
                                                    onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, quantity: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                                />

                                            </div>

                                        </label>
                                        <label className="data-input " htmlFor="power">
                                            <div>
                                                <input type="number" name="Power" id="power" required
                                                    value={x.power}
                                                    onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, power: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                                />
                                                <span>W</span>
                                            </div>
                                        </label>
                                        <label className="data-input " htmlFor="hours">
                                            <div>
                                                <input type="number" name="hours" id="hours" required
                                                    value={x.hours}
                                                    onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, hours: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                                />
                                                <span>H</span>
                                            </div>

                                        </label>
                                    </div>
                                )}
                                <div className="data-grid-container results">
                                    <button type='button' className='device btn success'
                                        onClick={() => setDevices(pv => [...pv, {
                                            deviceName: "Device Name",
                                            device:"",
                                            quantity: 0,
                                            power: 0,
                                            hours: 0

                                        }])}>
                                        <span>Add device</span>+
                                    </button>
                                    <button type='button' className={devices.length > 1?'device btn failed':"device btn failed disabled "}
                                        onClick={() => setDevices(pv => pv.length > 1 ? pv.filter((x, i) => i !== pv.length - 1) : pv)}>
                                        <span>Remove device</span>-
                                    </button>
                                    <p></p>
                                    <p>total Power = {totalPower} W</p>
                                    <p>total Energy = {totalEnergy} Wh</p>

                                </div>

                                {/* <label className="data-input"  htmlFor="government">Government
                                <select name="government" id="government">
                                    <option value="cairo">Cairo</option>
                                    <option value="qalubia">Qalubia</option>
                                    <option value="ealexandia">Ealexandia</option>
                                </select>
                            </label>
                            <div className="flex-container">
                                <label className="data-input "  htmlFor="area">Area
                                    <div>
                                        <input type="number" name="area" id="area" />
                                        <span>m<sup>2</sup></span>
                                    </div>
                                </label>
                                <label className="data-input "  htmlFor="total-power">Total Power
                                    <div>
                                        <input type="number" name="total-power" id="total-power" />
                                        <span>W</span>
                                    </div>

                                </label>

                            </div> */}
                            </div>

                        </div>

                        <div className="center">
                            <button className={+totalEnergy===0?"btn primary disabled":"btn primary"} disabled={totalEnergy===0}>next</button>
                        </div>

                    </form>
                </div>
            </div>
        </section>
    )
}

export default OffGridScreen
