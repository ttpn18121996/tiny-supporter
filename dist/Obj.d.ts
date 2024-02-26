declare const Obj: {
    /**
     * Combine a key list and a value list into one object.
     * @param {string[]} keys List of keys to combine.
     * @param {any[]} values List of values to combine.
     * @returns {Object} A new object with specified properties derived from another object.
     */
    combine(keys: string[], values: any[]): Object;
    /**
     * Get an item from an array using "dot" notation.
     * @param {Object} obj The object to get the item from.
     * @param {string} keys String containing the path to the item, separated by a "dot".
     * @param {any} defaultValue Default value returned if not found.
     * @returns {any} The value of the specified property.
     */
    get(obj: {
        [key: string]: any;
    }, keys: string, defaultValue?: any): any;
    /**
     * Set an object item to a given value using "dot" notation.
     * @param {Object} obj The object to set the item from
     * @param {string} keys String containing the path to the item, separated by a "dot"
     * @param {any} value Value to set
     */
    set(obj: {
        [key: string]: any;
    }, keys: string, value: any): void;
    /**
     * Get a subset of the items from the given object.
     * @param {Object} obj The object to get the item from
     * @param {string|string[]} list List of keys to get
     * @returns {Object}
     */
    only(obj: {
        [key: string]: any;
    } | null, list: string | string[]): Object;
    /**
     * Get all of the given object except for a specified object of keys.
     * @param {Object} obj The object to get the item from
     * @param {string|string[]} list List of keys to ignore
     * @returns {Object}
     */
    except(obj: {
        [key: string]: any;
    } | null, list: string | string[]): Object;
    /**
     * Run a map over each of the properties in the object.
     * @param {Object} obj The object to loop each property
     * @param {Function} callback
     * @returns {any[]}
     */
    map(obj: {
        [key: string]: any;
    } | null, callback: (value: any, key: string) => {}): any[];
    /**
     * Convert an object to a query string with each property
     * @param {Object} obj
     * @returns {string}
     */
    toQueryString(obj: {
        [key: string]: any;
    } | null): string;
};
export default Obj;
