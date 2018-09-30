# ArrayShorthands

## Install

    npm install array-shorthands

## Usage

    import { Ash } from "array-shorthands"

    // intialization takes same parameters as an array
    let arr = new Ash({ a:1, b:2 }, { a:2, b:3 }, { a:3, b: 4})

    // filter by parameter
    console.log(arr("a=2"))

    // filter through function
    console.log(arr(a => a.b % 2 == 0))
