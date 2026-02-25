import { Interpreter } from "../../src";

describe("ES6 Spread/Rest Operators", () => {
  test("spread in array literal", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const arr1 = [1, 2, 3];
      const arr2 = [...arr1, 4, 5];
      arr2;
    `);
    expect(result).toEqual([1, 2, 3, 4, 5]);
  });

  test("spread in middle of array", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const middle = [3, 4];
      const arr = [1, 2, ...middle, 5, 6];
      arr;
    `);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test("spread in function call", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      function sum(a, b, c) {
        return a + b + c;
      }
      const args = [1, 2, 3];
      sum(...args);
    `);
    expect(result).toBe(6);
  });

  // Object spread requires ecmaVersion 9 (ES2018)
  test("spread in object literal", () => {
    const inst = new Interpreter({}, { ecmaVersion: 9 });
    const result = inst.evaluate(`
      const obj1 = { a: 1, b: 2 };
      const obj2 = { ...obj1, c: 3 };
      obj2;
    `);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test("spread object override", () => {
    const inst = new Interpreter({}, { ecmaVersion: 9 });
    const result = inst.evaluate(`
      const obj1 = { a: 1, b: 2 };
      const obj2 = { ...obj1, b: 10 };
      obj2;
    `);
    expect(result).toEqual({ a: 1, b: 10 });
  });

  test("rest parameters in function", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      function collect(first, ...rest) {
        return [first, rest];
      }
      collect(1, 2, 3, 4, 5);
    `);
    expect(result).toEqual([1, [2, 3, 4, 5]]);
  });
});
