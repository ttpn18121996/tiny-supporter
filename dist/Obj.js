"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const Str_1 = __importDefault(require("./Str"));
const Obj = {
    combine: (keys, values) => {
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
    get: (obj, keys, defaultValue = null) => {
        let result = obj;
        keys.split('.').forEach(key => {
            result = result?.[key];
        });
        if (!(0, _1.isset)(result)) {
            if ((0, _1.typeOf)(defaultValue) === 'function')
                return defaultValue();
            return defaultValue !== undefined ? defaultValue : null;
        }
        return result;
    },
    set: (obj, keys, value) => {
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
    only: (obj, list) => {
        if (!obj)
            return {};
        return Object.keys(obj).reduce((pre, cur) => {
            if (((0, _1.typeOf)(list) === 'string' && cur === list)
                || (Array.isArray(list) && list.includes(cur))) {
                return { ...pre, [cur]: obj[cur] };
            }
            return { ...pre };
        }, {});
    },
    except: (obj, list) => {
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
    map: (obj, callback) => {
        const result = [];
        if (!obj)
            return [];
        for (const [key, value] of Object.entries(obj)) {
            result.push(callback(value, key));
        }
        return result;
    },
    toQueryString: (obj) => {
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
