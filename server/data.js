
const data = {
    inverters: [
        { id: "1", name: "100w lg inverter", voltage: [12], power: 100, price: 5, efficiency: 98 }
        , { id: "7", name: "400w lg inverter", voltage: [12, 24], power: 400, price: 10, efficiency: 96 }
        , { id: "2", name: "150w lg inverter", voltage: [12], power: 150, price: 5.5, efficiency: 95 }
        , { id: "3", name: "200w lg inverter", voltage: [12, 24], power: 200, price: 7, efficiency: 96 }
        , { id: "4", name: "250w lg inverter", voltage: [12, 24], power: 250, price: 7.5, efficiency: 98 }
        , { id: "5", name: "300w lg inverter", voltage: [24], power: 300, price: 9, efficiency: 98 }
        , { id: "6", name: "350w lg inverter", voltage: [12, 24], power: 350, price: 9.5, efficiency: 97.5 }
        , { id: "8", name: "500w lg inverter", voltage: [12, 24, 48], power: 500, price: 12, efficiency: 96.5 }
        , { id: "10", name: "600w lg inverter", voltage: [24, 48], power: 600, price: 14, efficiency: 97 }
        , { id: "9", name: "700w lg inverter", voltage: [12, 24, 48, 96], power: 700, price: 18, efficiency: 97 }
        , { id: "12", name: "800w lg inverter", voltage: [24, 48], power: 800, price: 20, efficiency: 97.5 }
        , { id: "11", name: "1Kw lg inverter", voltage: [48, 96], power: 1000, price: 22, efficiency: 97.5 }
        , { id: "14", name: "2kw lg inverter", voltage: [48, 96], power: 2000, price: 28, efficiency: 97 }
        , { id: "13", name: "3kw lg inverter", voltage: [96], power: 3000, price: 35, efficiency: 96.5 }
    ],
    batteries: [
        { id: '1', name: '120Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 120, dod: 75, price: 5 },
        { id: '2', name: '180Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 180, dod: 80, price: 5.5 },
        { id: '4', name: '220Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 220, dod: 70, price: 7 },
        { id: '3', name: '200Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 24, ampereHour: 200, dod: 78, price: 6 },
        { id: '6', name: '280Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 280, dod: 75, price: 9 },
        { id: '5', name: '240Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 240, dod: 70, price: 7.5 },
        { id: '7', name: '300Ah samsung battery', model: "anything", manufacturer: "anything to", voltage: 12, ampereHour: 300, dod: 85, price: 9.5 },
    ],
    panels: [{
        id: '1',
        name: 'OSP60-275W',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 275,
        vmpp: 31.46,
        impp: 8.85,
        voc: 38.33,
        isc: 9.235,
        dimensions: {
            width: 992,
            height: 1645,
            depth: 35
        },
        efficiency: 16.9,
        type: "Polycrystalline ",
        price: 5
    }, {
        id: '2',
        name: 'OSP60-280W',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 280,
        vmpp: 31.21,
        impp: 8.99,
        voc: 38.7,
        isc: 9.57,
        dimensions: {
            width: 992,
            height: 1645,
            depth: 35
        },
        efficiency: 17.2,
        type: "Polycrystalline",
        price: 5.5
    }, {
        id: '3',
        name: 'OSPp72-345W',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 345,
        vmpp: 37.39,
        impp: 9.23,
        voc: 46.39,
        isc: 9.66,
        dimensions: {
            width: 1960,
            height: 992,
            depth: 40
        },
        efficiency: 17.74,
        type: "Polycrystalline ",
        price: 6
    }, {
        id: '6',
        name: '500w-96M',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 500,
        vmpp: 53.94,
        impp: 9.77,
        voc: 65.92,
        isc: 9.77,
        dimensions: {
            width: 1310,
            height: 1996,
            depth: 40
        },
        efficiency: 19.12,
        type: "Monocrystalline",
        price: 7.5
    }, {
        id: '4',
        name: 'OSMp72-380W',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 379,
        vmpp: 37,
        impp: 7.54,
        voc: 46.6,
        isc: 8.3,
        dimensions: {
            width: 992,
            height: 1960,
            depth: 40
        },
        efficiency: 19.66,
        type: "Monocrystalline ",
        price: 6.5
    }, {
        id: '5',
        name: 'OSMp72-390W',
        manufacturer: 'OSP60-275W',
        model: 'OSP60-275W',
        maxStringVoltage: 1000,
        power: 390,
        vmpp: 41.1,
        impp: 9.49,
        voc: 49.3,
        isc: 10.27,
        dimensions: {
            width: 1006,
            height: 1986,
            depth: 40
        },
        efficiency: 20.07,
        type: "Monocrystalline",
        price: 7
    },],
    solarChargers: [
        {
            "name": "B96-30A",
            "model": "B96-70A",
            "manufacturer": "Galaxy",
            "maxPower": 2000,
            "rateCurrent": 30,
            "systemVoltage": [24, 48],
            "maxStringVoltage": 120,
            "type": "pmw",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 700
        }, {
            "name": "B12-24-20A",
            "model": "B96-70A",
            "manufacturer": "Galaxy",
            "maxPower": 220,
            "rateCurrent": 20,
            "systemVoltage": [12, 24],
            "maxStringVoltage": 40,
            "type": "pmw",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 350
        }, {
            "name": "B96-20A",
            "model": "B96-70A",
            "manufacturer": "Galaxy",
            "maxPower": 1000,
            "rateCurrent": 20,
            "systemVoltage": [12, 24],
            "maxStringVoltage": 100,
            "type": "pmw",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 500
        }, {
            "name": "B96-70A",
            "model": "B96-70A",
            "manufacturer": "Galaxy",
            "maxPower": 7280,
            "rateCurrent": 70,
            "systemVoltage": [96],
            "maxStringVoltage": 430,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 1500
        },
        {
            "name": "B96-80A",
            "model": "B96-80A",
            "manufacturer": "Galaxy",
            "maxPower": 8320,
            "rateCurrent": 80,
            "systemVoltage": [96],
            "maxStringVoltage": 430,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 1700
        },
        {
            "name": "B96-100A",
            "model": "B96-100A",
            "manufacturer": "Galaxy",
            "maxPower": 10400,
            "rateCurrent": 100,
            "systemVoltage": [96],
            "maxStringVoltage": 430,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2000
        },
        {
            "name": "B192-50A",
            "model": "B192-50A",
            "manufacturer": "Galaxy",
            "maxPower": 10400,
            "rateCurrent": 50,
            "systemVoltage": [192],
            "maxStringVoltage": 430,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 1800
        },
        {
            "name": "B192-60A",
            "model": "B192-60A",
            "manufacturer": "Galaxy",
            "maxPower": 11700,
            "rateCurrent": 60,
            "systemVoltage": [192],
            "maxStringVoltage": 430,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2000
        },
        {
            "name": "B192-70A",
            "model": "B192-70A",
            "manufacturer": "Galaxy",
            "maxPower": 13000,
            "rateCurrent": 70,
            "systemVoltage": [192],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2300
        },
        {
            "name": "B192-80A",
            "model": "B192-80A",
            "manufacturer": "Galaxy",
            "maxPower": 12480,
            "rateCurrent": 80,
            "systemVoltage": [192],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],


            "price": 2500
        },
        {
            "name": "B192-100A",
            "model": "B192-100A",
            "manufacturer": "Galaxy",
            "maxPower": 14040,
            "rateCurrent": 100,
            "systemVoltage": [192],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2800
        },
        {
            "name": "B216-50A",
            "model": "B216-50A",
            "manufacturer": "Galaxy",
            "maxPower": 14560,
            "rateCurrent": 50,
            "systemVoltage": [216],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 1900
        },
        {
            "name": "B216-60A",
            "model": "B216-60A",
            "manufacturer": "Galaxy",
            "maxPower": 16380,
            "rateCurrent": 60,
            "systemVoltage": [216],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2200
        },
        {
            "name": "B216-70A",
            "model": "B216-70A",
            "manufacturer": "Galaxy",
            "maxPower": 18200,
            "rateCurrent": 70,
            "systemVoltage": [216],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2500
        },
        {
            "name": "B216-80A",
            "model": "B216-80A",
            "manufacturer": "Galaxy",
            "maxPower": 20800,
            "rateCurrent": 80,
            "systemVoltage": [216],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2800
        },
        {
            "name": "B216-100A",
            "model": "B216-100A",
            "manufacturer": "Galaxy",
            "maxPower": 20800,
            "rateCurrent": 100,
            "systemVoltage": [216],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 3000
        },
        {
            "name": "B240-50A",
            "model": "B240-50A",
            "manufacturer": "Galaxy",
            "maxPower": 23400,
            "rateCurrent": 50,
            "systemVoltage": [240],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2100
        },
        {
            "name": "B240- 60A",
            "model": "B240-60A",
            "manufacturer": "Galaxy",
            "maxPower": 26040,
            "rateCurrent": 60,
            "systemVoltage": [240],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2300
        },
        {
            "name": "B240-70A",
            "model": "B240-70A",
            "manufacturer": "Galaxy",
            "maxPower": 28680,
            "rateCurrent": 70,
            "systemVoltage": [240],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2500
        },
        {
            "name": "B240-80A",
            "model": "B240-80A",
            "manufacturer": "Galaxy",
            "maxPower": 31280,
            "rateCurrent": 80,
            "systemVoltage": [240],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 2700
        },
        {
            "name": "B240-100A",
            "model": "B240-100A",
            "manufacturer": "Galaxy",
            "maxPower": 36400,
            "rateCurrent": 100,
            "systemVoltage": [240],
            "maxStringVoltage": 660,
            "type": "MPPT",
            "features": ["Three stages: constant current (fast charge)", "constant voltage", "floating charge"],
            "price": 3000
        }
    ]
}
export default data;