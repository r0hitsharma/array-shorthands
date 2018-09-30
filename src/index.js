function Shorthand(sel) {
    if(!sel)
        return this
    
    // fn filter shorthand
    if(typeof sel == "function")
        return this.filter(sel)

    // key=val filter shorthand 
    if(sel.includes("=")){
        let [key, val] = sel.split("=")
        return this.filter(x => x[key] == val)
    }
}

class ArrayShorthand extends Function {
    constructor(...arr){
        super()
        this._inner = [...arr]

        return new Proxy(this, {
            get: (target, prop) => {
                const arrayProp = this._inner[prop]
                if(arrayProp){
                    if(typeof arrayProp == "function")
                        return arrayProp.bind(this._inner)
                    else
                        return arrayProp
                }
            },
            apply: (target, thisArg, args) => {
                return Shorthand.bind(this._inner)(...args)
            }
        })
    }
}

export { ArrayShorthand as Ash }
