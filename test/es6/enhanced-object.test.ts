import { Interpreter } from "../../src";

describe("ES6 Enhanced Object Literals", () => {
  test("shorthand property", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const x = 1;
      const y = 2;
      const obj = { x, y };
      obj;
    `);
    expect(result).toEqual({ x: 1, y: 2 });
  });

  test("computed property name", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const key = 'dynamicKey';
      const obj = {
        [key]: 'value',
        ['computed' + 1]: 'another'
      };
      obj;
    `);
    expect(result).toEqual({ dynamicKey: "value", computed1: "another" });
  });

  test("shorthand method", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const obj = {
        greet() {
          return 'Hello';
        }
      };
      obj.greet();
    `);
    expect(result).toBe("Hello");
  });

  test("shorthand method with this", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const obj = {
        value: 42,
        getValue() {
          return this.value;
        }
      };
      obj.getValue();
    `);
    expect(result).toBe(42);
  });

  test("getter and setter", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const obj = {
        _value: 0,
        get value() {
          return this._value;
        },
        set value(v) {
          this._value = v * 2;
        }
      };
      obj.value = 5;
      obj.value;
    `);
    expect(result).toBe(10);
  });

  test("combined features", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const name = 'test';
      const prefix = 'fn';
      const obj = {
        name,
        [prefix + 'Sum'](a, b) {
          return a + b;
        }
      };
      [obj.name, obj.fnSum(3, 4)];
    `);
    expect(result).toEqual(["test", 7]);
  });
});
