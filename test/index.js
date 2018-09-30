
import test from "ava"
import { Ash } from "../dist"

let a = new Ash({x: 1}, {x: 2}, {x: 3})
let arr = new Ash({ a:1, b:2 }, { a:2, b:3 }, { a:3, b: 4})

test("= operator", t => {
    t.deepEqual(a("x=3"), [{x: 3}])
    t.deepEqual(arr("a=2"), [{ a:2, b:3 }])
})

test("% operator", t => {
    t.deepEqual(a((k,v) => v%2),  [{x: 2}])
    t.deepEqual(arr(a => a.b % 2 == 0), [{ a:1, b:2 }, { a:3, b: 4}])
})
