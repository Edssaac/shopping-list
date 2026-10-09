import { mkdirSync } from 'node:fs'
import { dirname } from 'node:path'
import { DatabaseSync } from 'node:sqlite'

const databasePath = './core/infrastructure/database/database.db'

mkdirSync(dirname(databasePath), { recursive: true })

const database = new DatabaseSync(databasePath)

database.close()

console.log('Banco de dados inicializado.')