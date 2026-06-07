import * as SQLite from 'expo-sqlite'
 
let db: SQLite.SQLiteDatabase | null = null
 
export async function getDB() {
  if (!db) {
    db = await SQLite.openDatabaseAsync('mudadepois.db')
 
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id        INTEGER PRIMARY KEY AUTOINCREMENT,
        nome      TEXT NOT NULL,
        email     TEXT NOT NULL UNIQUE,
        senha     TEXT NOT NULL,
        cpf       TEXT NOT NULL,
        rg        TEXT NOT NULL,
        dataNasc  TEXT NOT NULL,
        foto      TEXT
      );
    `)
  }
 
  return db
}