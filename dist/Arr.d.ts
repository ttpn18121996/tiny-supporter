export default class Arr {
    private value;
    constructor(value?: any[] | null);
    chunk(size?: number): this;
    /**
     * Returns the first element of the array.
     * @returns {any} The first element of the array.
     */
    first(): any;
    /**
     * Run a map over each of the items in the array.
     * @param {Function} callback Function execute for each element in the array.
     * @returns {any[]} A new array populated with the results of calling
     * a provided function on every element in the calling array.
     */
    map(callback: (value: any, key: any) => {}): any[];
    /**
     * Pluck an array of values from an array.
     * @param {string} key The key name needs to be taken from another array.
     * @returns {Arr}
     */
    pluck(key: string): this;
    /**
     * Creates an array of numbers processing from "start" up to "end" (including "end").
     * @param {number} start The start of the range
     * @param {number|null} end The end of the range.
     * @param {number} step The value to increment or decrement by.
     * @returns {Arr}
     */
    range(start?: number, end?: number | null, step?: number): this;
    /**
     * Add elements to ensure the length of the array.
     * @param {number} range Expected array length.
     * @param value The value of the element will be added.
     * @returns {Arr}
     */
    supplement(range: number, value?: null): this;
    /**
     * Filter out duplicate elements to ensure that array elements are unique.
     * @param {string} key The key is used to check for a unique value for an array element that is an object.
     * @returns {Arr}
     */
    unique(key?: string): this;
    /**
     * Convert the array to an array of options of a selection.
     * @param {string[]} keyValueEntries
     * @param {string[]} optionKey
     * @returns List of options.
     */
    toSelectOptions(keyValueEntries?: string[], optionKey?: string[]): {
        [key: string]: string;
    }[];
    /**
     * Count the element of this array.
     * @returns Total element.
     */
    count(): number;
    /**
     * Check for empty array.
     * @returns This array is empty.
     */
    isEmpty(): boolean;
    /**
     * Gets the array value of this object.
     * @returns An array value of this object.
     */
    toArray(): any[];
    /**
     * The alias of the toArray method.
     * @returns An array value of this object.
     */
    get(): any[];
}
