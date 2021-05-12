var _a, _b, _c;
var a = [1, 2, 3].flat();
var o = { a: { c: undefined } };
if (((_b = (_a = o) === null || _a === void 0 ? void 0 : _a.a) === null || _b === void 0 ? void 0 : _b.c) !== 1) {
    console.log(1);
}
if (o && o.a && o.a.c && o.a.c !== 1) {
    console.log(2);
}
var p = undefined;
console.log((_c = p) === null || _c === void 0 ? void 0 : _c.slice(4));
