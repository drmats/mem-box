# mem-box

Shared memory.

[![npm version](https://img.shields.io/npm/v/mem-box.svg)](https://www.npmjs.com/package/mem-box)
[![npm license](https://img.shields.io/npm/l/mem-box.svg)](https://www.npmjs.com/package/mem-box)
[![GitHub top language](https://img.shields.io/github/languages/top/drmats/mem-box.svg)](https://github.com/drmats/mem-box)
[![GitHub code size](https://img.shields.io/github/languages/code-size/drmats/mem-box.svg)](https://github.com/drmats/mem-box)
[![GitHub tag](https://img.shields.io/github/tag/drmats/mem-box.svg)](https://github.com/drmats/mem-box)

```bash
$ npm i mem-box
```

Works in [node.js](https://nodejs.org/) and browser environments.

<br />




## index

* [documentation](#documentation)
* [namespaces](#namespaces)
    - [memory](#shared-memory)
* [examples](#examples)
    - [shared memory pattern](#shared-memory-pattern)
* [notes](#notes)
* [license](#license)

<br />




## documentation

> [API Reference](https://drmats.github.io/mem-box/)

<br />




## namespace

### shared **memory**

```javascript
memory
```

> ```javascript
> { useMemory: [Function: useMemory],
>   share: [Function: share] }
> ```




## examples

### shared memory pattern

Frontend and backend applications often use some globally-configured objects,
like axios instance with custom headers and base url, authenticated cloud
services provider, express.js instance, database connection object,
configured redux store, etc...

One might stick these to `window` (or `global`) object, but it's considered
anti-pattern.

Another solution is to pass these objects as parameters to functions that
needs to use them, but it's cumbersome and scales poorly.

Using `memory` module solves these problems and resembles
the usage of Hooks in React.

Example:

* `main.js` file of an express.js-based microservice application:

    ```javascript
    import express, { json } from "express"
    import { share } from "mem-box/memory"
    import configureRoutes from "./routes"

    // main express application
    const app = express()

    // share it with any other module interested
    share({ app })

    // some configuration
    app.enable("trust proxy")
    app.use(json())

    // complex configuration - e.g. enable CORS,
    // authentication, redirects, etc.

    // configureHeaders()
    // configureAuth()
    // configureRedirects()

    // ...

    // routes configuration
    configureRoutes()

    app.listen(/* ... */)
    ```

* example `routes.js` file:

    ```javascript
    import { useMemory } from "mem-box/memory"

    export default configureRoutes () {

        // get access to main express application
        const { app } = useMemory()

        // add "hello world" route
        app.get("/hello/", (req, res, next) => {
            res.status(200).send({ hello: "world" })
            return next()
        })

    }
    ```

<br />




## notes

This library is suitable to use in server and browser environments
and it is being used as such.
Go ahead and [file an issue](https://github.com/drmats/mem-box/issues/new)
if you found a bug 🐞.

</br>




## support

You can support this project via [stellar][stellar] network:

* Payment address: [xcmats*keybase.io][xcmatspayment]
* Stellar account ID: [`GBYUN4PMACWBJ2CXVX2KID3WQOONPKZX2UL4J6ODMIRFCYOB3Z3C44UZ`][addressproof]

<br />




## license

**mem-box** is released under the Apache License, Version 2.0. See the
[LICENSE](https://github.com/drmats/mem-box/blob/master/LICENSE)
for more details.




[stellar]: https://learn.stellar.org
[xcmatspayment]: https://keybase.io/xcmats
[addressproof]: https://keybase.io/xcmats/sigchain#d0999a36b501c4818c15cf813f5a53da5bfe437875d92262be8d285bbb67614e22
