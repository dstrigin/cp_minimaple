import { MiniMaple } from "./miniMaple";

document.addEventListener("DOMContentLoaded", setup);

function setup() {
    const form = document.getElementById("diffForm");
    const input = document.getElementById("expressionInput");
    const result = document.getElementById("result");
    const miniMaple = new MiniMaple();

    form.addEventListener("submit", event => {
        event.preventDefault();

        try {
            const { expression, variable } = parseInput(input.value);
            result.textContent = miniMaple.diff(expression, variable);
        } catch (error) {
            result.textContent = error.message;
        }
    });
}

function parseInput(value) {
    const parts = value.split(",");

    if (parts.length !== 2) {
        throw new Error("Use the format: polynomial, variable");
    }

    const expression = parts[0].trim();
    const variable = parts[1].trim();

    if (!expression || !variable) {
        throw new Error("Enter both a polynomial and a variable");
    }

    if (!/^[a-zA-Z]+$/.test(variable)) {
        throw new Error("The differentiation variable must contain only letters");
    }

    return { expression, variable };
}

export { parseInput };
