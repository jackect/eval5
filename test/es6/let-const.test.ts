import { Interpreter } from "../../src";

describe("ES6 let/const", () => {
  test("let basic declaration", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      let x = 10;
      let y = 20;
      x + y;
    `);
    expect(result).toBe(30);
  });

  test("const basic declaration", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const x = 10;
      x;
    `);
    expect(result).toBe(10);
  });

  test("const without initializer throws", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    expect(() => {
      inst.evaluate(`const x;`);
    }).toThrow();
  });

  test("const reassignment throws", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    expect(() => {
      inst.evaluate(`
        const x = 10;
        x = 20;
      `);
    }).toThrow(/constant/);
  });

  test("let block scope", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      let x = 'outer';
      {
        let x = 'inner';
      }
      x;
    `);
    expect(result).toBe("outer");
  });

  test("let in for loop creates new binding per iteration", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      var funcs = [];
      for (let i = 0; i < 3; i++) {
        funcs.push(function() { return i; });
      }
      [funcs[0](), funcs[1](), funcs[2]()];
    `);
    expect(result).toEqual([0, 1, 2]);
  });

  test("var hoisting still works", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      function test() {
        x = 5;
        var x;
        return x;
      }
      test();
    `);
    expect(result).toBe(5);
  });
});
