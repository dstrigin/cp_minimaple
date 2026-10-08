class MiniMaple {
    diff(expression, variable) {
        const normalizedExpression = expression.replace(/\s/g, "");

        if (/[^0-9a-zA-Z+\-*^]/.test(normalizedExpression)) {
            throw new Error("Unsupported operation");
        }

        const terms = this.parseExpression(normalizedExpression);

        const differentiatedTerms = terms
            .map(term => this.differentiateTerm(term, variable))
            .filter(term => term !== null && term.coefficient !== 0);

        return this.formatExpression(differentiatedTerms);
    }

    parseExpression(expression) {
        const signedTerms = expression.match(/[+-]?[^+-]+/g);

        if (!signedTerms || signedTerms.join("") !== expression) {
            throw new Error("Invalid expression");
        }

        return signedTerms.map(signedTerm => {
            let sign = 1;
            let termText = signedTerm;

            if (signedTerm.startsWith("+")) {
                termText = signedTerm.slice(1);
            } else if (signedTerm.startsWith("-")) {
                sign = -1;
                termText = signedTerm.slice(1);
            }

            const term = this.parseTerm(termText);

            return {
                ...term,
                coefficient: term.coefficient * sign
            };
        });
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

    differentiateTerm(term, variable) {
        if (term.variable === null || term.variable !== variable) {
            return null;
        }

        return {
            coefficient: term.coefficient * term.exponent,
            variable: term.variable,
            exponent: term.exponent - 1
        };
    }

    formatExpression(terms) {
        if (terms.length === 0) {
            return "0";
        }

        return terms
            .map((term, index) => {
                const absoluteTerm = {
                    ...term,
                    coefficient: Math.abs(term.coefficient)
                };

                const formattedTerm = this.formatTerm(absoluteTerm);
                const isNegative = term.coefficient < 0;

                if (index === 0) {
                    return isNegative
                        ? `-${formattedTerm}`
                        : formattedTerm;
                }

                return isNegative
                    ? ` - ${formattedTerm}`
                    : ` + ${formattedTerm}`;
            })
            .join("");
    }

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
