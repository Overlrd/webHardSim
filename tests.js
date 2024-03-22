var fs = require('fs'),
    path = require('path');

const { assert, AND, NOT, NAND, OR, XOR, Multi } = require('./index.js');

function testGateFunction(gateFunction, truthTable) {
    truthTable.table.every(inputs => {
        let gateOutput = gateFunction(...Object.values(inputs))
        let ok = assert(gateOutput == inputs.out, `Chip ${gateFunction.name} (${Object.values(inputs)}) expected ${inputs.out} got ${gateOutput}`);
        if (ok == 0)
            console.log(`Chip ${gateFunction.name} all tests passed`);
    })
}

function loadJSON(filename = 'truthTables.json') {
    try {
        const filePath = path.join(__dirname, filename);
        const data = fs.readFileSync(filePath, { encoding: 'utf-8' });
        const jsonData = JSON.parse(data);
        return jsonData;
    } catch (error) {
        console.error('Error loading JSON file:', error);
        return null;
    }
}
// TEST ONE WAY BINARY CHIPS
const oneWayBinaryChipsTruthTable = loadJSON('truthTables.json');
testGateFunction(AND, oneWayBinaryChipsTruthTable.AND);
testGateFunction(NOT, oneWayBinaryChipsTruthTable.NOT);
testGateFunction(OR, oneWayBinaryChipsTruthTable.OR);
testGateFunction(XOR, oneWayBinaryChipsTruthTable.XOR);
testGateFunction(NAND, oneWayBinaryChipsTruthTable.NAND);
