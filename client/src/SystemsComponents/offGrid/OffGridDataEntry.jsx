import React, { useEffect, useState } from 'react'

function OffGridDataEntry(props) {
    const { setOnSubmit, setData, data } = props

    const [totalEnergy, setTotalEnergy] = useState(0)
    const [totalPower, setTotalPower] = useState(0)

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
        setData({ totalEnergy, totalPower, devices })
        console.log(devices);
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
                    {/* <div className="data-grid-container" >
                        <label className="data-input device " htmlFor="area">Area
                            <div>
                                <input type="number" name="area" id="area" />
                                <span>m<sup>2</sup></span>
                            </div>
                        </label>
                        <label className="data-input hd" htmlFor="government">Government
                            <select name="government" id="government">
                                <option value="cairo">Cairo</option>
                                <option value="qalubia">Qalubia</option>
                                <option value="ealexandia">Ealexandia</option>
                            </select>
                        </label>
                    </div>
                    <hr /> */}
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
                                device: "",
                                quantity: 0,
                                power: 0,
                                hours: 0

                            }])}>
                            <span>Add device</span>+
                        </button>
                        <button type='button' className={devices.length > 1 ? 'device btn failed' : "device btn failed disabled "}
                            onClick={() => setDevices(pv => pv.length > 1 ? pv.filter((x, i) => i !== pv.length - 1) : pv)}>
                            <span>Remove device</span>-
                        </button>
                        <p></p>
                        <p>total Power = {nFormatter(totalPower,1)}W</p>
                        <p>total Energy = {nFormatter(totalEnergy,1)}Whr</p>

                    </div>


                </div>

            </div>

            <div className="center">
                <button className={totalEnergy === 0 ? "btn primary disabled" : "btn primary"} disabled={totalEnergy === 0}>next</button>
            </div>

        </form>
    )
}

export default OffGridDataEntry
