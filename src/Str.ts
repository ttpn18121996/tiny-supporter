import { typeOf } from '.';

export type RandomOptions = {
  includeUppercase?: boolean;
  includeNumbers?: boolean;
  includeSymbols?: boolean;
};

export default class Str {
  private value: string;

  constructor(value: string) {
    this.value = this.caseString(value);
  }

  public length(): number {
    return this.value.length;
  }

  public after(search: string): this | string {
    if (this.value === '') {
      return this.value;
    }

    this.value = this.value
      .split(search)
      .filter((word: string, position: number) => {
        return position > 0;
      })
      .join(search);

    return this;
  }
  
  public afterLast(search: string): this | string {
    if (this.value === '') {
      return this.value;
    }
    this.value = this.value.split(search).reverse()[0];

    return this;

  }

  public before(search: string): this | string {
    if (this.value === '') {
      return this.value;
    }
    this.value = this.value.split(search, 1).join('');

    return this;
  }

  public beforeLast(search: string): this | string {
    if (this.value === '') {
      return this.value;
    }
    this.value = this.value
      .split(search)
      .filter((word: string, position: number) => {
        return position < word.length - 1;
      })
      .join(search);

    return this;
  }

  public bind(...args: any[]): this {
    let valueBound: string = this.value;

    if (Array.isArray(args?.[0])) {
      for (let i = 0; i < args[0].length; i++) {
        valueBound = valueBound.replace(/\{(\d+)\}/, args[0][i]);
      }
    } else if (typeOf(args[0]) === 'object') {
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
    } else {
      valueBound = valueBound.replace(/{(\d+)}/g, (match, number) =>
        typeof args[number] != 'undefined' ? args[number] : match
      );
    }

    this.value = valueBound;

    return this;
  }

  public toString(): string {
    return this.value
  }

  public get(start = 0, end = 0): string {
    if (end > 0) {
      return this.toString().substring(start, end);
    }

    return this.toString();
  }

  public append(...values: string[]): this {
    this.value += values.join('');
    return this;
  }

  public prepend(...values: string[]): this {
    this.value = values.join('') + this.value;
    return this;
  }

  public title(): this {
    this.value = this.value
      .replace(/[\s\-_\.]+/g, ' ')
      .replace(/[a-zA-Z0-9]+[\S\-_]*/g, match => match.charAt(0).toUpperCase() + match.substring(1).toLowerCase());

      return this;
  }

  public studly(): this {
    this.value = this.title().get().replace(/\s/g, '');

    return this;
  }

  public camel(): this {
    this.value = this.studly()
      .get()
      .replace(/^(.)/, (match, p1) => p1.toLowerCase());

    return this;
  }

  public lower(): this {
    this.value = this.value.toLowerCase();

    return this;
  }

  public upper(): this {
    this.value = this.value.toUpperCase();
    
    return this;
  }

  public nonUnicode(): this {
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

  public snake(delimiter = '_'): this {
    this.value = this.nonUnicode()
      .get()
      .replace(/[A-Z]/g, match => delimiter + match.toLocaleLowerCase())
      .replace(/[\s]+/g, '')
      .replace(new RegExp('^' + delimiter), '');

    return this;
  }

  public kebab(): this {
    this.snake('-');

    return this;
  }

  public escapeHtml(): this {
    this.value = this.value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
    
      return this;
  }

  public limit(length = 100): this {
    if (this.value.length <= length) {
      return this;
    }
    let result: string = '';
    for (const word of this.value.split(' ')) {
      const tmp = result + word.trim().replace(/\r?\n|\r| /g, ' ').replace(/\s\s+/g, ' ') + ' ';
      if (tmp.length <= length - 4) {
        result = tmp;
      }
    }

    this.value = result + '...';

    return this;
  }

  private arrayFromLowToHigh(low: number, high: number) {
    let result: number[] = [];
    for (let i = low; i <= high; i++) {
      result.push(i);
    }

    return result;
  }

  public random(length = 16, options: RandomOptions = {}): string {
    const UPPERCASE_CHAR_CODES = this.arrayFromLowToHigh(65, 90);
    const LOWCASE_CHAR_CODES = this.arrayFromLowToHigh(97, 122);
    const NUMBER_CHAR_CODES = this.arrayFromLowToHigh(48, 57);
    const SYMBOL_CHAR_CODES = this.arrayFromLowToHigh(33, 47).concat(
      this.arrayFromLowToHigh(58, 64).concat(
        this.arrayFromLowToHigh(91, 96).concat(this.arrayFromLowToHigh(123, 126))
      )
    );
    let charCodes = LOWCASE_CHAR_CODES;
    if (options.includeUppercase) charCodes = charCodes.concat(UPPERCASE_CHAR_CODES);
    if (options.includeNumbers) charCodes = charCodes.concat(NUMBER_CHAR_CODES);
    if (options.includeSymbols) charCodes = charCodes.concat(SYMBOL_CHAR_CODES);
    const result = [];
    for (let i = 0; i < length; i++) {
      const character = charCodes[Math.floor(Math.random() * charCodes.length)];
      result.push(String.fromCharCode(character));
    }

    return result.join('');
  }

  public replace(regexp: RegExp, replacer: string): this {
    this.value = this.value.replace(regexp, replacer);

    return this;
  }

  public slice(start?: number, end?: number) {
    this.value = this.value.slice(start, end);

    return this;
  }

  public padStart(length: number, char: string): this {
    this.value = this.value.padStart(length, char);

    return this;
  }
  
  public padEnd(length: number, char: string): this {
    this.value = this.value.padEnd(length, char);

    return this;
  }

  public caseString(value: any): string {
    return typeof value === 'object' &&
      (value.hasOwnProperty('toString') || value.toString === Object.prototype.toString)
      ? value.toString()
      : `${value}`;
  }
}
