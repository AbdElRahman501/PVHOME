const PI = Math.PI;
const RAD = PI / 180;
const DEG = 180 / PI;

export function NumFormatter(num, digits) {
    const lookup = [
        { value: 1, symbol: " " },
        { value: 1e3, symbol: " k" },
        { value: 1e6, symbol: " M" },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function (item) {
        return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
}

export function getOptimumTiltAngle(latitude) {
    var optimumTiltAngle;

    if (latitude >= 0) {
        optimumTiltAngle = (1.3793 + latitude * (1.2011 + latitude * (-0.014404 + latitude * 0.000080509)))
    } else {
        optimumTiltAngle = (-0.41657 + latitude * (1.4216 + latitude * (0.024051 + latitude * 0.00021828)))
    }
    return optimumTiltAngle;
}

export function getElevationAngle(latitude) {
    // Get the day of the year from the date object
  
    let declinationAngle = Math.floor(23.45 * Math.sin(RAD * ((360 / 365) * (355 + 284))))
    declinationAngle = declinationAngle < 0 ? -declinationAngle : declinationAngle
    // console.log(declinationAngle)
    return 90 - (declinationAngle + latitude);
  }