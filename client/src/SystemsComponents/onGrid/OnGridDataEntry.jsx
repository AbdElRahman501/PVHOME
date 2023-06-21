import React, { useEffect, useState } from 'react'
import governments from "../../components/governments.json"
import cities from "../../components/cities.json"
import { getLocation } from '../../actions/choseElements';
import Priority from '../../components/Priority';


function OnGridDataEntry(props) {
    const { data, setData, localData, submitHandler } = props
    const [{ coordinates, loading, error }, setCoordinates] = useState({});
    const [{ dailyIrradiation, loading: irradiationLoading, error: irradiationError }, setIrradiation] = useState({});


    useEffect(() => {
        if (data.government && data.city && (localData?.city !== data?.city)) {
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
                <div className='data-container' style={{ height: "320px" }} >
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
                        {(!data.totalPower || data.expectedArea) && <label className="data-input flex-item" style={{ width: !data.expectedArea ? "50%" : "100%" }} htmlFor="expectedArea">expectedArea
                            <div>
                                <input type="number" name="expectedArea" id="expectedArea" placeholder='E.X 50' required={!data.totalPower} min="20"
                                    value={data.expectedArea || ""}
                                    onChange={(e) => setData({ ...data, totalPower: "", expectedArea: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>m<sup>2</sup></span>
                            </div>
                        </label>}
                        {!data.expectedArea && !data.totalPower && <p>OR</p>}
                        {!data.expectedArea && <label className={data.totalPower ? "data-input flex-item slide-left" : "data-input flex-item "} style={{ width: !data.totalPower ? "50%" : "100%" }} htmlFor="total-power">Total Power
                            <div>
                                <input type="number" name="total-power" id="total-power" placeholder='E.X 100' required={!data.expectedArea} min="100"
                                    value={data.totalPower || ""}
                                    onChange={(e) => setData({ ...data, expectedArea: "", totalPower: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>W</span>
                            </div>
                        </label>}
                    </div>
                    <Priority data={data} setData={setData} priority={{ price: 1, num: 1, area: 1 }} />
                </div>
            </div>
            <div className="center">
                <button className="btn primary" disabled={data?.coordinates && data?.dailyIrradiation ? false : true}>{loading || irradiationLoading || data.loading ? <i className="fa fa-spinner fa-pulse"></i> : "Submit"}</button>
            </div>
        </form>
    )
}

export default OnGridDataEntry
