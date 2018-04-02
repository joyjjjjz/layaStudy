"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* xlsx.js (C) 2013-present SheetJS -- http://sheetjs.com */
/* vim: set ts=2: */
var core_1 = require("@angular/core");
var XLSX = require("xlsx");
var file_saver_1 = require("file-saver");
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i !== s.length; ++i)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
var SheetJSComponent = /** @class */ (function () {
    function SheetJSComponent() {
        this.data = [[1, 2], [3, 4]];
        this.wopts = { bookType: 'xlsx', type: 'binary' };
        this.fileName = 'SheetJS.xlsx';
    }
    SheetJSComponent.prototype.onFileChange = function (evt) {
        var _this = this;
        /* wire up file reader */
        var target = (evt.target);
        if (target.files.length !== 1)
            throw new Error('Cannot use multiple files');
        var reader = new FileReader();
        reader.onload = function (e) {
            /* read workbook */
            var bstr = e.target.result;
            var wb = XLSX.read(bstr, { type: 'binary' });
            /* grab first sheet */
            var wsname = wb.SheetNames[0];
            var ws = wb.Sheets[wsname];
            /* save data */
            _this.data = (XLSX.utils.sheet_to_json(ws, { header: 1 }));
        };
        reader.readAsBinaryString(target.files[0]);
    };
    SheetJSComponent.prototype.export = function () {
        /* generate worksheet */
        var ws = XLSX.utils.aoa_to_sheet(this.data);
        /* generate workbook and add the worksheet */
        var wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
        /* save to file */
        var wbout = XLSX.write(wb, this.wopts);
        file_saver_1.saveAs(new Blob([s2ab(wbout)]), this.fileName);
    };
    SheetJSComponent = __decorate([
        core_1.Component({
            selector: 'sheetjs',
            template: "\n\t<input type=\"file\" (change)=\"onFileChange($event)\" multiple=\"false\" />\n\t<table class=\"sjs-table\">\n\t\t<tr *ngFor=\"let row of data\">\n\t\t\t<td *ngFor=\"let val of row\">\n\t\t\t\t{{val}}\n\t\t\t</td>\n\t\t</tr>\n\t</table>\n\t<button (click)=\"export()\">Export!</button>\n\t"
        })
    ], SheetJSComponent);
    return SheetJSComponent;
}());
exports.SheetJSComponent = SheetJSComponent;
//# sourceMappingURL=sheetjs.component.js.map