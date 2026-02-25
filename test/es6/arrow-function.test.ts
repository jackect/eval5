import { Interpreter } from "../../src";

describe("ES6 Arrow Functions", () => {
  test("basic arrow function with expression body", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const add = (a, b) => a + b;
      add(2, 3);
    `);
    expect(result).toBe(5);
  });

  test("arrow function with block body", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const multiply = (a, b) => {
        return a * b;
      };
      multiply(4, 5);
    `);
    expect(result).toBe(20);
  });

  test("arrow function with single parameter (no parens)", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const double = x => x * 2;
      double(7);
    `);
    expect(result).toBe(14);
  });

  test("arrow function captures outer this", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const obj = {
        value: 42,
        getValue: function() {
          const arrow = () => this.value;
          return arrow();
        }
      };
      obj.getValue();
    `);
    expect(result).toBe(42);
  });

  test("arrow function with default parameters", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const greet = (name = 'World') => 'Hello, ' + name;
      [greet(), greet('ES6')];
    `);
    expect(result).toEqual(["Hello, World", "Hello, ES6"]);
  });

  test("arrow function with rest parameters", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const sum = (...nums) => nums.reduce((a, b) => a + b, 0);
      sum(1, 2, 3, 4, 5);
    `);
    expect(result).toBe(15);
  });
});
