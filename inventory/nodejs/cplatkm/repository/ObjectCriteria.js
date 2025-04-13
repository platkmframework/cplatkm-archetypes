class ObjectCriteria {
    
    constructor(entity) {
      this.entity = entity; 
    }

    async parse(criteria, index = { count: 1 }) {
        if (Array.isArray(criteria)) {
            const conditions = criteria.map((item) => {
            const { sql, values } = this._parseCriteria(item, index);
            return `(${sql})`;
            });
            return { sql: conditions.join(' AND '), values: conditions.flatMap((_, i) => criteria[i].values || []) };
        } else if (typeof criteria === 'object') {
            const conditions = [];
            const values = [];

            for (const [key, value] of Object.entries(criteria)) {
            if (key === '$or' || key === '$and') {
                const subConditions = value.map((subCriterion) => this._parseCriteria(subCriterion, index));
                const operator = key === '$or' ? 'OR' : 'AND';
                conditions.push(`(${subConditions.map((sc) => sc.sql).join(` ${operator} `)})`);
                values.push(...subConditions.flatMap((sc) => sc.values));
            } else if (typeof value === 'object' && value !== null) {
                for (const [operator, val] of Object.entries(value)) {
                let sqlOperator = operator;
                let sqlPlaceholder = `$${index.count++}`;

                if (operator === '$like') sqlOperator = 'LIKE';
                else if (operator === '$gt') sqlOperator = '>';
                else if (operator === '$lt') sqlOperator = '<';
                else if (operator === '$in' && Array.isArray(val)) {
                    sqlOperator = 'IN';
                    sqlPlaceholder = `(${val.map(() => `$${index.count++}`).join(', ')})`;
                    values.push(...val);
                } else {
                    values.push(val);
                }

                conditions.push(`${key} ${sqlOperator} ${sqlPlaceholder}`);
                }
            } else {
                conditions.push(`${key} = $${index.count++}`);
                values.push(value);
            }
            }

            return { sql: conditions.join(' AND '), values };
        } else {
            throw new Error('Formato de criterio inválido');
        }
    }

}