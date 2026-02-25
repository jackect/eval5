import { Interpreter } from "../../src";

describe("ES6 Classes", () => {
  test("basic class declaration", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      class Person {
        constructor(name) {
          this.name = name;
        }
        greet() {
          return 'Hello, ' + this.name;
        }
      }
      const p = new Person('World');
      p.greet();
    `);
    expect(result).toBe("Hello, World");
  });

  test("class with getter and setter", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      class Counter {
        constructor() {
          this._count = 0;
        }
        get count() {
          return this._count;
        }
        set count(value) {
          this._count = value;
        }
        increment() {
          this._count++;
        }
      }
      const c = new Counter();
      c.increment();
      c.increment();
      c.count;
    `);
    expect(result).toBe(2);
  });

  test("class with static method", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      class MathHelper {
        static add(a, b) {
          return a + b;
        }
      }
      MathHelper.add(3, 4);
    `);
    expect(result).toBe(7);
  });

  test("class expression", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      const MyClass = class {
        getValue() {
          return 42;
        }
      };
      const obj = new MyClass();
      obj.getValue();
    `);
    expect(result).toBe(42);
  });

  test("class extends", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      class Animal {
        constructor(name) {
          this.name = name;
        }
        speak() {
          return this.name + ' makes a sound';
        }
      }
      class Dog extends Animal {
        speak() {
          return this.name + ' barks';
        }
      }
      const d = new Dog('Rex');
      d.speak();
    `);
    expect(result).toBe("Rex barks");
  });

  test("class called without new throws", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    expect(() => {
      inst.evaluate(`
        class Foo {}
        Foo();
      `);
    }).toThrow(/without 'new'/);
  });

  test("class instanceof", () => {
    const inst = new Interpreter({}, { ecmaVersion: 6 });
    const result = inst.evaluate(`
      class Animal {}
      class Dog extends Animal {}
      const d = new Dog();
      [d instanceof Dog, d instanceof Animal];
    `);
    expect(result).toEqual([true, true]);
  });
});
