declare const Obj: {
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
export default Obj;
