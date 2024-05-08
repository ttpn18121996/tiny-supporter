"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Arr {
    value;
    constructor(value) {
        this.value = value ?? [];
    }
    chunk(size = 1) {
        let temp = [...this.value];
        this.value = temp.reduce((result, item, index) => {
            const chunkIndex = Math.floor(index / size);
            if (!result[chunkIndex]) {
                result[chunkIndex] = [];
            }
            result[chunkIndex].push(item);
            return result;
        }, []);
        return this;
    }
    /**
     * Returns the first element of the array.
     * @returns {any} The first element of the array.
     */
    first() {
        for (const item of this.value) {
            return item;
        }
    }
    /**
     * Run a map over each of the items in the array.
     * @param {Function} callback Function execute for each element in the array.
     * @returns {any[]} A new array populated with the results of calling
     * a provided function on every element in the calling array.
     */
    map(callback) {
        const values = Object.values(this.value);
        const keys = Object.keys(this.value);
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            result.push(callback(values[i], keys[i]));
        }
        return result;
    }
    /**
     * Pluck an array of values from an array.
     * @param {string} key The key name needs to be taken from another array.
     * @returns {Arr}
     */
    pluck(key) {
        this.value = this.value
            .map((item) => (item instanceof Object ? item?.[key] : null))
            .filter((item) => item);
        return this;
    }
    /**
     * Creates an array of numbers processing from "start" up to "end" (including "end").
     * @param {number} start The start of the range
     * @param {number|null} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @returns {Arr}
     */
    range(start = 0, end = null, step = 1) {
        let result = [];
        if (end === null) {
            if (start > 0) {
                for (let i = 0; i < start; i++) {
                    result.push(i + 1);
                }
            }
            else if (start < 0) {
                for (let i = start; i < 0; i++) {
                    result.push(i);
                }
            }
        }
        else if (end !== null) {
            if (end > start) {
                for (let i = start; i <= end; i += step) {
                    result.push(i);
                }
            }
            else if (end < start) {
                for (let i = start; i >= end; i -= step) {
                    result.push(i);
                }
            }
        }
        this.value = result;
        return this;
    }
    /**
     * Add elements to ensure the length of the array.
     * @param {number} range Expected array length.
     * @param value The value of the element will be added.
     * @returns {Arr}
     */
    supplement(range, value = null) {
        while (this.value.length < range) {
            this.value.push(value);
        }
        return this;
    }
    /**
     * Filter out duplicate elements to ensure that array elements are unique.
     * @param {string} key The key is used to check for a unique value for an array element that is an object.
     * @returns {Arr}
     */
    unique(key) {
        if (key) {
            this.value = [...new Map(this.value.map(item => [item[key], item])).values()];
        }
        else {
            this.value = this.value.filter((value, index, self) => self.indexOf(value) === index);
        }
        return this;
    }
    /**
     * Convert the array to an array of options of a selection.
     * @param {string[]} keyValueEntries
     * @param {string[]} optionKey
     * @returns List of options.
     */
    toSelectOptions(keyValueEntries = ['key', 'value'], optionKey = ['value', 'label']) {
        const result = [];
        for (let i = 0; i < this.value.length; i++) {
            if ((0, _1.typeOf)(this.value[i]) === 'object') {
                result.push({
                    [optionKey[0]]: this.value[i][keyValueEntries[0]],
                    [optionKey[1]]: this.value[i][keyValueEntries[1]],
                });
            }
            else {
                result.push({
                    [optionKey[0]]: i,
                    [optionKey[1]]: this.value[i],
                });
            }
        }
        return result;
    }
    /**
     * Count the element of this array.
     * @returns Total element.
     */
    count() {
        return this.value.length;
    }
    /**
     * Check for empty array.
     * @returns This array is empty.
     */
    isEmpty() {
        return this.count() === 0;
    }
    /**
     * Gets the array value of this object.
     * @returns An array value of this object.
     */
    toArray() {
        return this.value instanceof Object
            ? Object.values(this.value)
            : this.value;
    }
    /**
     * The alias of the toArray method.
     * @returns An array value of this object.
     */
    get() {
        return this.toArray();
    }
}
exports.default = Arr;
