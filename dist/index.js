"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports._obj = exports._arr = exports._str = exports.queryStringToObject = exports.isJSON = exports.typeOf = exports.empty = exports.isset = void 0;
const Arr_1 = __importDefault(require("./Arr"));
const Obj_1 = __importDefault(require("./Obj"));
const Str_1 = __importDefault(require("./Str"));
/**
 * Check if a certain value exists or not.
 */
const isset = (value) => {
    return value !== undefined && value !== null;
};
exports.isset = isset;
/**
 * Check if a certain value is empty or not.
 */
const empty = (value) => {
    if (Array.isArray(value)) {
        return value.length === 0;
    }
    else if ((0, exports.typeOf)(value) === 'object') {
        if (value.hasOwnProperty('count') || typeof value.count === 'function') {
            return value.count() === 0;
        }
        else if (value.hasOwnProperty('isEmpty') || typeof value.isEmpty === 'function') {
            return value.isEmpty();
        }
        else {
            return Object.keys(value).length === 0;
        }
    }
    return value === undefined || value === null || value === false || value === '' || value === 0;
};
exports.empty = empty;
/**
 * Check the exact data type of a certain value.
 */
const typeOf = (value) => Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
exports.typeOf = typeOf;
/**
 * Check if a string value is json.
 */
const isJSON = (value) => {
    try {
        JSON.parse(value);
    }
    catch (e) {
        return false;
    }
    return true;
};
exports.isJSON = isJSON;
/**
 * Convert a query string to an object.
 */
const queryStringToObject = (value) => {
    const urlSearchParams = new URLSearchParams(value);
    const entries = urlSearchParams.entries();
    const result = {};
    for (const [key, value] of entries) {
        result[key] = value;
    }
    return result;
};
exports.queryStringToObject = queryStringToObject;
/**
 * String supporter.
 */
const _str = (value = '') => new Str_1.default(value);
exports._str = _str;
/**
 * Array supporter.
 */
const _arr = (value = []) => new Arr_1.default(value);
exports._arr = _arr;
/**
 * Object supporter.
 */
exports._obj = Obj_1.default;
