import React from 'react'
import governments from "../../components/governments.json"
import cities from "../../components/cities.json"


function LocationData(props) {
    const { data, setData } = props

    return (
        <div className="data-entry-box center">
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

            </div>
        </div>
    )
}

export default LocationData
