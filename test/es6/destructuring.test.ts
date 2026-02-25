import { Interpreter } from "../../src";

describe("ES6 Destructuring", () => {
  test("array destructuring basic", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const [a, b, c] = [1, 2, 3];
      [a, b, c];
    `);
    expect(result).toEqual([1, 2, 3]);
  });

  test("array destructuring with skip", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const [a, , c] = [1, 2, 3];
      [a, c];
    `);
    expect(result).toEqual([1, 3]);
  });

  test("array destructuring with rest", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const [first, ...rest] = [1, 2, 3, 4, 5];
      [first, rest];
    `);
    expect(result).toEqual([1, [2, 3, 4, 5]]);
  });

  test("array destructuring with default values", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const [a, b = 10] = [1];
      [a, b];
    `);
    expect(result).toEqual([1, 10]);
  });

  test("object destructuring basic", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const { x, y } = { x: 1, y: 2 };
      [x, y];
    `);
    expect(result).toEqual([1, 2]);
  });

  test("object destructuring with rename", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const { x: a, y: b } = { x: 1, y: 2 };
      [a, b];
    `);
    expect(result).toEqual([1, 2]);
  });

  test("object destructuring with default values", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const { x, y = 10 } = { x: 1 };
      [x, y];
    `);
    expect(result).toEqual([1, 10]);
  });

  test("nested destructuring", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const { a: { b: { c } } } = { a: { b: { c: 42 } } };
      c;
    `);
    expect(result).toBe(42);
  });

  test("destructuring in function parameters", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      function getCoords({ x, y }) {
        return x + ',' + y;
      }
      getCoords({ x: 10, y: 20 });
    `);
    expect(result).toBe("10,20");
  });

  test("destructuring assignment", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      let a, b;
      [a, b] = [1, 2];
      [a, b];
    `);
    expect(result).toEqual([1, 2]);
  });
});
