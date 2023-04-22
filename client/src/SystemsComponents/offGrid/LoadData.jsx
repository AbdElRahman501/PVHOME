import React, { useEffect, useState } from 'react'
import { NumFormatter } from '../../actions/Functions'

export default function LoadData(props) {
    const {data , totalEnergy,totalPower,devices, setDevices} = props


  return (
    <div className="data-entry-box">
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
                                        <input type="text" name="device" id="device" required={i === 0} placeholder={x.deviceName}
                                            value={x.device}
                                            onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, device: e.target.value } : y))}
                                        />

                                    </div>
                                </label>
                                <label className="data-input " htmlFor="quantity">
                                    <div>
                                        <input type="number" name="quantity" id="quantity" required={devices[i].device ? true : false}
                                            value={x.quantity === 0 ? "" : x.quantity}
                                            onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, quantity: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                        />

                                    </div>

                                </label>
                                <label className="data-input " htmlFor="power">
                                    <div>
                                        <input type="number" name="Power" id="power" required={devices[i]?.device ? true : false}
                                            value={x.power === 0 ? "" : x.power}
                                            onChange={(e) => setDevices(pv => pv.map((y, k) => k == i ? { ...y, power: Number(e.target.value) > 0 ? Number(e.target.value) : 0 } : y))}
                                        />
                                        <span>W</span>
                                    </div>
                                </label>
                                <label className="data-input " htmlFor="hours">
                                    <div>
                                        <input type="number" name="hours" id="hours" required={devices[i]?.device ? true : false}
                                            value={x.hours === 0 ? "" : x.hours}
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
                            <p>total Power = {NumFormatter(totalPower, 1)}W</p>
                            <p>total Energy = {NumFormatter(totalEnergy, 1)}Whr</p>

                        </div>


                    </div>
  )
}


