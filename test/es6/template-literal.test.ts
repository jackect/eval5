import { Interpreter } from "../../src";

describe("ES6 Template Literals", () => {
  test("basic template literal", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate("`Hello World`");
    expect(result).toBe("Hello World");
  });

  test("template literal with expressions", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const name = 'ES6';
      const version = 6;
      \`Hello \${name}, version \${version}\`;
    `);
    expect(result).toBe("Hello ES6, version 6");
  });

  test("template literal with nested expressions", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const a = 5;
      const b = 10;
      \`Sum: \${a + b}, Product: \${a * b}\`;
    `);
    expect(result).toBe("Sum: 15, Product: 50");
  });

  test("template literal multiline", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      \`Line 1
Line 2
Line 3\`;
    `);
    expect(result).toBe("Line 1\nLine 2\nLine 3");
  });

  test("tagged template literal", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      function tag(strings, ...values) {
        return strings[0] + values[0] + strings[1] + values[1] + strings[2];
      }
      const a = 1;
      const b = 2;
      tag\`a=\${a}, b=\${b}!\`;
    `);
    expect(result).toBe("a=1, b=2!");
  });
});
