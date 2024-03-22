/* webHardSim is a Behavioral simualtor for logic gate */
function assert(expression, errMessage) {
    if (!expression) {
        console.error(errMessage)
        return 1;
    };
    return 0;
}

function AND(a, b) {
    return a === 1 && b === 1 ? 1 : 0;
}

function OR(a, b) {
    return a === 1 || b === 1 ? 1 : 0;
}

function NOT(a) {
    return a === 1 ? 0 : 1;
}

function NAND(a, b) {
    return NOT(AND(a, b));
}

function XOR(a, b) {
    return OR(AND(a, NOT(b)), AND(NOT(a), b));
}

function Multi(chip) {
    let evaluate;

    if (chip.name === "NOT") {
        evaluate = (arr) => {
            return arr.map((value) => chip(value));
        };
    } else {
        evaluate = (arr1, arr2) => {
            assert(
                arr1.length === arr2.length,
                `Multi Bit inputs should have the same length, ${arr1.length} != ${arr2.length}`
            );
            return arr1.map((value, index) => chip(value, arr2[index]));
        };
    }

    Object.defineProperty(evaluate, "name", {
        writable: true,
        value: chip.name,
    });

    return evaluate;
}

module.exports = { assert, AND, NOT, NAND, OR, XOR, Multi };
