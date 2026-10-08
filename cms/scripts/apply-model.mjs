import { readFileSync, writeFileSync } from 'node:fs'
import { collections, languages } from './model.mjs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.includes('='))
    .map((line) => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]),
)

const base = env.PUBLIC_URL
let token

const api = async (method, path, body) => {
  const response = await fetch(`${base}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  })
  const raw = await response.text()
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status} ${raw}`)
  return raw ? JSON.parse(raw).data : null
}

const login = await api('POST', '/auth/login', {
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
})
token = login.access_token

const existingCollections = new Set((await api('GET', '/collections')).map((c) => c.collection))
const existingFields = new Set(
  (await api('GET', '/fields')).map((field) => `${field.collection}.${field.field}`),
)
const existingRelations = new Set(
  (await api('GET', '/relations')).map((relation) => `${relation.collection}.${relation.field}`),
)

const idField = {
  field: 'id',
  type: 'integer',
  meta: { hidden: true, interface: 'input', readonly: true },
  schema: { is_primary_key: true, has_auto_increment: true },
}

const scalarField = (name, definition) => ({
  field: name,
  type: definition.type,
  meta: {
    interface: definition.interface,
    required: definition.required === true,
    options: definition.choices
      ? { choices: definition.choices.map((value) => ({ text: value, value })) }
      : null,
    validation:
      definition.type === 'text' && definition.max
        ? { _and: [{ [name]: { _regex: `^[\\s\\S]{0,${definition.max}}$` } }] }
        : null,
  },
  schema: {
    is_unique: definition.unique === true,
    ...(definition.type === 'string' && definition.max ? { max_length: definition.max } : {}),
    ...(definition.default === undefined ? {} : { default_value: definition.default }),
  },
})

const statusField = scalarField('status', {
  type: 'string',
  interface: 'select-dropdown',
  choices: ['draft', 'published', 'archived'],
  required: true,
  default: 'draft',
})

const sortField = {
  field: 'sort',
  type: 'integer',
  meta: { hidden: true, interface: 'input' },
  schema: {},
}

const createCollection = async (name, fields, meta) => {
  if (existingCollections.has(name)) return
  await api('POST', '/collections', { collection: name, meta, schema: {}, fields })
  existingCollections.add(name)
  for (const field of fields) existingFields.add(`${name}.${field.field}`)
  console.log(`collection ${name}`)
}

const createField = async (collection, field) => {
  const key = `${collection}.${field.field}`
  if (existingFields.has(key)) return
  await api('POST', `/fields/${collection}`, field)
  existingFields.add(key)
}

const createRelation = async (relation) => {
  const key = `${relation.collection}.${relation.field}`
  if (existingRelations.has(key)) return
  await api('POST', '/relations', relation)
  existingRelations.add(key)
}

const scalarFields = (definitions = {}) =>
  Object.entries(definitions).map(([name, definition]) => scalarField(name, definition))

await createCollection(
  'languages',
  [
    {
      field: 'code',
      type: 'string',
      meta: { interface: 'input', required: true },
      schema: { is_primary_key: true, max_length: 10 },
    },
    scalarField('name', { type: 'string', interface: 'input', required: true }),
    scalarField('direction', {
      type: 'string',
      interface: 'select-dropdown',
      choices: ['ltr', 'rtl'],
      required: true,
      default: 'ltr',
    }),
    scalarField('is_default', { type: 'boolean', interface: 'boolean', default: false }),
    scalarField('enabled', { type: 'boolean', interface: 'boolean', default: true }),
  ],
  { icon: 'translate' },
)

const storedLanguages = new Set((await api('GET', '/items/languages')).map((item) => item.code))
for (const language of languages) {
  if (!storedLanguages.has(language.code)) await api('POST', '/items/languages', language)
}

for (const [name, definition] of Object.entries(collections)) {
  await createCollection(
    name,
    [
      idField,
      ...(definition.status ? [statusField] : []),
      ...(definition.sort ? [sortField] : []),
      ...scalarFields(definition.fields),
    ],
    {
      singleton: definition.singleton === true,
      sort_field: definition.sort ? 'sort' : null,
      archive_field: definition.status ? 'status' : null,
      archive_value: definition.status ? 'archived' : null,
      unarchive_value: definition.status ? 'draft' : null,
    },
  )
  if (definition.translated) {
    await createCollection(`${name}_translations`, [idField, ...scalarFields(definition.translated)], {
      hidden: true,
    })
  }
}

const manyToOne = async (collection, field, related, options = {}) => {
  await createField(collection, {
    field,
    type: related === 'directus_files' ? 'uuid' : related === 'languages' ? 'string' : 'integer',
    meta: {
      interface: related === 'directus_files' ? 'file' : 'select-dropdown-m2o',
      special: [related === 'directus_files' ? 'file' : 'm2o'],
      required: options.required === true,
      hidden: options.hidden === true,
    },
    schema: {},
  })
  await createRelation({
    collection,
    field,
    related_collection: related,
    meta: {
      one_field: options.oneField ?? null,
      junction_field: options.junctionField ?? null,
      sort_field: options.sortField ?? null,
      one_deselect_action: options.cascade ? 'delete' : 'nullify',
    },
    schema: { on_delete: options.cascade ? 'CASCADE' : 'SET NULL' },
  })
}

const alias = (collection, field, special, interfaceName, options = null) =>
  createField(collection, {
    field,
    type: 'alias',
    meta: { interface: interfaceName, special: [special], options },
  })

const manyToMany = async (collection, field, related, special, interfaceName) => {
  const junction = `${collection}_${field}`
  const ownKey = `${collection}_id`
  const relatedKey = related === collection ? `related_${related}_id` : `${related}_id`
  await createCollection(junction, [idField, sortField], { hidden: true })
  await manyToOne(junction, ownKey, collection, {
    hidden: true,
    cascade: true,
    oneField: field,
    junctionField: relatedKey,
    sortField: 'sort',
  })
  await manyToOne(junction, relatedKey, related, {
    hidden: true,
    cascade: true,
    junctionField: ownKey,
  })
  await alias(collection, field, special, interfaceName)
}

for (const [name, definition] of Object.entries(collections)) {
  for (const [field, options] of Object.entries(definition.files ?? {})) {
    await manyToOne(name, field, 'directus_files', options)
  }
  for (const [field, related] of Object.entries(definition.m2o ?? {})) {
    await manyToOne(name, field, related)
  }
  for (const [field, child] of Object.entries(definition.o2m ?? {})) {
    await manyToOne(child, `${name}_id`, name, {
      hidden: true,
      cascade: true,
      oneField: field,
      sortField: 'sort',
    })
    await alias(name, field, 'o2m', 'list-o2m')
  }
  for (const [field, related] of Object.entries(definition.m2m ?? {})) {
    await manyToMany(name, field, related, 'm2m', 'list-m2m')
  }
  for (const field of definition.fileLists ?? []) {
    await manyToMany(name, field, 'directus_files', 'files', 'files')
  }
  if (definition.translated) {
    const translations = `${name}_translations`
    await manyToOne(translations, `${name}_id`, name, {
      hidden: true,
      cascade: true,
      oneField: 'translations',
      junctionField: 'languages_code',
    })
    await manyToOne(translations, 'languages_code', 'languages', {
      hidden: true,
      junctionField: `${name}_id`,
    })
    await alias(name, 'translations', 'translations', 'translations', { languageField: 'name' })
  }
}

const snapshot = await fetch(`${base}/schema/snapshot?export=yaml`, {
  headers: { Authorization: `Bearer ${token}` },
})
if (!snapshot.ok) throw new Error(`schema snapshot → ${snapshot.status} ${await snapshot.text()}`)
writeFileSync(new URL('../schema.yaml', import.meta.url), await snapshot.text())

console.log(`done: ${existingCollections.size} collections, snapshot written to cms/schema.yaml`)
