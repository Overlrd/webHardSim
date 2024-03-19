import { AND, NOT, OR, Multi, assert, NAND, XOR } from "./index.js";

function compareArray(arr1, arr2) {
    if (arr1.every((value, index) => value === arr2[index])) {
        return true;
    }
    return false;
}

function testChip(Chip, IN, ExpectedOUT) {
    let OUT = Chip(...IN);
    if (Array.isArray(OUT)) {
        assert(compareArray(ExpectedOUT, OUT), `Non correct output for chip ${Chip.name}, Expected[${ExpectedOUT}], got [${OUT}]`)
    } else {
        assert(ExpectedOUT === OUT, "Big error ");
    }
}

// AND 
testChip(AND, [1, 1], 1)
testChip(AND, [1, 0], 0)
testChip(AND, [0, 1], 0)
let arr1 = [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1];
let arr2 = [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1];
let AND_OUT = [0, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0, 1];
testChip(Multi(AND), [arr1, arr2], AND_OUT);

// OR
testChip(OR, [1, 1], 1)
testChip(OR, [1, 0], 1)
testChip(OR, [0, 0], 0)
let arr3 = [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1];
let arr4 = [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1];
let OUR_OUT = [1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 1, 1];
testChip(Multi(OR), [arr1, arr2], OUR_OUT);


// NOT
testChip(NOT, [1,], 0)
testChip(NOT, [0,], 1)
testChip(Multi(NOT), [[0, 0, 1, 1, 0, 1],], [1, 1, 0, 0, 1, 0])

// NAND
testChip(NAND, [0, 0], 1)
testChip(NAND, [1, 0], 1)
testChip(NAND, [0, 1], 1)
testChip(NAND, [1, 1], 0)

let arr5 =     [0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1];
let arr6 =     [1, 0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 1, 1];
let NAND_OUT = [1, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0];
testChip(Multi(NAND), [arr5, arr6], NAND_OUT);


// XOR
testChip(XOR, [0, 0], 0);
testChip(XOR, [1, 0], 1); 
testChip(XOR, [0, 1], 1); 
testChip(XOR, [1, 1], 0);