import { sql } from '@vercel/postgres'
import fs from 'fs'
import path from 'path'

export { sql }

export async function query<T = any>(query: string, params?: any[]): Promise<T[]> {
  const result = await sql.query(query, params)
  return result.rows
}

export async function ensureSchema(): Promise<void> {
  const schemaPath = path.join(process.cwd(), 'src/lib/schema.sql')
  const schema = fs.readFileSync(schemaPath, 'utf8')
  await sql.query(schema)
}

export async function seedDecks(): Promise<void> {
  const seedPath = path.join(process.cwd(), 'src/lib/seed.sql')
  const seed = fs.readFileSync(seedPath, 'utf8')
  await sql.query(seed)
}
