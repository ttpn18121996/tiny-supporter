export default class Arr {
  private value: any[];

  constructor(value?: any[] | null) {
    this.value = value ?? [];
  }

  public chunk(size = 1): this {
    let temp = [...this.value];
    this.value = temp.reduce((result: any[], item, index) => {
      const chunkIndex = Math.floor(index / size);
      if (!result[chunkIndex]) {
        result[chunkIndex] = [];
      }
      result[chunkIndex].push(item);
      return result;
    }, []);

    return this;
  }

  public first(): any {
    for (const item of this.value) {
      return item;
    }
  }

  public map(callback: (value: any, key: any) => {}): any[] {
    const values = Object.values(this.value);
    const keys = Object.keys(this.value);
    const result = [];
    for (let i = 0; i < keys.length; i++) {
      result.push(callback(values[i], keys[i]));
    }

    return result;
  }

  public pluck(key: string) {
    this.value = this.value
      .map((item) => (item instanceof Object ? item?.[key] : null))
      .filter((item) => item);

    return this;
  }

  public range(start = 0, end: number | null = null, step = 1): this {
    let result = [];
    if (end === null) {
      if (start > 0) {
        for (let i = 0; i < start; i++) {
          result.push(i + 1);
        }
      } else if (start < 0) {
        for (let i = start; i < 0; i++) {
          result.push(i);
        }
      }
    } else if (end !== null) {
      if (end > start) {
        for (let i = start; i <= end; i += step) {
          result.push(i);
        }
      } else if (end < start) {
        for (let i = start; i >= end; i -= step) {
          result.push(i);
        }
      }
    }

    this.value = result;

    return this;
  }

  public supplement(range: number, value = null) {
    while (this.value.length < range) {
      this.value.push(value);
    }

    return this;
  }

  public toSelectOptions(
    keyValueEntries = ['key', 'value'],
    optionKey = ['value', 'label']
  ): { [key: string]: string }[] {
    const result = [];
    for (const item of this.value) {
      result.push({
        [optionKey[0]]: item[keyValueEntries[0]],
        [optionKey[1]]: item[keyValueEntries[1]],
      });
    }
    return result;
  }

  public toArray(): any[] {
    return this.value instanceof Object
      ? Object.values(this.value)
      : this.value;
  }

  public get(): any[] {
    return this.toArray();
  }
}
