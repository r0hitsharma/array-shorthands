"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
function Shorthand(expr) {
    // console.log(`=>${expr}`)

    // , for and conditions
    if (expr.includes(",")) {
        return expr.split(",").map(Shorthand).join(" && ");
    }

    // key=val filter shorthand 
    if (expr.includes("=")) {
        let [key, val] = expr.split("=");
        return `x["${key}"] == ${val}`;
    }
}

class ArrayShorthand extends Function {
    constructor(...arr) {
        super();

        return new Proxy(this, {
            get: (target, prop) => {
                const arrayProp = this._inner[prop];
                if (arrayProp) {
                    if (typeof arrayProp == "function") return arrayProp.bind(this._inner);else return arrayProp;
                }
            },
            apply: (target, thisArg, args) => {
                // return Shorthand(this._inner, ...args)
                let [expr] = args;
                if (!expr) return arr;

                // fn filter shorthand
                if (typeof expr == "function") return arr.filter(expr);

                return arr.filter(new Function("x", `return ${Shorthand(expr)}`));
            }
        });
    }
}

exports.Ash = ArrayShorthand;
//# sourceMappingURL=index.js.map