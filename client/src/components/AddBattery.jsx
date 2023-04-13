import React, { useEffect, useState } from 'react'
import { addBattery } from '../actions/AddDevicesAction';
import { RemoveBattery, UpdateBattery } from '../actions/DevicesList';
import SuccessMessage from './SuccessMessage';

export default function AddBattery(props) {
    const { selectedBattery, successMessage,
        updatedBattery,
        setUpdateBattery } = props
    const [data, setData] = useState({ ...selectedBattery })
    const [{ battery, success, loading, error }, setAddBattery] = useState({});
    const { success: batteryUpdateSuccess, loading: batteryUpdateLoading, error: batteryUpdateError } = updatedBattery
    const [{ success: removeBatterySuccess, loading: removeBatteryLoading, error: removeBatteryError }, setDeleteBattery] = useState({});

    function submitHandler(e) {
        e.preventDefault();
        if (data._id) {
            UpdateBattery(data._id, data, setUpdateBattery)
        } else {
            addBattery(data, setAddBattery)
        }
    }
    useEffect(() => {
        if (success || batteryUpdateSuccess) {
            setData({})
        }
    }, [success, batteryUpdateSuccess])

    // console.log();
    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                {success && <SuccessMessage>Battery Add Successfully</SuccessMessage>}
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                {removeBatterySuccess && <SuccessMessage>{removeBatterySuccess}</SuccessMessage>}
                {!(success || successMessage || removeBatterySuccess) &&
                    <div className='data-container'>
                        <label className="data-input" htmlFor="name"><p>Name<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='name' placeholder='Enter  Name' required onChange={(e) => setData((pv) => pv && { ...pv, name: e.target.value })}
                                value={data.name || ""}
                            />

                        </label>
                        <label className="data-input" htmlFor="manufacturer"><p>Manufacturer<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='manufacturer' placeholder='Enter  manufacturer' required
                                value={data.manufacturer || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, manufacturer: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="model"><p>Model<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='model' placeholder='Enter model' required
                                value={data.model || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, model: e.target.value })}
                            />
                        </label>
                        <div className="flex-container center" >
                            <label className="data-input flex-item" htmlFor="voltage"><p>Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="11" max="96" id='voltage' placeholder='Enter  voltage' required
                                        value={data.voltage || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voltage: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="ampereHour"><p>Capacity<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="80" max="800" id='ampereHour' placeholder='Enter Ah of Battery ' required
                                        value={data.ampereHour || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, ampereHour: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>Ah</span>
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
                            <label title="Depth of Discharge" className="data-input flex-item" htmlFor="Efficiency"><p>DOD</p>
                                <div>
                                    <input type="number" min="70" max="100" placeholder='Enter Dod '
                                        value={data.dod || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, dod: Number(e.target.value) >= 1 ? (Number(e.target.value)) : "" })}
                                    />
                                    <span>%</span>
                                </div>
                            </label>
                        </div>
                    </div>
                }
            </div>
            <div className="center">
                {success &&
                    <button type='button' onClick={() => setAddBattery({})} className="btn secondary"  >Add New</button>
                }{
                    !(successMessage || removeBatterySuccess) && <button type='submit' className="btn primary" disabled={loading || !data || batteryUpdateLoading} >{loading || batteryUpdateLoading ? <i className="fa fa-spinner fa-pulse"></i> : data._id ? "update" : "Add"}</button>
                }
                {!(success || successMessage || removeBatterySuccess) && data._id && <button type='button' onClick={() => { if (window.confirm('Are you sure you want to delete "' + data.name + '" ?')) { RemoveBattery(data._id, setDeleteBattery) } }} className="btn secondary" >{removeBatteryLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Remove"}</button>}

            </div>

        </form>

    )
}


