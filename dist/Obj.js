"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Str_1 = __importDefault(require("./Str"));
const Obj = {
    /**
     * Combine a key list and a value list into one object.
     * @param {string[]} keys List of keys to combine.
     * @param {any[]} values List of values to combine.
     * @returns {Object} A new object with specified properties derived from another object.
     */
    combine(keys, values) {
        if (keys.length < values.length) {
            for (let i = 0; i < values.length - keys.length; i++) {
                keys.push(`key_${i}`);
            }
        }
        return keys.reduce((pre, cur, curIndex) => ({
            ...pre,
            [cur]: values?.[curIndex] ? values[curIndex] : null,
        }), {});
    },
    /**
     * Get an item from an array using "dot" notation.
     * @param {Object} obj The object to get the item from.
     * @param {string} keys String containing the path to the item, separated by a "dot".
     * @param {any} defaultValue Default value returned if not found.
     * @returns {any} The value of the specified property.
     */
    get(obj, keys, defaultValue = null) {
        let result = obj;
        keys.split('.').forEach(key => {
            if (!(0, _1.empty)(key)) {
                result = result?.[key];
            }
        });
        if (!(0, _1.isset)(result)) {
            if ((0, _1.typeOf)(defaultValue) === 'function')
                return defaultValue();
            return defaultValue !== undefined ? defaultValue : null;
        }
        return result;
    },
    /**
     * Set an object item to a given value using "dot" notation.
     * @param {Object} obj The object to set the item from
     * @param {string} keys String containing the path to the item, separated by a "dot"
     * @param {any} value Value to set
     */
    set(obj, keys, value) {
        const keyList = keys.split('.');
        let currentObj = obj;
        for (let i = 0; i < keyList.length - 1; i++) {
            const key = keyList[i];
            if (!currentObj[key] || typeof currentObj[key] !== 'object') {
                currentObj[key] = {};
            }
            currentObj = currentObj[key];
        }
        currentObj[keyList[keyList.length - 1]] = value;
    },
    /**
     * Get a subset of the items from the given object.
     * @param {Object} obj The object to get the item from
     * @param {string|string[]} list List of keys to get
     * @returns {Object}
     */
    only(obj, list) {
        if (!obj)
            return {};
        return Object.keys(obj).reduce((pre, cur) => {
            if (((0, _1.typeOf)(list) === 'string' && cur === list) || (Array.isArray(list) && list.includes(cur))) {
                return { ...pre, [cur]: obj[cur] };
            }
            return { ...pre };
        }, {});
    },
    /**
     * Get all of the given object except for a specified object of keys.
     * @param {Object} obj The object to get the item from
     * @param {string|string[]} list List of keys to ignore
     * @returns {Object}
     */
    except(obj, list) {
        if (!obj)
            return {};
        return Object.keys(obj).reduce((pre, cur) => {
            if (((0, _1.typeOf)(list) === 'string' && cur !== list)
                || (Array.isArray(list) && !list.includes(cur))) {
                return { ...pre, [cur]: obj[cur] };
            }
            return { ...pre };
        }, {});
    },
    /**
     * Run a map over each of the properties in the object.
     * @param {Object} obj The object to loop each property
     * @param {Function} callback
     * @returns {any[]}
     */
    map(obj, callback) {
        const result = [];
        if (!obj)
            return [];
        for (const [key, value] of Object.entries(obj)) {
            result.push(callback(value, key));
        }
        return result;
    },
    /**
     * Convert an object to a query string with each property
     * @param {Object} obj
     * @returns {string}
     */
    toQueryString(obj) {
        const urlSearchParams = new URLSearchParams();
        for (const key in obj) {
            if (!(0, _1.isset)(obj[key])) {
                continue;
            }
            if ((0, _1.typeOf)(obj[key]) === 'object' || (0, _1.typeOf)(obj[key]) === 'array') {
                const entries = Object.entries(obj[key]);
                for (const [field, value] of entries) {
                    if (!(0, _1.isset)(value) || value === '') {
                        continue;
                    }
                    urlSearchParams.append(`${key}[${field}]`, value);
                }
            }
            else {
                urlSearchParams.append(key, new Str_1.default('').caseString(obj[key]));
            }
        }
        const result = urlSearchParams.toString();
        return (0, _1.empty)(result) ? '' : `?${result}`;
    },
};
exports.default = Obj;
