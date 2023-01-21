import React from 'react'
import governments from "../components/governorates.json"

function OnGridDataEntry(props) {
    const { data, setData, submitHandler } = props


    return (
        <form onSubmit={submitHandler}>
            <div className="data-entry-box center ">
                <div>
                    <label className="data-input" htmlFor="government">Government
                        <select name="government" id="government" required
                            value={data.government||""}
                            onChange={(e) => setData((pv) => pv && { ...pv, government: e.target.value })}
                        ><option value='' disabled  >Select your government</option>
                            {governments.map((x, i) => <option key={i} value={x.governorate_name_en}>{x.governorate_name_en}</option>)}
                        </select>
                    </label>
                    <div className="flex-container">
                        <label className="data-input flex-item" htmlFor="area">Area
                            <div>
                                <input type="number" name="area" id="area" placeholder='E.X 50' required
                                    value={data.area||""}
                                    onChange={(e) => setData({ ...data, area: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>m<sup>2</sup></span>
                            </div>
                        </label>
                        <label className="data-input flex-item" htmlFor="total-power">Total Power
                            <div>
                                <input type="number" name="total-power" id="total-power" placeholder='E.X 100' required
                                    value={data.power||""}
                                    onChange={(e) => setData({ ...data, power: Number(e.target.value) >= 0 ? Number(e.target.value) : "" })}
                                />
                                <span>W</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
            <div className="center">
                <button className="btn primary">Submit</button>
            </div>
        </form>
    )
}

export default OnGridDataEntry
