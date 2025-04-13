const pool = require('../db/postgres');

class BaseRepository {
  constructor(entityClass) {
    this.entityClass = entityClass;
    this.table = entityClass.tableName;
  }

  _getPrimaryKeyFields() {
    const schema = this.entityClass.schema;
    const pkFields = Object.entries(schema)
      .filter(([_, rules]) => rules.primary)
      .map(([key]) => key);

    if (pkFields.length === 0) {
      throw new Error(`No se ha definido ninguna clave primaria en "${this.entityClass.name}"`);
    }

    return pkFields;
  }

  async getAll() {
    const result = await pool.query(`SELECT * FROM ${this.table}`);
    return result.rows.map(row => new this.entityClass(row));
  }

  async getById(pkObject) {
    const pkFields = this._getPrimaryKeyFields();
    const keys = pkFields.map((key, i) => `${key} = $${i + 1}`);
    const values = pkFields.map(key => pkObject[key]);

    const query = `SELECT * FROM ${this.table} WHERE ${keys.join(' AND ')}`;
    const result = await pool.query(query, values);

    return result.rows.length ? new this.entityClass(result.rows[0]) : null;
  }

  async create(entity) {
    this._validate(entity);

    const keys = Object.keys(entity);
    const values = Object.values(entity);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');

    const query = `INSERT INTO ${this.table} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const result = await pool.query(query, values);
    return new this.entityClass(result.rows[0]);
  }

  async update(pkObject, entity) {
    this._validate(entity);

    const keys = Object.keys(entity);
    const values = Object.values(entity);

    const setClause = keys.map((key, i) => `${key} = $${i + 1}`).join(', ');

    const pkFields = this._getPrimaryKeyFields();
    const pkConditions = pkFields.map((key, i) => `${key} = $${keys.length + i + 1}`);
    const pkValues = pkFields.map(key => pkObject[key]);

    const query = `UPDATE ${this.table} SET ${setClause} WHERE ${pkConditions.join(' AND ')} RETURNING *`;
    const result = await pool.query(query, [...values, ...pkValues]);

    return result.rows.length ? new this.entityClass(result.rows[0]) : null;
  }

  async delete(pkObject) {
    const pkFields = this._getPrimaryKeyFields();
    const conditions = pkFields.map((key, i) => `${key} = $${i + 1}`);
    const values = pkFields.map(key => pkObject[key]);

    const query = `DELETE FROM ${this.table} WHERE ${conditions.join(' AND ')}`;
    await pool.query(query, values);

    return true;
  }

  _buildWhereClauseFromObject(condition, schema, values = [], paramIndex = { i: 1 }) {
    if (Array.isArray(condition)) {
      return condition.map(sub => `(${this._buildWhereClauseFromObject(sub, schema, values, paramIndex)})`).join(' AND ');
    }

    if (typeof condition === 'object') {
      const parts = [];

      for (const key in condition) {
        const value = condition[key];

        switch (key) {
          case "$or": {
            const subConditions = value.map(sub => `(${this._buildWhereClauseFromObject(sub, schema, values, paramIndex)})`);
            parts.push(subConditions.join(' OR '));
            break;
          }
          case "$and": {
            const subConditions = value.map(sub => `(${this._buildWhereClauseFromObject(sub, schema, values, paramIndex)})`);
            parts.push(subConditions.join(' AND '));
            break;
          }
          case "$not": {
            const sub = this._buildWhereClauseFromObject(value, schema, values, paramIndex);
            parts.push(`NOT (${sub})`);
            break;
          }
          default: {
            if (schema[key]) {
              if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                for (const op in value) {
                  const val = value[op];
                  switch (op) {
                    case "$like":
                      parts.push(`${key} LIKE $${paramIndex.i}`);
                      values.push(val);
                      paramIndex.i++;
                      break;
                    case "$gt":
                      parts.push(`${key} > $${paramIndex.i}`);
                      values.push(val);
                      paramIndex.i++;
                      break;
                    case "$lt":
                      parts.push(`${key} < $${paramIndex.i}`);
                      values.push(val);
                      paramIndex.i++;
                      break;
                    case "$in": {
                      const placeholders = val.map(() => `$${paramIndex.i++}`);
                      parts.push(`${key} IN (${placeholders.join(', ')})`);
                      values.push(...val);
                      break;
                    }
                  }
                }
              } else {
                parts.push(`${key} = $${paramIndex.i}`);
                values.push(value);
                paramIndex.i++;
              }
            }
          }
        }
      }

      return parts.join(' AND ');
    }

    return '1=1';
  }

  async criteria(condition, options = {}) {
    const schema = this.entityClass.schema;
    let whereClause = '1=1';
    const values = [];

    if (typeof condition === 'string') {
      const CriteriaParser = require('./CriteriaParser');
      const parser = new CriteriaParser(this.entityClass);
      const parsed = parser.parse(condition);
      whereClause = parsed.sql;
      values.push(...parsed.values);
    } else if (typeof condition === 'object' && condition !== null) {
      const paramIndex = { i: 1 };
      whereClause = this._buildWhereClauseFromObject(condition, schema, values, paramIndex);
    }

    let query = `SELECT * FROM ${this.table} WHERE ${whereClause}`;
console.log(query);
    let orderClause = '';
    if (options.order && options.order.length > 0) {
      let parsedOrder = [];

      if (typeof options.order === 'string') {
        try {
          parsedOrder = JSON.parse(options.order);
        } catch {
          parsedOrder = options.order.split(',').map(pair => {
            const [field, direction = 'asc'] = pair.trim().split(':');
            return { field, direction };
          });
        }
      } else if (Array.isArray(options.order)) {
        parsedOrder = options.order;
      }

      orderClause = parsedOrder
        .map(({ field, direction }) => `${field} ${direction.toUpperCase()}`)
        .join(', ');
    } else {
      const pkFields = this._getPrimaryKeyFields();
      orderClause = pkFields.map((field) => `${field} ASC`).join(', ');
    }

    query += ` ORDER BY ${orderClause}`;

    if (options.limit) {
      query += ` LIMIT ${options.limit}`;
    }

    if (options.offset) {
      query += ` OFFSET ${options.offset}`;
    }

    const result = await pool.query(query, values);
    return result.rows.map(row => new this.entityClass(row));
  }

  _validate(entity) {
    const schema = this.entityClass.schema;
    if (!schema) return;

    for (const [field, rules] of Object.entries(schema)) {
      const value = entity[field];

      if (rules.required && (value === undefined || value === null || value === '')) {
        throw new Error(`El campo "${field}" es obligatorio.`);
      }

      if (value === undefined || value === null || value === '') continue;

      const actualType = Array.isArray(value) ? 'array' :
        (rules.type === 'date' ? 'date' : typeof value);

      if (rules.type === 'date') {
        const dateValue = new Date(value);
        if (isNaN(dateValue.getTime())) {
          throw new Error(`"${field}" debe ser una fecha válida.`);
        }

        if (rules.min && dateValue < new Date(rules.min)) {
          throw new Error(`"${field}" debe ser posterior o igual a ${rules.min}.`);
        }

        if (rules.max && dateValue > new Date(rules.max)) {
          throw new Error(`"${field}" debe ser anterior o igual a ${rules.max}.`);
        }

        continue;
      }

      if (actualType !== rules.type) {
        throw new Error(`Tipo inválido para "${field}": esperado ${rules.type}, recibido ${actualType}`);
      }

      if (rules.maxLength && typeof value === 'string' && value.length > rules.maxLength) {
        throw new Error(`"${field}" excede la longitud máxima de ${rules.maxLength} caracteres.`);
      }

      if (rules.minLength && typeof value === 'string' && value.length < rules.minLength) {
        throw new Error(`"${field}" debe tener al menos ${rules.minLength} caracteres.`);
      }

      if (typeof value === 'number') {
        if (rules.min !== undefined && value < rules.min) {
          throw new Error(`"${field}" debe ser mayor o igual a ${rules.min}.`);
        }
        if (rules.max !== undefined && value > rules.max) {
          throw new Error(`"${field}" debe ser menor o igual a ${rules.max}.`);
        }
      }
    }
  }
}

module.exports = BaseRepository;
