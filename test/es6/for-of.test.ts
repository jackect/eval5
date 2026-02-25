import { Interpreter } from "../../src";

describe("ES6 for...of", () => {
  test("for...of with array", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const arr = [1, 2, 3];
      let sum = 0;
      for (const item of arr) {
        sum += item;
      }
      sum;
    `);
    expect(result).toBe(6);
  });

  test("for...of with string", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const str = 'abc';
      let chars = [];
      for (const char of str) {
        chars.push(char);
      }
      chars;
    `);
    expect(result).toEqual(["a", "b", "c"]);
  });

  test("for...of with let creates new binding", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const funcs = [];
      for (let x of [1, 2, 3]) {
        funcs.push(() => x);
      }
      [funcs[0](), funcs[1](), funcs[2]()];
    `);
    expect(result).toEqual([1, 2, 3]);
  });

  test("for...of with destructuring", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const entries = [[1, 'a'], [2, 'b'], [3, 'c']];
      let keys = [];
      let values = [];
      for (const [k, v] of entries) {
        keys.push(k);
        values.push(v);
      }
      [keys, values];
    `);
    expect(result).toEqual([[1, 2, 3], ["a", "b", "c"]]);
  });

  test("for...of with break", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const arr = [1, 2, 3, 4, 5];
      let sum = 0;
      for (const item of arr) {
        if (item > 3) break;
        sum += item;
      }
      sum;
    `);
    expect(result).toBe(6);
  });

  test("for...of with continue", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const arr = [1, 2, 3, 4, 5];
      let sum = 0;
      for (const item of arr) {
        if (item % 2 === 0) continue;
        sum += item;
      }
      sum;
    `);
    expect(result).toBe(9);
  });
});
