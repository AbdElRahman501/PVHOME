import React, { useEffect, useState } from 'react'
import { addSolarCharger } from '../actions/AddDevicesAction';
import { removeSolarCharger, updateSolarCharger } from '../actions/DevicesList';
import SuccessMessage from './SuccessMessage';

export default function AddSolarCharger(props) {
    const { successMessage, selectedCharger, setSuccessMessage } = props
    const [data, setData] = useState({ ...selectedCharger })

    const [{ charger, success, loading, error }, setAddSolarCharger] = useState({});
    const [{ success: chargerUpdateSuccess, loading: chargerUpdateLoading, error: chargerUpdateError }, setUpdatedCharger] = useState({});
    const [{ success: removeChargerSuccess, loading: removeChargerLoading, error: removeChargerError }, setDeletedCharger] = useState({});

    const [voltage, setVoltage] = useState(data?.systemVoltage?.join(" / "))

    useEffect(() => {
        if (voltage) {
            let voltageArr = voltage.split("/").filter(x => x !== "").map(x => Number(x))
            setData(pv => ({ ...pv, systemVoltage: voltageArr }))
        }
    }, [voltage])

    function submitHandler(e) {
        e.preventDefault();
        if (data._id) {
            updateSolarCharger(data._id, data, setUpdatedCharger)
        } else {
            addSolarCharger(data, setAddSolarCharger)
        }
    }
    useEffect(() => {
        if (success) {
            setData({})
        } else if (removeChargerSuccess || chargerUpdateSuccess) {
            setSuccessMessage(removeChargerSuccess || chargerUpdateSuccess)
            setData({})
        }
    }, [success, removeChargerSuccess, chargerUpdateSuccess])

    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                {success && <SuccessMessage>Solar Charger Add Successfully</SuccessMessage>}
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                {!(success || successMessage) &&
                    <div className='data-container'>
                        <label className="data-input" htmlFor="name"><p>Name<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='name' placeholder='Enter  Name' required onChange={(e) => setData((pv) => pv && { ...pv, name: e.target.value })}
                                value={data.name || ""}
                            />
                        </label>
                        <label className="data-input" htmlFor="manufacturer"><p>manufacturer<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='manufacturer' placeholder='Enter  manufacturer' required
                                value={data.manufacturer || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, manufacturer: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="model"><p>model<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text"  id='model' placeholder='Enter model ' required
                                value={data.model || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, model: e.target.value })}
                            />
                        </label>
                        <div className="flex-container center" >
                            <label className="data-input flex-item" htmlFor="System Voltage"><p>System Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="text" id='voltage' placeholder='Ex:- 12 / 24 / ..' required
                                        value={voltage || ""}
                                        onChange={(e) => setVoltage(e.target.value)}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Max String Voltage"><p>Max String Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number"  id='Max String Voltage' placeholder='Enter Max String Voltage ' required
                                        value={data.maxStringVoltage || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, maxStringVoltage: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex-container center relative transition" >
                            <label className="data-input flex-item" htmlFor="Rated Current"><p>Rated Current<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter  Rated Current' required
                                        value={data.rateCurrent || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, rateCurrent: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>A</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Max Power"><p>Max Power<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number"  placeholder='Enter Max Power ' required
                                        value={data.maxPower || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, maxPower: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>W</span>
                                </div>
                            </label>
                        </div>
                        <label className="data-input" htmlFor="type"><p>Type<sup><i className='fa fa-asterisk'></i></sup></p>
                            <select name="type" id="type" style={{ color: data.type ? "black" : "#838383" }}
                                value={data.type || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, type: e.target.value })}
                            ><option value='' disabled  >Select Solar Charger type</option>
                                <option value="MPPT" >MPPT</option>
                                <option value="pmw" >PWM</option>
                            </select>
                        </label>
                        <label className="data-input" htmlFor="Features"><p>Features<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='Features' placeholder='Enter Features ' required
                                value={data.features || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, features: e.target.value })}
                            />
                        </label>
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
                                    <input type="number" min="70" max="100" placeholder='Enter efficiency ' required
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
                    <button type='button' onClick={() => setAddSolarCharger({})} className="btn secondary"  >Add New</button>
                    :
                    !successMessage && <button type='submit' className="btn primary" disabled={loading || !data || chargerUpdateLoading} >{loading || chargerUpdateLoading ? <i className="fa fa-spinner fa-pulse"></i> : data._id ? "update" : "Add"}</button>
                }
                {data._id && !removeChargerSuccess && <button type='button' onClick={() => { if (window.confirm('Are you sure you want to delete "' + data.name + '" ?')) { removeSolarCharger(data._id, setDeletedCharger) } }} className="btn secondary" >{removeChargerLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Remove"}</button>}

            </div>
        </form>


    )
}

