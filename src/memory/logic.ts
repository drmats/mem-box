/**
 * Shared memory.
 *
 * @module memory
 * @license Apache-2.0
 * @copyright Mat. 2018-present
 */




import type { JSAnyObj } from "@xcmats/js-toolbox/type";
import { identity, lazyish } from "@xcmats/js-toolbox/func";
import { assign } from "@xcmats/js-toolbox/struct";




/**
 * Application logic shared memory structure.
 *
 * @private
 * @function memory
 * @returns memory object
 */
const memory = lazyish<JSAnyObj>({});




/**
 * Invoke function argument with a reference to shared memory.
 *
 * @function useMemory
 * @param f function to invoke on a shared memory
 * @returns {*}
 */
export function useMemory<T extends JSAnyObj> (f: (x: T) => T = identity): T {
    return f(memory() as T);
}




/**
 * Extend shared memory with keys from provided extension object.
 * It throws when shared memory already have those keys.
 *
 * @function share
 * @param ext extension object
 * @returns extended memory object
 */
export function share<T extends JSAnyObj> (ext: T): T {
    return useMemory((ctx) => assign(ctx, ext));
}
