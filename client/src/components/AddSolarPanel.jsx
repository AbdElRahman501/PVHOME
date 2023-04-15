import React, { useEffect, useState } from 'react'
import { addPanel } from '../actions/AddDevicesAction';
import { removePanel, updatePanel } from '../actions/DevicesList';
import SuccessMessage from './SuccessMessage';

export default function AddSolarPanel(props) {
    const { successMessage,selectedSolarPanel,setSuccessMessage } = props
    const [data, setData] = useState({ ...selectedSolarPanel })

    const [{ panel, success, loading, error }, setAddPanel] = useState({});
    const [{ success: panelUpdateSuccess, loading: panelUpdateLoading, error: panelUpdateError }, setUpdatedPanel] = useState({});
    const [{ success: removePanelSuccess, loading: removePanelLoading, error: removePanelError }, setDeletedPanel] = useState({});



    function submitHandler(e) {
        e.preventDefault();
        if (data._id) {
            updatePanel(data._id, data, setUpdatedPanel)
        } else {
            addPanel(data, setAddPanel)
        }
    }
    useEffect(() => {
        if (success ) {
            setData({})
        }else if(removePanelSuccess || panelUpdateSuccess){
            setSuccessMessage(removePanelSuccess || panelUpdateSuccess)
            setData({})
        }
    }, [success,removePanelSuccess, panelUpdateSuccess])

    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                {success && <SuccessMessage>{success}</SuccessMessage>}
                {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}
                {!(success || successMessage ) &&
                    <div className='data-container'>
                        <label className="data-input" htmlFor="name"><p>Name<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='name' placeholder='Enter  Name' required
                                value={data.name || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, name: e.target.value })} />
                        </label>
                        <label className="data-input" htmlFor="manufacturer"><p>manufacturer<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='manufacturer' placeholder='Enter  manufacturer' required
                                value={data.manufacturer || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, manufacturer: e.target.value })}
                            />
                        </label>
                        <label className="data-input" htmlFor="model"><p>model<sup><i className='fa fa-asterisk'></i></sup></p>
                            <input type="text" id='model' placeholder='Enter model ' required
                                value={data.model || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, model: e.target.value })}
                            />
                        </label>

                        <label className="data-input" htmlFor="type"><p>Type</p>
                            <select name="type" id="type" style={{ color: data.type ? "black" : "#838383" }}
                                value={data.type || ""}
                                onChange={(e) => setData((pv) => pv && { ...pv, type: e.target.value })}
                            ><option value='' disabled  >Select inverter type</option>
                                <option value="monocrystalline" >monocrystalline</option>
                                <option value="polycrystalline" >polycrystalline</option>
                                <option value="thin-film" >thin-film</option>
                            </select>
                        </label>
                        <label className="data-input" htmlFor="power"><p>power<sup><i className='fa fa-asterisk'></i></sup></p>
                            <div>
                                <input type="number" min="20" max="600" id='power' placeholder='Enter power ' required
                                    value={data.power || ""}
                                    onChange={(e) => setData((pv) => pv && { ...pv, power: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>W</span>
                            </div>
                        </label>

                        <div className="flex-container center relative transition" >
                            <label className="data-input flex-item" htmlFor="width"><p>width<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter  width' required
                                        value={data.dimensions?.width || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, dimensions: Number(e.target.value) >= 0 ? { ...pv.dimensions, width: Number(e.target.value) } : { ...pv.dimensions, width: "" } })}
                                    />
                                    <span>mm</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Efficiency"><p>height<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter efficiency ' required min={data.dimensions?.width?.toFixed(0) || "0"}
                                        value={data.dimensions?.height || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, dimensions: Number(e.target.value) >= 0 ? { ...pv.dimensions, height: Number(e.target.value) } : { ...pv.dimensions, height: "" } })}
                                    />
                                    <span>mm</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Efficiency"><p>depth<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter efficiency ' required
                                        value={data.dimensions?.depth || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, dimensions: Number(e.target.value) >= 0 ? { ...pv.dimensions, depth: Number(e.target.value) } : { ...pv.dimensions, depth: "" } })}
                                    />
                                    <span>mm</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex-container center" >
                            <label title="voltage of max power point" className="data-input flex-item" htmlFor="Vmpp"><p>Vmpp<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="10" max={data.voc?.toFixed(0) || "1000"} id='Vmpp' placeholder='Enter Vmpp' required step="any"
                                        value={data.vmpp || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, vmpp: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label title="Current of max power point" className="data-input flex-item" htmlFor="power"><p>Impp<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min="0" max={data.isc?.toFixed(0) || "100"} id='Impp' placeholder='Enter Impp ' required step="any"
                                        value={data.impp || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, impp: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>A</span>
                                </div>
                            </label>
                        </div>
                        <div className="flex-container center" >
                            <label title="open circuit voltage" className="data-input flex-item" htmlFor="power"><p>Voc<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min={data.vmpp?.toFixed(0) || "0"} max="1000" id='Voc' placeholder='Enter Voc ' required step="any"
                                        value={data.voc || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, voc: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>V</span>
                                </div>
                            </label>
                            <label title="short circuit current" className="data-input flex-item" htmlFor="power"><p>Isc<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" min={data.impp?.toFixed(0) || "0"} max="100" id='Isc' placeholder='Enter Isc ' required step="any"
                                        value={data.isc || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, isc: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>A</span>
                                </div>
                            </label>
                        </div>
                        <label className="data-input" htmlFor="maxStringVoltage"><p>Max String Voltage<sup><i className='fa fa-asterisk'></i></sup></p>
                            <div>
                                <input type="number" min="20" max="2000" id='maxStringVoltage' placeholder='Enter maxStringVoltage ' required
                                    value={data.maxStringVoltage || ""}
                                    onChange={(e) => setData((pv) => pv && { ...pv, maxStringVoltage: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>V</span>
                            </div>
                        </label>
                        <div className="flex-container center relative transition" >
                            <label className="data-input flex-item" htmlFor="Price"><p>Price<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter  Price' required step="any"
                                        value={data.price || ""}
                                        onChange={(e) => setData((pv) => pv && { ...pv, price: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                    />
                                    <span>EGP</span>
                                </div>
                            </label>
                            <label className="data-input flex-item" htmlFor="Efficiency"><p>Efficiency<sup><i className='fa fa-asterisk'></i></sup></p>
                                <div>
                                    <input type="number" placeholder='Enter efficiency ' required step="any"
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
                    <button type='button' onClick={() => setAddPanel({})} className="btn secondary"  >Add New</button>
                    :
                    !successMessage && <button type='submit' className="btn primary" disabled={loading || !data || panelUpdateLoading} >{loading || panelUpdateLoading ? <i className="fa fa-spinner fa-pulse"></i> : data._id ? "update" : "Add"}</button>
                }
                {data._id &&!successMessage && <button type='button' onClick={() => { if (window.confirm('Are you sure you want to delete "' + data.name + '" ?')) { removePanel(data._id, setDeletedPanel) } }} className="btn secondary" >{removePanelLoading ? <i className="fa fa-spinner fa-pulse"></i> : "Remove"}</button>}
            </div>
        </form>

    )
}

