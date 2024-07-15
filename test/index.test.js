const { isset, empty, typeOf, isJSON, queryStringToObject } = require('../dist');

describe('it is set', () => {
  test('with value is not undefined', () => {
    let a;
    expect(isset(a)).toBeFalsy();
  });

  test('with value is not null', () => {
    const a = null;
    expect(isset(a)).toBeFalsy();
  });
});

describe('it is empty', () => {
  test('with value is undefined', () => {
    let a;
    expect(empty(a)).toBeTruthy();
  });

  test('with value is null', () => {
    const a = null;
    expect(empty(a)).toBeTruthy();
  });

  test('with value is an empty string', () => {
    const a = '';
    expect(empty(a)).toBeTruthy();
  });

  test('with value is an empty array', () => {
    const a = [];
    expect(empty(a)).toBeTruthy();
  });

  test('with value is 0', () => {
    const a = 0;
    expect(empty(a)).toBeTruthy();
  });

  test('with value is false', () => {
    const a = false;
    expect(empty(a)).toBeTruthy();
  });

  test('with value is an empty object', () => {
    const a = { count: () => 0 };
    const b = { isEmpty: () => true };
    const c = {};
    expect(empty(a)).toBeTruthy();
    expect(empty(b)).toBeTruthy();
    expect(empty(c)).toBeTruthy();
  });
});

describe('it can be get type of', () => {
  test('a string', () => {
    expect(typeOf('')).toEqual('string');
  });

  test('a number', () => {
    expect(typeOf(1)).toEqual('number');
  });

  test('a boolean', () => {
    expect(typeOf(true)).toEqual('boolean');
  });

  test('an array', () => {
    expect(typeOf([])).toEqual('array');
  });

  test('an object', () => {
    expect(typeOf({})).toEqual('object');
  });

  test('a function', () => {
    expect(typeOf(() => {})).toEqual('function');
  });

  test('a constructor', () => {
    class A {}
    expect(typeOf(A)).toEqual('constructor');
  });
});

describe('it can verify', () => {
  test('a JSON string', () => {
    expect(isJSON('{}')).toBeTruthy();
  });

  test('an invalid JSON', () => {
    expect(isJSON('')).toBeFalsy();
  });
});

test('it can convert a query string to an object', () => {
  const queryString = '?name=Nam';
  const actual = queryStringToObject(queryString);
  expect(actual).toEqual({ name: 'Nam' });
});
