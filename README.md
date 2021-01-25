# mem-box

Shared memory.

[![npm version](https://img.shields.io/npm/v/mem-box.svg)](https://www.npmjs.com/package/mem-box)
[![GitHub code size](https://img.shields.io/github/languages/code-size/drmats/mem-box.svg)](https://github.com/drmats/mem-box)
[![GitHub tag](https://img.shields.io/github/tag/drmats/mem-box.svg)](https://github.com/drmats/mem-box)
[![npm license](https://img.shields.io/npm/l/mem-box.svg)](https://www.npmjs.com/package/mem-box)

```bash
$ npm i mem-box
```

<br />




## shared memory pattern

Frontend and backend applications often use some globally-configured objects,
like `axios` instance with custom headers and base url, authenticated cloud
services provider instance, `express.js` instance, database connection object,
configured `redux` store, etc...

One might stick these to `window` (or `global`) object, but it's considered an
anti-pattern.

Another solution is to pass these objects as parameters to functions that
needs to use them, but it's cumbersome and scales poorly.

Using `mem-box` solves these problems and resembles the usage of `hooks`
in `react`.

<br />




## example

* `main.js` file of an `express.js`-based microservice application:

    ```javascript
    import express from "express";
    import { share } from "mem-box";
    import configureRoutes from "./routes";

    // main express application
    const app = express();

    // share it with any other module interested
    share({ app });

    // complex configuration - e.g. enable CORS,
    // authentication, redirects, etc.
    // ...

    // routes configuration
    configureRoutes();

    app.listen(/* ... */);
    ```

* example `routes.js` file:

    ```javascript
    import { useMemory } from "mem-box";

    export default configureRoutes () {

        // get access to main express application
        const { app } = useMemory();

        // add "hello world" route
        app.get("/hello/", (req, res, next) => {
            res.status(200).send({ hello: "world" });
            return next();
        });

    }
    ```

<br />




## usage with [typescript](https://www.typescriptlang.org/)

In order to provide type-safety (and nice
[IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) hints)
[declaration merging](https://www.typescriptlang.org/docs/handbook/declaration-merging.html)
typescript feature can be utilized.

* `main.ts` file of an `express.js`-based microservice application:

    ```typescript
    import express from "express";
    import { share } from "mem-box";
    import configureAuth from "./auth";

    // main express application
    const app = express();

    // private key (read from env or keystore in real-world)
    const secretKey = "-----BEGIN PRIVATE KEY-----\nMIIEvqhkiGwgEqh...";

    // share with other modules
    share({ app, secretKey });

    // authentication config (based on external service provider)
    configureAuth();

    // ...

    app.listen(/* ... */);

    // global declaration merging
    declare global {

        // shared memory type augmentation
        interface Mem {
            app: ReturnType<typeof express>;
            secretKey: string;
        }

    }
    ```

* example `auth.ts` file:

    ```typescript
    import type { RequestHandler } from "express";
    import { someservice } from "someserviceapis"; // imaginary service
    import { share, useMemory } from "mem-box";

    // ...
    export default configureAuth (): void {

        // get access to secret (explicit type hint)
        const { secretKey } = useMemory<Mem>();

        // obtain JSON Web Token from external provider
        const jwt = new someservice.auth.JWT({
            secretKey, /* scopes: [...], subject: ..., */
        });

        // build middleware for usage in other modules
        const authMw: RequestHandler = (req, res, next) => {
            // do something with `jwt` const
            // ...
            return next();
        };

        // share it
        share({ authMw });

    }

    // inform type system of a new member in `Mem` interface
    declare global {

        // shared memory type augmentation
        interface Mem {
            authMw: RequestHandler;
        }

    }
    ```

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
