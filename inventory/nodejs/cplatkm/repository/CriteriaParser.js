class CriteriaParser {
    constructor(entity) {
      this.entity = entity;
      this.allowedFields = Object.keys(entity.schema);
      this.parameters = [];
      this.paramIndex = 1;
    }
  
    parse(conditionString) {
      const parsedCondition = conditionString.replace(
        /([a-zA-Z_][a-zA-Z0-9_]*)\s*(=|>|<|>=|<=|!=|LIKE|IN)\s*('[^']*'|\d+|\([^)]+\))/g,
        (match, field, operator, value) => {
          if (!this.entity.allowedFields.includes(field)) {
            throw new Error(`Campo inválido: ${field}`);
          }
  
          let paramPlaceholder = `$${this.paramIndex++}`;
          let formattedValue = value;
  
          if (value.startsWith('(')) {
            // Convertir valores de IN en una lista de parámetros
            const values = value
              .slice(1, -1)
              .split(',')
              .map((v) => v.trim().replace(/'/g, ''));
            this.parameters.push(...values);
            paramPlaceholder = `(${values.map(() => `$${this.paramIndex++ - 1}`).join(', ')})`;
          } else {
            this.parameters.push(value.replace(/'/g, ''));
          }
  
          return `${field} ${operator} ${paramPlaceholder}`;
        }
      );
  
      return { sql: parsedCondition, values: this.parameters };
    }
  }
  
  module.exports = CriteriaParser;
  