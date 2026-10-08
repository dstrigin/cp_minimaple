class MiniMaple{
    diff(expression, variable) {
        const normalizedExpression = expression.replace(/\s/g, "");

        const match = normalizedExpression.match(
            /^(\d+)\*([a-zA-Z]+)\^(\d+)$/
        );

        if (!match) {
            throw new Error("Expression is not supported yet");
        }

        const coefficient = Number(match[1]);
        const expressionVariable = match[2];
        const exponent = Number(match[3]);

        if (expressionVariable !== variable) {
            return "0";
        }

        const newCoefficient = coefficient * exponent;
        const newExponent = exponent - 1;

        return `${newCoefficient}*${expressionVariable}^${newExponent}`;
    }
}

export {MiniMaple}