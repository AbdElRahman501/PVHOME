import React, { useEffect, useState } from 'react'
import governments from "../../components/governments.json"
import cities from "../../components/cities.json"
import { getLocation } from '../../actions/choseElements';


function OnGridDataEntry(props) {
    const { data, setData, submitHandler } = props
    const [{ coordinates, loading, error }, setCoordinates] = useState({});
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

    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                <div className='data-container' style={{ height: "300px" }}>
                    <label className="data-input" style={{ top: !data.government ? "10%" : "0" }} htmlFor="government">Government
                        {/* <input type="text" name="" id="" onChange={(e) => setData((pv) => pv && { ...pv, government: e.target.value })} /> */}

                        <select name="government" id="government" required style={{ color: data.government ? "black" : "#838383" }}
                            value={data.government || ""}
                            onChange={(e) => setData((pv) => pv && { ...pv, government: e.target.value, governorate_id: e.target[e.target.selectedIndex].id, city: "" })}
                        ><option value='' disabled  >Select your government</option>
                            {governments.map((x, i) => <option key={i} value={x.governorate_name_en} id={x.id}>{x.governorate_name_en}</option>)}
                        </select>

                    </label>

                    <label className="data-input" htmlFor="city" style={{ visibility: data.government ? "unset" : "hidden" }}>city
                        <select name="city" id="city" required style={{ color: data.city ? "black" : "#838383" }}
                            value={data.city || ""}
                            onChange={(e) => setData((pv) => pv && { ...pv, city: e.target.value })}
                        ><option value='' disabled  >Select your city</option>
                            {cities.filter((x) => x.governorate_id === data.governorate_id).map((x, i) => <option key={i} value={x.city_name_en}>{x.city_name_en}</option>)}
                        </select>
                    </label>
                    <div className="flex-container center relative transition" style={{ bottom: !data.government ? "10%" : "0" }}>
                        {!data.totalPower && <label className="data-input flex-item" style={{ width: !data.area ? "50%" : "100%" }} htmlFor="area">Area
                            <div>
                                <input type="number" name="area" id="area" placeholder='E.X 50' required={!data.totalPower} min="20"
                                    value={data.area || ""}
                                    onChange={(e) => setData({ ...data, totalPower: "", area: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>m<sup>2</sup></span>
                            </div>
                        </label>}
                        {!data.area && !data.totalPower && <p>OR</p>}
                        {!data.area && <label className={data.totalPower ? "data-input flex-item slide-left" : "data-input flex-item "} style={{ width: !data.totalPower ? "50%" : "100%" }} htmlFor="total-power">Total Power
                            <div>
                                <input type="number" name="total-power" id="total-power" placeholder='E.X 100' required={!data.area} min="100"
                                    value={data.totalPower || ""}
                                    onChange={(e) => setData({ ...data, area: "", totalPower: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>W</span>
                            </div>
                        </label>}
                    </div>
                </div>
            </div>
            <div className="center">
                <button className="btn primary" disabled={coordinates && dailyIrradiation ? false : true}>{loading || irradiationLoading || data.loading ? <i className="fa fa-spinner fa-pulse"></i> : "Submit"}</button>
            </div>
        </form>
    )
}

export default OnGridDataEntry
