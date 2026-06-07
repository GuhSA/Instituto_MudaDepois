import { SQLiteDatabase } from 'expo-sqlite'
import { Usuario } from '../types/Usuario'
 
export async function listarUsuarios(db: SQLiteDatabase): Promise<Usuario[]> {
  return db.getAllAsync<Usuario>('SELECT * FROM usuarios;')
}
 
export async function buscarUsuarioPorId(
  db: SQLiteDatabase,
  id: number
): Promise<Usuario | null> {
  return db.getFirstAsync<Usuario>(
    'SELECT * FROM usuarios WHERE id = ?;',
    [id]
  )
}
 
export async function buscarUsuarioPorEmail(
  db: SQLiteDatabase,
  email: string
): Promise<Usuario | null> {
  return db.getFirstAsync<Usuario>(
    'SELECT * FROM usuarios WHERE email = ?;',
    [email]
  )
}
 
export async function adicionarUsuarioDB(
  db: SQLiteDatabase,
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  rg: string,
  dataNasc: string,
  foto: string | null
): Promise<void> {
  await db.runAsync(
    `INSERT INTO usuarios (nome, email, senha, cpf, rg, dataNasc, foto)
     VALUES (?, ?, ?, ?, ?, ?, ?);`,
    [nome, email, senha, cpf, rg, dataNasc, foto]
  )
}
 
export async function atualizarUsuarioDB(
  db: SQLiteDatabase,
  id: number,
  nome: string,
  email: string,
  cpf: string,
  rg: string,
  dataNasc: string,
  foto: string | null
): Promise<void> {
  await db.runAsync(
    `UPDATE usuarios SET nome = ?, email = ?, cpf = ?, rg = ?, dataNasc = ?, foto = ?
     WHERE id = ?;`,
    [nome, email, cpf, rg, dataNasc, foto, id]
  )
}
 
export async function removerUsuarioDB(
  db: SQLiteDatabase,
  id: number
): Promise<void> {
  await db.runAsync('DELETE FROM usuarios WHERE id = ?;', [id])
}