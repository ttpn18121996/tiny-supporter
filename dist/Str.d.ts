export type RandomOptions = {
    includeUppercase?: boolean;
    includeNumbers?: boolean;
    includeSymbols?: boolean;
};
export default class Str {
    private value;
    constructor(value: string);
    after(search: string): this | string;
    afterLast(search: string): this | string;
    before(search: string): this | string;
    beforeLast(search: string): this | string;
    bind(): this;
    toString(): string;
    get(start?: number, end?: number): string;
    append(...values: string[]): this;
    prepend(...values: string[]): this;
    title(): this;
    studly(): this;
    camel(): this;
    lower(): this;
    upper(): this;
    nonUnicode(): this;
    snake(delimiter?: string): this;
    kebab(): this;
    escapeHtml(): this;
    limit(length?: number): this;
    private arrayFromLowToHigh;
    random(length?: number, options?: RandomOptions): string;
    replace(regexp: RegExp, replacer: string): this;
    caseString(value: any): string;
}
