export function getArrangements(panel, solarCharger) {
    let numOfPanels = panel.numOfPanels;
    const maxStringVoltage = Math.min(solarCharger.maxStringVoltage, panel.maxStringVoltage);
    const panelsPerString = Math.floor(maxStringVoltage / panel.voc) || 1;
    const maxPanelsPerArr = Math.floor(solarCharger.maxPower / panel.power) || 1;
    let numOfArr = solarCharger.num;

    const numOfBasePanels = numOfPanels;

    // If the number of panels is less than or equal to panelsPerString, return a simple arrangement
    if (numOfPanels <= panelsPerString) {
        return { message: `( 1 X ${numOfPanels} )` };
    }

    let count = 4;
    let result;
    let combinations;

    let minDivisor = Math.floor(panelsPerString / 2) || 1;
    let minStartArr = Math.floor(maxPanelsPerArr / 2) || 1;

    while (count >= 0) {
        result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
        combinations = findCombination(numOfPanels, result, numOfArr);

        // Adjustments if no valid combinations are found
        if (combinations.length === 0) {
            if (numOfPanels < numOfBasePanels + 2) {
                numOfPanels++;
            } else {
                minDivisor = Math.ceil(panelsPerString / 3);
                minStartArr = Math.ceil(maxPanelsPerArr / 3);
                result = findNumbers(minDivisor, panelsPerString, minStartArr, maxPanelsPerArr);
            }
            combinations = findCombination(numOfPanels, result, numOfArr);
        } else if (numOfPanels / Math.max(...result) > numOfArr) {
            numOfArr = Math.ceil(numOfPanels / Math.max(...result));
            combinations = findCombination(numOfPanels, result, numOfArr);
        }

        // If a valid arrangement is found, break the loop
        if (getBestArray(combinations)) {
            break;
        }

        count--;
    }

    let arrangement = getBestArray(combinations);
    let defaultArrangement = getMaxPanelConfiguration(panel, solarCharger)


    return { message: arrToExpression(arrangement, minDivisor, panelsPerString, defaultArrangement) };
}


function getMaxPanelConfiguration(panel, charger) {
    // Calculate the maximum number of panels in series
    const maxPanelsInSeries = Math.floor(charger.maxStringVoltage / panel.vmpp);

    // Calculate the maximum number of panels in parallel
    const maxPanelsInParallel = Math.floor(charger.maxArrCurrent / panel.impp);

    // Calculate the total number of panels in an array
    const totalPanelsInArray = maxPanelsInSeries * maxPanelsInParallel;

    // Calculate the number of arrays needed
    const numberOfArrays = Math.ceil(panel.numOfPanels / totalPanelsInArray);

    // Return the results as a text string
    return `Panels in Array: ${totalPanelsInArray}\nMax Panels in Series: ${maxPanelsInSeries}\nMax Panels in Parallel: ${maxPanelsInParallel}, Number of Arrays: ${numberOfArrays}`;
}



function arrToExpression(array, minDivisor, maxDivisor, defaultArrangement) {
    // Check if the input array is undefined or empty
    if (!array || array.length === 0) {
        return defaultArrangement || "No arrangement available";
    }

    let arr = [];
    let expression = "";

    // Iterate over each number in the array
    array.forEach((number) => {
        for (let i = maxDivisor; i >= minDivisor; i--) {
            if (number % i === 0) {
                arr.push((number / i) + " X " + i);
                break;
            }
        }
    });

    // Generate the expression from the arr array
    while (arr.length > 0) {
        let firstItem = arr[0];
        let count = arr.filter(item => item === firstItem).length;

        // Remove the counted items from the array
        arr = arr.filter(item => item !== firstItem);

        // Build the expression string
        if (arr.length > 0) {
            expression += `${count} x (${firstItem}) + `;
        } else {
            expression += `${count} x (${firstItem}) = ${sumArrayNumbers(array)}`;
        }
    }

    return expression;
}


// function isDivisible(number, minDivisor, maxDivisor) {
//     for (let i = minDivisor; i <= maxDivisor; i++) {
//         if (number % i === 0) {
//             return true;
//         }
//     }
//     return false;
// }
// function findNumbers(minDivisor, maxDivisor, start, end) {
//     const numbers = [];
//     for (let i = start; i <= end; i++) {
//         if (isDivisible(i, minDivisor, maxDivisor)) {
//             numbers.push(i);
//         }
//     }
//     return numbers;
// }
// function findCombination(target, numbers, numOfArr, timeout = 5000) {
//     const combinations = [];
//     numbers.sort((a, b) => b - a)

//     let max = target > 500 ? 1 : Math.ceil(100 / (target / Math.max(...numbers)))

//     function backtrack(remaining, currentCombination, start) {
//         if (Date.now() - startTime > timeout) {
//             if (combinations.length > 0) {
//                 return combinations;
//             }
//             throw new Error('Timeout: The function took too long to execute.');
//         }

//         if (remaining === 0 && currentCombination.length === numOfArr) {
//             combinations.push([...currentCombination]);
//         } else if (remaining < 0) {
//             return;
//         } else if (combinations.length >= max) {
//             return;
//         } else {
//             for (let i = start; i < numbers.length; i++) {
//                 currentCombination.push(numbers[i]);
//                 backtrack(remaining - numbers[i], currentCombination, i);
//                 currentCombination.pop();
//             }
//         }
//     }
//     const startTime = Date.now();
//     backtrack(target, [], 0);

//     return combinations;
// }

function isDivisible(num, minDivisor, maxDivisor) {
    return num % minDivisor === 0 && num % maxDivisor === 0;
}


function findNumbers(minDivisor, maxDivisor, start, end) {
    const numbers = [];

    // Early exit if start is greater than end
    if (start > end) return numbers;

    for (let i = start; i <= end; i++) {
        if (isDivisible(i, minDivisor, maxDivisor)) {
            numbers.push(i);
        }
    }

    return numbers;
}
function findCombination(target, numbers, numOfArr, timeout = 5000) {
    const combinations = [];
    numbers.sort((a, b) => b - a); // Sort numbers in descending order for better performance

    let max = target > 500 ? 1 : Math.ceil(100 / (target / Math.max(...numbers)));
    const startTime = Date.now();

    function backtrack(remaining, currentCombination, start, depth = 0) {
        // Check if timeout has been reached
        if (Date.now() - startTime > timeout) {
            if (combinations.length > 0) {
                return combinations;
            }
            throw new Error('Timeout: The function took too long to execute.');
        }

        // Base cases
        if (remaining === 0 && currentCombination.length === numOfArr) {
            combinations.push([...currentCombination]);
            return;
        }

        if (remaining < 0 || combinations.length >= max || depth > 20) { // Limit depth to 20
            return;
        }

        // Recursive case
        for (let i = start; i < numbers.length; i++) {
            currentCombination.push(numbers[i]);
            backtrack(remaining - numbers[i], currentCombination, i, depth + 1);
            currentCombination.pop();
        }
    }

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