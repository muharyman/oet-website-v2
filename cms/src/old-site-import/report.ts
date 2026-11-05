import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'

export interface Entry {
  area: string
  title: string
  action: 'created' | 'updated'
  status: 'published' | 'draft' | 'none'
  notes: string[]
}

const entries: Entry[] = []

export const record = (entry: Entry) => {
  entries.push(entry)
}

const row = (entry: Entry) =>
  `| ${entry.title.replaceAll('|', '/')} | ${entry.action} | ${entry.status} | ${entry.notes.join('; ')} |`

export const writeReport = async (file: string) => {
  const areas = [...new Set(entries.map((entry) => entry.area))]
  const sections = areas.map((area) => {
    const rows = entries.filter((entry) => entry.area === area)
    return [
      `## ${area}`,
      '',
      `${rows.length} documents: ${rows.filter((entry) => entry.action === 'created').length} created, ${rows.filter((entry) => entry.status === 'draft').length} saved as draft.`,
      '',
      '| Document | Action | Status | Notes |',
      '| --- | --- | --- | --- |',
      ...rows.map(row),
    ].join('\n')
  })
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(
    file,
    `${[`# Old site import report`, `Run on ${new Date().toISOString()}.`, ...sections].join('\n\n')}\n`,
  )
}
