
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
        { id: '1', name: '120Ah samsung battery', voltage: 12, ampereHour: 120, dod: .75, price: 5 },
        { id: '2', name: '180Ah samsung battery', voltage: 12, ampereHour: 180, dod: .8, price: 5.5 },
        { id: '4', name: '220Ah samsung battery', voltage: 12, ampereHour: 220, dod: .7, price: 7 },
        { id: '3', name: '200Ah samsung battery', voltage: 24, ampereHour: 200, dod: .78, price: 6 },
        { id: '6', name: '280Ah samsung battery', voltage: 12, ampereHour: 280, dod: .75, price: 9 },
        { id: '5', name: '240Ah samsung battery', voltage: 12, ampereHour: 240, dod: .7, price: 7.5 },
        { id: '7', name: '300Ah samsung battery', voltage: 12, ampereHour: 300, dod: .85, price: 9.5 },
    ],
    panels: [{
        id: '1',
        name: 'OSP60-275W',
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
    },]

}
export default data;