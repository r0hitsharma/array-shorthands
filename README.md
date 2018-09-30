# ArrayShorthands

ArrayShorthands provides methods for filtering on arrays using direct invocation. The `Ash` class instances can be initialized using the same parameters as `Array` class instances, and proxy all `Array` member functions such as `.filter`, `.forEach`, `map` etc.

## Install

    npm install array-shorthands

## Usage

```javascript
import { Ash } from "array-shorthands"

// intialization takes same parameters as an array
let arr = new Ash({ a:1, b:2 }, { a:2, b:3 }, { a:3, b: 4}, { a:1, b:3 })

// filter by parameter, as key=val
arr("a=2") // returns [{ a:2, b:3 }]

// filter through fn directly
arr(a => a.b % 2 == 0) // returns [{ a:1, b:2 }, { a:3, b: 4}]

// chain filters with , operator
arr("a=1,b=3") // returns [{ a:1, b:3 }]
arr("a=3,b=3") // returns []
```
