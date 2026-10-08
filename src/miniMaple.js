class MiniMaple {
    diff(expression, variable) {
        const normalizedExpression = expression.replace(/\s/g, "");

        if (/[^0-9a-zA-Z+\-*^]/.test(normalizedExpression)) {
            throw new Error("Unsupported operation");
        }

        const term = this.parseTerm(normalizedExpression);

        if ((term.variable === null) || (term.variable !== variable)) {
            return "0";
        }

        const newTerm = {
            coefficient: term.coefficient * term.exponent,
            variable: term.variable,
            exponent: term.exponent - 1
        };

        return this.formatTerm(newTerm);
    }

    parseTerm(expression) {
        if (/^\d+$/.test(expression)) {
            return {
                coefficient: Number(expression),
                variable: null,
                exponent: 0
            };
        }

        const match = expression.match(
            /^(?:(\d+)\*)?([a-zA-Z]+)(?:\^(\d+))?$/
        );

        if (!match) {
            throw new Error("Expression is not supported yet");
        }

        return {
            coefficient: match[1] ? Number(match[1]) : 1,
            variable: match[2],
            exponent: match[3] ? Number(match[3]) : 1
        };
    }
        // A number by itself is a constant.

    formatTerm(term) {
        if (term.exponent === 0) {
            return String(term.coefficient);
        }

        const variablePart = term.exponent === 1
            ? term.variable
            : `${term.variable}^${term.exponent}`;

        if (term.coefficient === 1) {
            return variablePart;
        }

        return `${term.coefficient}*${variablePart}`;
    }
}

export { MiniMaple };
