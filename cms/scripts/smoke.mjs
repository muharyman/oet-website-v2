import { readFileSync } from 'node:fs'

const env = Object.fromEntries(
  readFileSync(new URL('../.env', import.meta.url), 'utf8')
    .split(/\r?\n/)
    .filter((line) => line.includes('='))
    .map((line) => [line.slice(0, line.indexOf('=')), line.slice(line.indexOf('=') + 1)]),
)

const call = async (method, path, token, body) => {
  const response = await fetch(`${env.PUBLIC_URL}${path}`, {
    method,
    headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
    body: body ? JSON.stringify(body) : undefined,
  })
  const raw = await response.text()
  if (!response.ok) throw new Error(`${method} ${path} → ${response.status} ${raw}`)
  return raw ? JSON.parse(raw).data : null
}

const { access_token: token } = await call('POST', '/auth/login', null, {
  email: env.ADMIN_EMAIL,
  password: env.ADMIN_PASSWORD,
})

const tag = await call('POST', '/items/tags', token, {
  slug: 'smoke-test',
  translations: [{ languages_code: 'en', name: 'Smoke test' }],
})
const project = await call('POST', '/items/projects', token, {
  status: 'published',
  start_date: '2026-01-01',
  project_status: 'completed',
  tags: [{ tags_id: tag.id }],
  highlights: [{ translations: [{ languages_code: 'en', text: 'First highlight' }] }],
  translations: [{ languages_code: 'en', title: 'Smoke project', slug: 'smoke-project', excerpt: 'Excerpt' }],
})
const read = await call(
  'GET',
  `/items/projects/${project.id}?fields=id,status,translations.title,translations.languages_code,tags.tags_id.translations.name,highlights.translations.text`,
  token,
)
console.log(JSON.stringify(read))
await call('DELETE', `/items/projects/${project.id}`, token)
await call('DELETE', `/items/tags/${tag.id}`, token)
console.log('smoke test passed, test rows removed')
