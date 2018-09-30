"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Shorthand(arr, expr) {
    if (!expr) return arr;

    // fn filter shorthand
    if (typeof expr == "function") return arr.filter(expr);

    // , for and conditions
    if (expr.includes(",")) {
        expr.split(",").forEach(subExpr => {
            arr = Shorthand(arr, subExpr);
        });
        return arr;
    }

    // key=val filter shorthand 
    if (expr.includes("=")) {
        let [key, val] = expr.split("=");
        return arr.filter(x => x[key] == val);
    }
}

class ArrayShorthand extends Function {
    constructor(...arr) {
        super();
        this._inner = [...arr];

        return new Proxy(this, {
            get: (target, prop) => {
                const arrayProp = this._inner[prop];
                if (arrayProp) {
                    if (typeof arrayProp == "function") return arrayProp.bind(this._inner);else return arrayProp;
                }
            },
            apply: (target, thisArg, args) => {
                return Shorthand(this._inner, ...args);
            }
        });
    }
}

exports.Ash = ArrayShorthand;
//# sourceMappingURL=index.js.map