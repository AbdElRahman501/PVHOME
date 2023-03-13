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
