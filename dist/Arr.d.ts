export default class Arr {
    private value;
    constructor(value?: any[] | null);
    chunk(size?: number): this;
    first(): any;
    map(callback: (value: any, key: any) => {}): any[];
    pluck(key: string): this;
    range(start?: number, end?: number | null, step?: number): this;
    supplement(range: number, value?: null): this;
    toSelectOptions(keyValueEntries?: string[], optionKey?: string[]): {
        [key: string]: string;
    }[];
    toArray(): any[];
    get(): any[];
}
