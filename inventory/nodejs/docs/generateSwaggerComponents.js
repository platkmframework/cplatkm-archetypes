const fs = require('fs');
const path = require('path');

const entitiesPath = path.join(__dirname, '../cplatkm/model');

function mapType(type) {
  const map = { string: 'string', number: 'number', boolean: 'boolean', date: 'string' };
  return map[type] || 'string';
}

function getFormat(type) {
  if (type === 'date') return 'date';
  return undefined;
}

function getPrimaryKeys(schema) {
  return Object.entries(schema)
    .filter(([_, rules]) => rules.primary)
    .map(([field]) => field);
}

function generateSchemasAndPaths() {
  const schemas = {};
  const paths = {};

  const files = fs.readdirSync(entitiesPath).filter(f => f.endsWith('.js'));

  for (const file of files) {
    const Entity = require(path.join(entitiesPath, file));
    const schema = Entity.schema;
    const entityName = Entity.name;
    const routePath = `/api/${path.parse(file).name.toLowerCase()}`;

    const properties = {};
    const required = [];

    for (const [field, rules] of Object.entries(schema)) {
      const prop = { type: mapType(rules.type) };
      const format = getFormat(rules.type);
      if (format) prop.format = format;
      if (rules.maxLength) prop.maxLength = rules.maxLength;
      if (rules.minLength) prop.minLength = rules.minLength;
      if (rules.min !== undefined) prop.minimum = rules.min;
      if (rules.max !== undefined) prop.maximum = rules.max;
      properties[field] = prop;
      if (rules.required || rules.primary) required.push(field);
    }

    schemas[entityName] = {
      type: 'object',
      properties,
      ...(required.length > 0 && { required })
    };

    const pkFields = getPrimaryKeys(schema);
    const pathId = pkFields.map(p => `{${p}}`).join('/');
    const paramDefs = pkFields.map(field => ({
      name: field,
      in: 'path',
      required: true,
      schema: { type: mapType(schema[field].type) }
    }));

    paths[routePath] = {
      get: {
        tags: [entityName],
        summary: `Listar ${entityName}`,
        parameters: [
          {
            name: 'criteria',
            in: 'query',
            required: false,
            schema: { type: 'string' },
            description: 'Filtro con condiciones tipo SQL, e.g. (name = "Juan" OR age > 30)'
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1 },
            description: 'Número máximo de resultados a devolver'
          },
          {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 0 },
            description: 'Número de resultados a omitir (paginación)'
          },
          {
            name: 'order',
            in: 'query',
            required: false,
            schema: {
              oneOf: [
                { type: 'string' },
                {
                  type: 'array',
                  items: {
                    type: 'object',
                    properties: {
                      field: { type: 'string' },
                      direction: { type: 'string', enum: ['asc', 'desc'] }
                    }
                  }
                }
              ]
            },
            description: `Ordenamiento por campos. Puede ser un string como name:asc o un array JSON. Por defecto se ordena por: ${pkFields.join(', ')}`
          }
        ],
        responses: {
          200: {
            description: 'Lista de resultados',
            content: {
              'application/json': {
                schema: { type: 'array', items: { $ref: `#/components/schemas/${entityName}` } }
              }
            }
          }
        }
      },
      post: {
        tags: [entityName],
        summary: `Crear ${entityName}`,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${entityName}` }
            }
          }
        },
        responses: {
          201: {
            description: `${entityName} creado`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${entityName}` }
              }
            }
          }
        }
      }
    };

    paths[`${routePath}/${pathId}`] = {
      get: {
        tags: [entityName],
        summary: `Obtener ${entityName} por clave primaria`,
        parameters: paramDefs,
        responses: {
          200: {
            description: 'Resultado encontrado',
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${entityName}` }
              }
            }
          },
          404: { description: 'No encontrado' }
        }
      },
      put: {
        tags: [entityName],
        summary: `Actualizar ${entityName}`,
        parameters: paramDefs,
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: { $ref: `#/components/schemas/${entityName}` }
            }
          }
        },
        responses: {
          200: {
            description: `${entityName} actualizado`,
            content: {
              'application/json': {
                schema: { $ref: `#/components/schemas/${entityName}` }
              }
            }
          }
        }
      },
      delete: {
        tags: [entityName],
        summary: `Eliminar ${entityName}`,
        parameters: paramDefs,
        responses: {
          204: { description: 'Eliminado correctamente' }
        }
      }
    };
  }

  return { schemas, paths };
}

module.exports = generateSchemasAndPaths;
