import { getDB } from '@/app/database/database'
import {
  listarUsuarios,
  buscarUsuarioPorId,
  buscarUsuarioPorEmail,
  adicionarUsuarioDB,
  atualizarUsuarioDB,
  removerUsuarioDB,
} from '../repository/UsuariosRepository'
import { Usuario } from '../types/Usuario'
 
export async function buscarUsuarios(): Promise<Usuario[]> {
  const db = await getDB()
  if (!db) return []
  return listarUsuarios(db)
}
 
export async function buscarUsuario(id: number): Promise<Usuario | null> {
  const db = await getDB()
  if (!db) return null
  return buscarUsuarioPorId(db, id)
}
 
export async function loginUsuario(
  email: string,
  senha: string
): Promise<Usuario> {
  if (!email.trim()) throw new Error('E-mail é obrigatório')
  if (!senha.trim()) throw new Error('Senha é obrigatória')
 
  const db = await getDB()
  if (!db) throw new Error('Banco de dados não disponível')
 
  const usuario = await buscarUsuarioPorEmail(db, email.trim().toLowerCase())
 
  if (!usuario)        throw new Error('E-mail não cadastrado')
  if (usuario.senha !== senha) throw new Error('Senha incorreta')
 
  return usuario
}
 
export async function adicionarUsuario(
  nome: string,
  email: string,
  senha: string,
  cpf: string,
  rg: string,
  dataNasc: string,
  foto: string | null = null
): Promise<void> {
  if (!nome.trim())     throw new Error('Nome é obrigatório')
  if (!email.trim())    throw new Error('E-mail é obrigatório')
  if (!senha.trim())    throw new Error('Senha é obrigatória')
  if (senha.length < 6) throw new Error('A senha deve ter pelo menos 6 caracteres')
  if (!cpf.trim())      throw new Error('CPF é obrigatório')
  if (!rg.trim())       throw new Error('RG é obrigatório')
  if (!dataNasc.trim()) throw new Error('Data de nascimento é obrigatória')
 
  const db = await getDB()
  if (!db) throw new Error('Banco de dados não disponível')
 
  const emailExistente = await buscarUsuarioPorEmail(db, email.trim().toLowerCase())
  if (emailExistente) throw new Error('E-mail já cadastrado')
 
  await adicionarUsuarioDB(db, nome.trim(), email.trim().toLowerCase(), senha, cpf.trim(), rg.trim(), dataNasc.trim(), foto)
}
 
export async function atualizarUsuario(
  id: number,
  nome: string,
  email: string,
  cpf: string,
  rg: string,
  dataNasc: string,
  foto: string | null = null
): Promise<void> {
  if (!nome.trim())     throw new Error('Nome é obrigatório')
  if (!email.trim())    throw new Error('E-mail é obrigatório')
  if (!cpf.trim())      throw new Error('CPF é obrigatório')
  if (!rg.trim())       throw new Error('RG é obrigatório')
  if (!dataNasc.trim()) throw new Error('Data de nascimento é obrigatória')
 
  const db = await getDB()
  if (!db) throw new Error('Banco de dados não disponível')
 
  await atualizarUsuarioDB(db, id, nome.trim(), email.trim().toLowerCase(), cpf.trim(), rg.trim(), dataNasc.trim(), foto)
}
 
export async function removerUsuario(id: number): Promise<void> {
  const db = await getDB()
  if (!db) throw new Error('Banco de dados não disponível')
  await removerUsuarioDB(db, id)
}