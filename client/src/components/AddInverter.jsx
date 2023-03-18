import React, { useEffect, useState } from 'react'
import { addInverter } from '../actions/AddDevicesAction';

export default function AddInverter() {
    const [data, setData] = useState({})
    const [{ success, loading, error }, setAddInverter] = useState({});

    function submitHandler(e) {
        e.preventDefault();
        if (data) {
            addInverter(data, setAddInverter)
        }
    }
    useEffect(() => {
        if (success) {
            setData({})
        }
    }, [success])

    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                {success ?
                    <div className='grid-container' style={{ width: "400px" }}>
                        <h1>inverter Added Successfully</h1>
                        <img className="big-icon" src="/images/icons8-checkmark-128.png" alt="" />
                    </div>
                    :
                    <div className='data-container'>
                        <label className="data-input" htmlFor="name"><p>Name<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='name' placeholder='Enter  Name' required onChange={(e) => setData((pv) => pv && { ...pv, name: e.target.value })} />
                        </label>
                        <label className="data-input" htmlFor="manufacturer"><p>manufacturer<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='manufacturer' placeholder='Enter  manufacturer' required
                                value={data.manufacturer || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, manufacturer: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="model"><p>model<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" min="200" max="20000" id='model' placeholder='Enter model ' required
                                value={data.model || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, model: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="type"><p>Type<sup><i className='fa fa-asterisk'></i></sup></p>
                            <select name="type" id="type" required style={{ color: data.type ? "black" : "#838383" }}
                                value={data.type || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, type: e.target.value })}
                            ><option value='' disabled  >Select inverter type</option>
                                <option value="On Grid" >On Grid</option>
                                <option value="OFF Grid" >OFF Grid</option>
                                <option value="hybrid" >hybrid</option>
                            </select>
                        </label>
                        {data.type === "On Grid" && <div className="flex-container center" >
                            <label className="data-input flex-item" htmlFor="Min Voltage"><p>Min Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="0"  max="2000" step="any" id='Max-voltage' placeholder='Enter Min Voltage' required
                                        value={data.voltageRang?.min || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voltageRang: Number(e.target.value) >= 0 ? { ...pv.voltageRang, min: Number(e.target.value) } : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Max Voltage"><p>Max Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min={data.voltageRang?.min?.toFixed(0) || "0"} max="2000" step="any" id='Min-voltage' placeholder='Enter Max Voltage ' required
                                        value={data.voltageRang?.max || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voltageRang: Number(e.target.value) >= 0 ? { ...pv.voltageRang, max: Number(e.target.value) } : "" })}
                                    />
                                    <span>v</span>
                                </div>
                            </label>
                        </div>}
                        <div className="flex-container center" >
                            {data.type !== "On Grid" && <label className="data-input flex-item" htmlFor="voltage"><p>voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" id='voltage' placeholder='Enter  voltage' required
                                        value={data.voltage || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voltage: Number(e.target.value) >= 0 ? [Number(e.target.value)] : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>}
                            <label className="data-input flex-item" htmlFor="power" style={{ width: data.type !== "On Grid" ? "50%" : "100%" }}><p>power<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="200" max="80000" id='power' placeholder='Enter power ' required
                                        value={data.power || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, power: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>W</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex-container center relative transition" >
                            <label className="data-input flex-item" htmlFor="Price"><p>Price<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter  Price' required
                                        value={data.price || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, price: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>EGP</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Efficiency"><p>Efficiency<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="50" max="100" placeholder='Enter efficiency ' required
                                        value={data.efficiency || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, efficiency: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>%</span>
                                </div>
                            </label>
                        </div>
                    </div>
                }
            </div>
            <div className="center">
                {success ?
                    <button type='button' onClick={() => setAddInverter({})} className="btn secondary"  >Add New</button>
                    :
                    <button type='submit' className="btn primary" disabled={loading || !data} >{loading ? <i className="fa fa-spinner fa-pulse"></i> : "Add"}</button>
                }
            </div>
        </form>

    )
}

