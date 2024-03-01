"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
class Str {
    value;
    constructor(value) {
        this.value = this.caseString(value);
    }
    length() {
        return this.value.length;
    }
    after(search) {
        if (this.value === '') {
            return this.value;
        }
        this.value = this.value
            .split(search)
            .filter((word, position) => {
            return position > 0;
        })
            .join(search);
        return this;
    }
    afterLast(search) {
        if (this.value === '') {
            return this.value;
        }
        this.value = this.value.split(search).reverse()[0];
        return this;
    }
    before(search) {
        if (this.value === '') {
            return this.value;
        }
        this.value = this.value.split(search, 1).join('');
        return this;
    }
    beforeLast(search) {
        if (this.value === '') {
            return this.value;
        }
        this.value = this.value
            .split(search)
            .filter((word, position) => {
            return position < word.length - 1;
        })
            .join(search);
        return this;
    }
    bind() {
        const args = arguments;
        let valueBound = this.value;
        if (Array.isArray(args?.[0])) {
            for (let i = 0; i < args[0].length; i++) {
                valueBound = valueBound.replace(/\{(\d+)\}/, args[0][i]);
            }
        }
        else if ((0, _1.typeOf)(args[0]) === 'object') {
            const params = args[0];
            const matches = valueBound.match(/\{[a-zA-Z0-9_\-]+\}/g)?.map(m => m.replace(/^\{/, '').replace(/\}$/, ''));
            if (matches) {
                for (const match of matches) {
                    const regex = RegExp('{' + match + '}');
                    const param = params?.[match];
                    if (!param) {
                        continue;
                    }
                    valueBound = valueBound.replace(regex, params?.[match] ?? '');
                }
            }
        }
        else {
            valueBound = valueBound.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined' ? args[number] : match);
        }
        this.value = valueBound;
        return this;
    }
    toString() {
        return this.value;
    }
    get(start = 0, end = 0) {
        if (end > 0) {
            return this.toString().substring(start, end);
        }
        return this.toString();
    }
    append(...values) {
        this.value += values.join('');
        return this;
    }
    prepend(...values) {
        this.value = values.join('') + this.value;
        return this;
    }
    title() {
        this.value = this.value
            .replace(/[\s\-_\.]+/g, ' ')
            .replace(/[a-zA-Z0-9]+[\S\-_]*/g, match => match.charAt(0).toUpperCase() + match.substring(1).toLowerCase());
        return this;
    }
    studly() {
        this.value = this.title().get().replace(/\s/g, '');
        return this;
    }
    camel() {
        this.value = this.studly()
            .get()
            .replace(/^(.)/, (match, p1) => p1.toLowerCase());
        return this;
    }
    lower() {
        this.value = this.value.toLowerCase();
        return this;
    }
    upper() {
        this.value = this.value.toUpperCase();
        return this;
    }
    nonUnicode() {
        this.value = this.value
            .replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/g, 'a')
            .replace(/Á|À|Ả|Ạ|Ã|Ă|Ắ|Ằ|Ẳ|Ẵ|Ặ|Â|Ấ|Ầ|Ẩ|Ẫ|Ậ/g, 'A')
            .replace(/đ/g, 'd')
            .replace(/Đ/g, 'D')
            .replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/g, 'e')
            .replace(/E|É|È|Ẻ|Ẽ|Ê|Ế|Ề|Ể|Ễ|Ệ/g, 'E')
            .replace(/i|í|ì|ỉ|ĩ|ị/g, 'i')
            .replace(/I|Í|Ì|Ỉ|Ĩ|Ị/g, 'I')
            .replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/g, 'o')
            .replace(/Ó|Ò|Ỏ|Õ|Ọ|Ô|Ố|Ồ|Ổ|Ỗ|Ộ|Ơ|Ớ|Ờ|Ở|Ỡ|Ợ/g, 'O')
            .replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/g, 'u')
            .replace(/Ú|Ù|Ủ|Ũ|Ụ|Ư|Ứ|Ừ|Ử|Ữ|Ự/g, 'U')
            .replace(/ý|ỳ|ỷ|ỹ|ỵ/g, 'y')
            .replace(/Ý|Ỳ|Ỷ|Ỹ|Ỵ/g, 'Y');
        return this;
    }
    snake(delimiter = '_') {
        this.value = this.nonUnicode()
            .get()
            .replace(/[A-Z]/g, match => delimiter + match.toLocaleLowerCase())
            .replace(/[\s]+/g, '')
            .replace(new RegExp('^' + delimiter), '');
        return this;
    }
    kebab() {
        this.snake('-');
        return this;
    }
    escapeHtml() {
        this.value = this.value
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        return this;
    }
    limit(length = 100) {
        if (this.value.length <= length) {
            return this;
        }
        let result = '';
        for (const word of this.value.split(' ')) {
            const tmp = result + word.trim().replace(/\r?\n|\r| /g, ' ').replace(/\s\s+/g, ' ') + ' ';
            if (tmp.length <= length - 4) {
                result = tmp;
            }
        }
        this.value = result + '...';
        return this;
    }
    arrayFromLowToHigh(low, high) {
        let result = [];
        for (let i = low; i <= high; i++) {
            result.push(i);
        }
        return result;
    }
    random(length = 16, options = {}) {
        const UPPERCASE_CHAR_CODES = this.arrayFromLowToHigh(65, 90);
        const LOWCASE_CHAR_CODES = this.arrayFromLowToHigh(97, 122);
        const NUMBER_CHAR_CODES = this.arrayFromLowToHigh(48, 57);
        const SYMBOL_CHAR_CODES = this.arrayFromLowToHigh(33, 47).concat(this.arrayFromLowToHigh(58, 64).concat(this.arrayFromLowToHigh(91, 96).concat(this.arrayFromLowToHigh(123, 126))));
        let charCodes = LOWCASE_CHAR_CODES;
        if (options.includeUppercase)
            charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
        if (options.includeNumbers)
            charCodes = charCodes.concat(NUMBER_CHAR_CODES);
        if (options.includeSymbols)
            charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
        const result = [];
        for (let i = 0; i < length; i++) {
            const character = charCodes[Math.floor(Math.random() * charCodes.length)];
            result.push(String.fromCharCode(character));
        }
        return result.join('');
    }
    replace(regexp, replacer) {
        this.value = this.value.replace(regexp, replacer);
        return this;
    }
    slice(start, end) {
        this.value = this.value.slice(start, end);
        return this;
    }
    padStart(length, char) {
        this.value = this.value.padStart(length, char);
        return this;
    }
    padEnd(length, char) {
        this.value = this.value.padEnd(length, char);
        return this;
    }
    caseString(value) {
        return typeof value === 'object' &&
            (value.hasOwnProperty('toString') || value.toString === Object.prototype.toString)
            ? value.toString()
            : `${value}`;
    }
}
exports.default = Str;
