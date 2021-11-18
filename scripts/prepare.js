#!/bin/node
/**
 * Prepare all sub-packages.
 *
 * @license Apache-2.0
 * @copyright Mat. 2019-present
 * @author drmats
 */

"use strict";




// ...
const

    {
        copyFileSync,
        mkdirSync,
        writeFileSync,
    } = require("fs"),

    distDir = "./dist",

    esConfig = mn => ({
        "sideEffects": false,
        "module": `../es/${mn}/index.js`,
        "typings": "./index.d.ts",
    }),

    packageJson = require("../package.json"),

    distJson = require("./dist.template.json");




console.info("Copying module configs ...");




// copy src type files and es configs to dist directory
require("./module_names")
    .forEach(mn => {
        let dst = `${distDir}/${mn}`;
        mkdirSync(dst, { recursive: true });
        writeFileSync(
            `${dst}/package.json`,
            JSON.stringify(esConfig(mn)),
        );
    });




// prepare dist package.json and store it
[
    "bugs", "contributors", "dependencies", "description",
    "engines", "homepage", "keywords", "license", "name",
    "repository", "version"
].forEach(key => { distJson[key] = packageJson[key] });
writeFileSync(
    `${distDir}/package.json`,
    JSON.stringify(
        Object.entries(distJson)
            .sort(([a, _1], [b, _2]) => a.localeCompare(b))
            .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {}),
    ),
);


// copy README.md and LICENSE
copyFileSync("./README.md", `${distDir}/README.md`);
copyFileSync("./LICENSE", `${distDir}/LICENSE`);




console.info("OK.");
