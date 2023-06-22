import React, { useEffect, useState } from 'react'

function AdjustItem(props) {
    const { children, data, setData, toPercentage, rang, onSubmit, fixed } = props

    const [title, item, dis] = children.split(" : ")

    const [toEdit, setToEdit] = useState(false)
    const [value, setValue] = useState(0)
    const [min, max] = rang ? rang : [0, 100]



    function fromValueToPercentage(value) {
        if (value <= 1 && value >= 0) {
            return value * 100
        } else { return value }
    }
    function fromPercentageToValue(Percentage) {
        if (Percentage <= 100 && Percentage >= 0) {
            return Percentage / 100
        } else { return Percentage }
    }
    useEffect(() => {
        if (data?.[item] >= 0) {
            setValue(toPercentage ? fromValueToPercentage(data?.[item]) : data?.[item]);
        } else if (data?.coordinates?.[item] >= 0) {
            setValue(toPercentage ? fromValueToPercentage(data?.coordinates?.[item]) : data?.coordinates?.[item]);
        }
    }, [data, item])

    function submitHandler(e) {
        e.preventDefault();
        setToEdit(false)
        let theValue = value > min ? value : min
        theValue = Number(theValue)
        if (data?.[item] >= 0) {
            setData(pv => ({ ...pv, [item]: Number(toPercentage ? fromPercentageToValue(theValue) : theValue) }))
        } else if (data?.coordinates?.[item] >= 0) {
            setData(pv => ({ ...pv, coordinates: { ...pv.coordinates, [item]: Number(toPercentage ? fromPercentageToValue(theValue) : theValue) } }))
        }
    }
    return (
        <div className='flex-container'><p><strong>{title} : </strong></p>
            {!toEdit && !onSubmit && <i className='fa  fa-pencil' onClick={() => setToEdit(true)}></i>}
            {toEdit ?
                <form onSubmit={submitHandler} >
                    <input type="number" className='edit' step="any" min={min} max={max} placeholder={min}
                        value={value }
                        onChange={e => setValue(e.target.value)} />
                    <button className='none' ><i className='fa fa-check' ></i></button>
                </form>
                :
                (fixed ? value : Number(value)?.toFixed(2)) + (dis ? (" " + dis) : "")}
        </div>
    )
}

export default AdjustItem
