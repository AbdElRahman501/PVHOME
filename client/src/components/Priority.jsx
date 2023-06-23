import React from 'react'

function Priority(props) {
    const { data, setData, priority } = props

    return data && (
        <div className="flex-container center relative transition" style={{ bottom: !data?.government ? "10%" : "0" }}>

            {priority.price && <label className="data-input flex-item" htmlFor="type"><p>price</p>
                <select name="type" id="type" required
                    style={{ color: data.priority?.price === 4 ? "red" : data.priority?.price === 2 ? "green" : data.priority?.price === 1 ? "blue" : "#838383" }}
                    value={data.priority?.price || ""}
                    onChange={(e) => setData((pv) => pv && { ...pv, priority: { ...pv.priority, price: Number(e.target.value) } })}
                ><option value='' disabled  >select how much priority</option>
                    <option value="4" style={{ color: "red" }} >Top</option>
                    <option value="2" style={{ color: "green" }} >Normal</option>
                    <option value="1" style={{ color: "blue" }}>low</option>
                </select>
            </label>}
            {priority.num &&<label className="data-input flex-item" htmlFor="type"><p>number</p>
                <select name="type" id="type" required
                    style={{ color: data.priority?.num === 4 ? "red" : data.priority?.num === 2 ? "green" : data.priority?.num === 1 ? "blue" : "#838383" }}
                    value={data.priority?.num || ""}
                    onChange={(e) => setData((pv) => pv && { ...pv, priority: { ...pv.priority, num: Number(e.target.value) } })}
                ><option value='' disabled  >select how much priority</option>
                    <option value="4" style={{ color: "red" }} >Top</option>
                    <option value="2" style={{ color: "green" }} >Normal</option>
                    <option value="1" style={{ color: "blue" }}>low</option>
                </select>
            </label>}
            {priority.area && <label className="data-input flex-item" htmlFor="type"><p>Area</p>
                <select name="type" id="type" required
                    style={{ color: data.priority?.area === 4 ? "red" : data.priority?.area === 2 ? "green" : data.priority?.area === 1 ? "blue" : "#838383" }}
                    value={data.priority?.area || ""}
                    onChange={(e) => setData((pv) => pv && { ...pv, priority: { ...pv.priority, area: Number(e.target.value) } })}
                ><option value='' disabled  >select how much priority</option>
                    <option value="4" style={{ color: "red" }} >Top</option>
                    <option value="2" style={{ color: "green" }} >Normal</option>
                    <option value="1" style={{ color: "blue" }}>low</option>
                </select>
            </label>}
        </div>
    )
}

export default Priority
