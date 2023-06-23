import React, { useState } from 'react'
import { NumFormatter } from '../../actions/Functions'
import devicesTemps from "../../components/devices.json"

export default function LoadData(props) {
    const { data, totalEnergy, totalPower, devices, setDevices } = props
    const [addDevice, setAddDevice] = useState([])


    return (
        <div className="data-entry-box">
            <div className="data-grid-container">
                <p className='device'>Device Name</p>
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

                            {addDevice.includes(x.id) ?
                                <input type="text" name="device" id="device" required={(i === 0) || x.power || x.hours || x.quantity} placeholder={x.deviceName}
                                    value={x.device}
                                    onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, device: e.target.value } : y))}
                                /> :
                                <select name="devices" id="devices" style={{ color: x.device ? "black" : "#838383" }}
                                    value={x.device}
                                    onChange={(e) => {
                                        if (e.target.value === "add device") {
                                            setAddDevice(pv => ([...pv, x.id]))
                                        } else {
                                            let selectedOption = e.target.options[e.target.selectedIndex];
                                            setDevices(pv => pv.map((y, k) => k == i ? { ...y, device: selectedOption.value, power: Number(selectedOption.getAttribute("power")) } : y))
                                        }
                                    }}
                                >
                                    <option value='' disabled  >select device</option>
                                    <option value='add device' style={{ color: "green" }} > ADD NEW DEVICE</option>
                                    {devicesTemps.sort((a, b) => a.name.localeCompare(b.name)).map((devicesName, index) =>
                                        <option key={index} power={devicesName.power} value={devicesName.name} > {devicesName.name}  </option>
                                    )}
                                </select>

                            }
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
                            <input type="number" name="hours" id="hours" min="0" max="24" required={devices[i]?.device ? true : false} placeholder={0}
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
                        id: (devices.length+1),
                        device: "",
                        quantity: 0,
                        power: 0,
                        hours: 0

                    }])}>
                    <span>Add device</span>+
                </button>

                <p></p>
                <p>total Power = {NumFormatter(totalPower, 1)}W</p>
                <p>total Energy = {NumFormatter(totalEnergy, 1)}Whr</p>

            </div>


        </div>
    )
}


