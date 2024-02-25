"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    first() {
        for (const item of this.value) {
            return item;
        }
    }
    map(callback) {
        const values = Object.values(this.value);
        const keys = Object.keys(this.value);
        const result = [];
        for (let i = 0; i < keys.length; i++) {
            result.push(callback(values[i], keys[i]));
        }
        return result;
    }
    pluck(key) {
        this.value = this.value
            .map((item) => (item instanceof Object ? item?.[key] : null))
            .filter((item) => item);
        return this;
    }
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
    supplement(range, value = null) {
        while (this.value.length < range) {
            this.value.push(value);
        }
        return this;
    }
    toSelectOptions(keyValueEntries = ['key', 'value'], optionKey = ['value', 'label']) {
        const result = [];
        for (const item of this.value) {
            result.push({
                [optionKey[0]]: item[keyValueEntries[0]],
                [optionKey[1]]: item[keyValueEntries[1]],
            });
        }
        return result;
    }
    toArray() {
        return this.value instanceof Object
            ? Object.values(this.value)
            : this.value;
    }
    get() {
        return this.toArray();
    }
}
exports.default = Arr;
