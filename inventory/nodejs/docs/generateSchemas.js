const fs = require('fs');
const path = require('path');

const entitiesPath = path.join(__dirname, '../cplatkm/model');

function mapType(type) {
  console.log(type)
  const map = {
    string: 'string',
    number: 'number',
    boolean: 'boolean',
    date: 'string'
  };
  return map[type] || 'string';
}

function getFormat(type) {
  if (type === 'date') return 'date';
  return undefined;
}

function generateSchemas() {
  const schemaComponents = {};

  const files = fs.readdirSync(entitiesPath).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const entityModule = require(path.join(entitiesPath, file));
    const entityName = entityModule.name;
    const schema = entityModule.schema;

    if (!schema) continue;

    const properties = {};
    const required = [];

    for (const [field, rules] of Object.entries(schema)) {
      const prop = {
        type: mapType(rules.type)
      };

      const format = getFormat(rules.type);
      if (format) prop.format = format;

      if (rules.maxLength) prop.maxLength = rules.maxLength;
      if (rules.minLength) prop.minLength = rules.minLength;
      if (rules.minimum || rules.min) prop.minimum = rules.minimum ?? rules.min;
      if (rules.maximum || rules.max) prop.maximum = rules.maximum ?? rules.max;

      properties[field] = prop;

      if (rules.required || rules.primary) {
        required.push(field);
      }
    }

    schemaComponents[entityName] = {
      type: 'object',
      properties,
      ...(required.length > 0 && { required })
    };
  }

  return schemaComponents;
}

module.exports = generateSchemas;
