import Arr from './Arr';
import Str from './Str';
/**
 * Check if a certain value exists or not.
 */
export declare const isset: (value: any) => boolean;
/**
 * Check if a certain value is empty or not.
 */
export declare const empty: (value: any) => boolean;
/**
 * Check the exact data type of a certain value.
 */
export declare const typeOf: (value: any) => string;
/**
 * Check if a string value is json.
 */
export declare const isJSON: (value: string) => boolean;
/**
 * Convert a query string to an object.
 */
export declare const queryStringToObject: (value: string) => Object;
/**
 * String supporter.
 */
export declare const _str: (value?: string) => Str;
/**
 * Array supporter.
 */
export declare const _arr: (value?: any[] | null) => Arr;
/**
 * Object supporter.
 */
export declare const _obj: {
    combine: (keys: string[], values: any[]) => Object;
    get: (obj: {
        [key: string]: any;
    }, keys: string, defaultValue?: any) => any;
    set: (obj: {
        [key: string]: any;
    }, keys: string, value: any) => void;
    only: (obj: {
        [key: string]: any;
    } | null, list: string | string[]) => Object;
    except: (obj: {
        [key: string]: any;
    } | null, list: string | string[]) => Object;
    map: (obj: {
        [key: string]: any;
    } | null, callback: (value: any, key: string) => {}) => any[];
    toQueryString: (obj: {
        [key: string]: any;
    } | null) => string;
};
