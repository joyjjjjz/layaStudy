"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var XLSX = require("xlsx");
var options = {
    cellDates: true
};
var workbook = XLSX.readFile('test.xlsx', options);
var otherworkbook = XLSX.readFile('test.xlsx', { type: 'file' });
var author = workbook.Props.Author;
var firstsheet = workbook.SheetNames[0];
var firstworksheet = workbook.Sheets[firstsheet];
var WB1A1 = (firstworksheet["A1"]);
var jsonvalues = XLSX.utils.sheet_to_json(firstworksheet);
var csv = XLSX.utils.sheet_to_csv(firstworksheet);
var formulae = XLSX.utils.sheet_to_formulae(firstworksheet);
var aoa = XLSX.utils.sheet_to_json(firstworksheet, { raw: true, header: 1 });
var aoa2 = XLSX.utils.aoa_to_sheet([
    [1, 2, 3, 4, 5, 6, 7],
    [2, 3, 4, 5, 6, 7, 8]
]);
var js2ws = XLSX.utils.json_to_sheet([
    { name: "Sheet", age: 12 },
    { name: "JS", age: 24 }
]);
var WBProps = workbook.Workbook;
var WBSheets = WBProps.Sheets;
var WBSheet0 = WBSheets[0];
console.log(WBSheet0.Hidden);
var fmt14 = XLSX.SSF._table[14];
//# sourceMappingURL=xlsx-tests.js.map