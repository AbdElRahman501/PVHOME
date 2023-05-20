export function getArrangements(panel, solarCharger) {
    let numOfPanels = panel.numOfPanels
    let maxStringVoltage = Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage)
    let panelsPerString = Math.floor(maxStringVoltage / panel.voc)
    let maxPanelsPerArr = Math.floor(solarCharger.maxPower / panel.power)
    let numOfArr = Math.ceil(numOfPanels / maxPanelsPerArr)


    const numOfBasePanels = numOfPanels

    if (numOfPanels < panelsPerString) {
        return { message: "( 1 X " + numOfPanels + " )" }
    }

    let count = 4
    let result
    let combinations

    let minDivisor = Math.floor(panelsPerString / 2)
    let minStartArr = Math.floor(maxPanelsPerArr / 2)

    while (count >= 0) {
        result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
        combinations = findCombination(numOfPanels, result, numOfArr)

        if (combinations.length === 0) {
            if (numOfPanels < numOfBasePanels + 2) {
                numOfPanels++
            } else {
                minDivisor = Math.ceil(panelsPerString / 3)
                minStartArr = Math.ceil(maxPanelsPerArr / 3)
                result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
            }
            combinations = findCombination(numOfPanels, result, numOfArr)
        } else if (numOfPanels / Math.max(...result) > numOfArr) {
            numOfArr = Math.ceil(numOfPanels / Math.max(...result))
            combinations = findCombination(numOfPanels, result, numOfArr)
        }

        if (getBestArray(combinations)) {
            break
        }
        count--
    }
    let arrangement = getBestArray(combinations)

    return { message: arrToExpression(arrangement, minDivisor, panelsPerString) }

}

function arrToExpression(array, minDivisor, maxDivisor) {
    let arr = []
    let expression = ""
    array.forEach((number) => {
        for (let i = maxDivisor; i >= minDivisor; i--) {
            if (number % i === 0) {
                arr.push((number / i) + " X " + i)
                break
            }
        }
    });
    while (arr?.length > 0) {
        let x = arr.filter(x => x == arr[0])
        arr = arr.filter(x => x != arr[0])
        if (arr.length > 0) {
            expression = expression + (x.length + " x (" + x[0] + ") + ");
        } else {
            expression = expression + (x.length + " x (" + x[0] + ") = " + sumArrayNumbers(array));
        }
    }
    return (expression);
}

function isDivisible(number, minDivisor, maxDivisor) {
    for (let i = minDivisor; i <= maxDivisor; i++) {
        if (number % i === 0) {
            return true;
        }
    }
    return false;
}
function findNumbers(minDivisor, maxDivisor, start, end) {
    const numbers = [];
    for (let i = start; i <= end; i++) {
        if (isDivisible(i, minDivisor, maxDivisor)) {
            numbers.push(i);
        }
    }
    return numbers;
}
function findCombination(target, numbers, numOfArr, timeout = 5000) {
    const combinations = [];
    numbers.sort((a, b) => b - a)

    let max = target > 500 ? 1 : Math.ceil(100 / (target / Math.max(...numbers)))

    function backtrack(remaining, currentCombination, start) {
        if (Date.now() - startTime > timeout) {
            if (combinations.length > 0) {
                return combinations;
            }
            throw new Error('Timeout: The function took too long to execute.');
        }

        if (remaining === 0 && currentCombination.length === numOfArr) {
            combinations.push([...currentCombination]);
        } else if (remaining < 0) {
            return;
        } else if (combinations.length >= max) {
            return;
        } else {
            for (let i = start; i < numbers.length; i++) {
                currentCombination.push(numbers[i]);
                backtrack(remaining - numbers[i], currentCombination, i);
                currentCombination.pop();
            }
        }
    }
    const startTime = Date.now();
    backtrack(target, [], 0);

    return combinations;
}
function sumArrayNumbers(array) {
    var sum = array.reduce(function (accumulator, currentValue) {
        return accumulator + currentValue;
    }, 0);
    return sum;
}

function getBestArray(arrays) {
    let minDifference = Infinity;
    let bestArray;
    for (const array of arrays) {
        const max = Math.max(...array);
        const min = Math.min(...array);
        const difference = max - min;

        if (difference < minDifference) {
            minDifference = difference;
            bestArray = array;
        }
    }
    return bestArray
}