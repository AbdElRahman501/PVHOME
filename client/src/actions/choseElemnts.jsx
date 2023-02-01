const inverters = [
    { id: "1", name: "100w lg inverter", voltage: 12, power: 100, price: 5 }
    , { id: "7", name: "400w lg inverter", voltage: 24, power: 400, price: 10 }
    , { id: "2", name: "150w lg inverter", voltage: 12, power: 150, price: 5.5 }
    , { id: "3", name: "200w lg inverter", voltage: 12, power: 200, price: 7 }
    , { id: "4", name: "250w lg inverter", voltage: 12, power: 250, price: 7.5 }
    , { id: "5", name: "300w lg inverter", voltage: 12, power: 300, price: 9 }
    , { id: "6", name: "350w lg inverter", voltage: 12, power: 350, price: 9.5 }
]

const batteries = [
    { id: '1', name: '120Ah samsung battery', voltage: 12, amperHour: 120, dod: .75, price: 5 },
    { id: '2', name: '180Ah samsung battery', voltage: 12, amperHour: 180, dod: .8, price: 5.5 },
    { id: '4', name: '220Ah samsung battery', voltage: 12, amperHour: 220, dod: .7, price: 7 },
    { id: '3', name: '200Ah samsung battery', voltage: 12, amperHour: 200, dod: .78, price: 6 },
    { id: '6', name: '280Ah samsung battery', voltage: 24, amperHour: 280, dod: .75, price: 9 },
    { id: '5', name: '240Ah samsung battery', voltage: 24, amperHour: 240, dod: .7, price: 7.5 },
    { id: '7', name: '300Ah samsung battery', voltage: 24, amperHour: 300, dod: .85, price: 9.5 },]

export function choseInverter(inp) {
    let power = 1.1 * inp
    inverters.sort(function (a, b) {
        return a.power - b.power;
    });
    let inverter = inverters.find(x => x.power >= power)
    if (inverter) {
        return ({ num: 1, ...inverter })
    } else {
        let fixedInverter = []
        let score = []
        for (let inverter of inverters) {
            let ratio = (power / inverter.power);
            let num = Math.floor(ratio) < ratio ? Math.floor(ratio) + 1 : Math.floor(ratio)
            let powerRate = power / (num * inverter.power);
            fixedInverter.push({ ...inverter, num, powerRate, totalPrice: num * inverter.price })
            // console.log(inverter.id,ratio,powerRate.toFixed(2),ratio*inverter.price)  
        }
        for (let inverter of fixedInverter) {
            let sum = fixedInverter.reduce((b, a) => a.num + b, 0)
            let numScore = 100 - ((inverter.num / sum) * 100)
            let powerScore = (inverter.powerRate * 100)
            let priceRate = Math.max(...fixedInverter.map(x => x.totalPrice))
            // let priceRate =  fixedInverter.reduce((b, a) => a.totalPrice+b, 0)
            let priceScore = 100 - ((inverter.totalPrice / priceRate) * 100)
            let totalScore = (priceScore + numScore + powerScore) / 3
            score.push({ ...inverter, numScore, powerScore, totalScore, priceScore })
            // console.log(numScore.toFixed(2),powerScore.toFixed(2),priceScore.toFixed(2),totalScore.toFixed(2))
        }
        console.log(score.map(x => ({ total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), powerX: x.powerScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));
        return (score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))))
    }

}




export function choseBattery(energy, inverter) {
    let chosenBat = []
    let score = []

    batteries.sort(function (a, b) {
        return a.amperHour - b.amperHour;
    });
    for (let battery of batteries) {
        let batteryOfOne = energy / (battery.dod * inverter.voltage)
        // console.log(batteryOfOne);
        let branch = batteryOfOne / battery.amperHour;
        branch = Math.floor(branch) < branch ? Math.floor(branch) + 1 : Math.floor(branch)
        let batteryPerBranch = inverter.voltage / battery.voltage
        batteryPerBranch = Math.floor(batteryPerBranch) < batteryPerBranch ? Math.floor(batteryPerBranch) + 1 : Math.floor(batteryPerBranch)
        if (batteryPerBranch >= 1) {
            // console.log(batteryOfOne,branch,batteryPerBranch) 
            if (batteryOfOne < battery.amperHour) {
                return { branch, batteryPerBranch, num: branch * batteryPerBranch, ...battery }
            } else {
                let num = branch * batteryPerBranch
                let totalPrice = (num * battery.price);
                chosenBat.push({ ...battery, branch, batteryPerBranch, num, totalPrice })

            }
        }

    }
    for (let i = 0; i < chosenBat.length; i++) {
        const battery = chosenBat[i];
        let sum = chosenBat.reduce((b, a) => a.num + b, 0)
        let numScore = 100 - ((battery.num / sum) * 100)
        let priceRate = Math.max(...chosenBat.map(x => x.totalPrice))
        // let priceRate =  chosenBat.reduce((b, a) => a.totalPrice+b, 0)
        let priceScore = 100 - ((battery.totalPrice / priceRate) * 100)
        let totalScore = (priceScore + numScore) / 2
        score.push({ ...battery, numScore, totalScore,priceScore })
        // console.log(battery.num,battery.amperHour,"numScore "+numScore.toFixed(2),"priceRate "+priceScore.toFixed(2),"totalScore "+totalScore.toFixed(2));
    }
    console.log(score.map(x => ({ total: x.totalScore?.toFixed(2), priceS: x.priceScore?.toFixed(2), numX: x.numScore?.toFixed(2) })));

    // console.log(score);
    return (score.find(x => x.totalScore === Math.max(...score.map(x => x.totalScore))));

}