import React, { useEffect, useState } from 'react'
import { addInverter } from '../actions/AddDevicesAction';

export default function AddSolarCharger() {
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
                    <div className='grid-container' style={{width:"400px"}}>
                        <h1>inverter Added Successfully</h1>
                        <img className="big-icon" src="/images/icons8-checkmark-128.png" alt="" />
                    </div>
                    :
                    <div className='data-container'>
                        <label className="data-input" htmlFor="name">Name
                            <input type="text" id='name' placeholder='Enter  Name' required onChange={(e) => setData((pv) => pv && { ...pv, name: e.target.value })} />
                        </label>
                        <label className="data-input" htmlFor="manufacturer">manufacturer
                            <input type="text" id='manufacturer' placeholder='Enter  manufacturer' required
                                value={data.manufacturer || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, manufacturer: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="model">model
                            <input type="text" min="200" max="20000" id='model' placeholder='Enter model ' required
                                value={data.model || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, model: e.target.value })}
                            />
                        </label>
                        <div className="flex-container center" >
                            <label className="data-input flex-item" htmlFor="voltage">voltage
                                <div>
                                    <input type="number" id='voltage' placeholder='Enter  voltage' required
                                        value={data.voltage || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voltage: Number(e.target.value) >= 0 ? [Number(e.target.value)] : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="power">power
                                <div>
                                    <input type="number" min="200" max="20000" id='power' placeholder='Enter power ' required
                                        value={data.power || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, power: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>W</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex-container center relative transition" >
                            <label className="data-input flex-item" htmlFor="Price">Price
                                <div>
                                    <input type="number" placeholder='Enter  Price' required
                                        value={data.price || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, price: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>EGP</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Efficiency">Efficiency
                                <div>
                                    <input type="number" min="80" max="100" placeholder='Enter efficiency ' required
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
                    <button type='button' onClick={() => setAddInverter({}) } className="btn secondary"  >Add New</button>
                    :
                    <button type='submit' className="btn primary" disabled={loading || !data} >{loading ? <i className="fa fa-spinner fa-pulse"></i> : "Add"}</button>
                }
            </div>
        </form>

    )
}

