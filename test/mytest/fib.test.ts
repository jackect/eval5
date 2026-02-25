import { Interpreter } from "../../src";

describe("Fibonacci sequence tests", () => {
    const interpreter = new Interpreter();
    
    test("should generate first 10 fibonacci numbers correctly", () => {
        const code = `function fib(n) {
            if (n <= 1) return n;
            let a = 0,
                b = 1;
            for (let i = 2; i <= n; i++) {
                [a, b] = [b, a + b];
            }
            return b;
        }
        Array.from({length:10},(n,i)=>fib(i+1))
        `;
        const result = interpreter.evaluate(code);
        expect(result).toEqual([1, 1, 2, 3, 5, 8, 13, 21, 34, 55]);
    });
});