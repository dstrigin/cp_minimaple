import { MiniMaple } from "../src/miniMaple";

describe("MiniMaple", () => {
    let miniMaple;

    beforeEach(() => {
        miniMaple = new MiniMaple();
    });

    test("differentiates a monomial", () => {
        expect(miniMaple.diff("4*x^3", "x")).toBe("12*x^2");
    });

    test("returns zero when the expression does not contain the variable", () => {
        expect(miniMaple.diff("4*x^3", "y")).toBe("0");
    });

    test("differentiates subtraction term by term", () => {
        expect(
            miniMaple.diff("4*x^3-x^2", "x")
        ).toBe("12*x^2 - 2*x");
    });

    test("differentiates a constant", () => {
        expect(miniMaple.diff("7", "x")).toBe("0");
    });

    test("differentiates the variable itself", () => {
        expect(miniMaple.diff("x", "x")).toBe("1");
    });

    test("handles addition", () => {
        expect(miniMaple.diff("x^2+3*x", "x")).toBe("2*x + 3");
    });

    test("ignores whitespace", () => {
        expect(miniMaple.diff(" 4 * x ^ 3 ", "x")).toBe("12*x^2");
    });

    test("rejects division", () => {
        expect(() => miniMaple.diff("x/2", "x"))
            .toThrow("Unsupported operation");
    });

    test("coefficient and variable", () => {
        expect(miniMaple.diff("3 * x", "x")).toBe("3");
    });

    test("removes constants from a polynomial derivative", () => {
        expect(miniMaple.diff("x^2+7", "x")).toBe("2*x");
    });

    test("removes terms containing unrelated variables", () => {
        expect(miniMaple.diff("x^2+y^2", "x")).toBe("2*x");
    });

    test("handles a negative first term", () => {
        expect(miniMaple.diff("-x^2+x", "x")).toBe("-2*x + 1");
    });
});
