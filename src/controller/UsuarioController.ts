import { getDB } from "@/app/database/database";
import {
  listarUsuarios,
  adicionarUsuarioDB,
  removerUsuarioDB,
} from "../repository/UsuariosRepository";

import { Usuario } from "../types/Usuario";

export async function buscarUsuarios(): Promise<Usuario[]> {
  const db = await getDB();

  if (!db) {
    return [];
  }

  return await listarUsuarios(db);
}

export async function adicionarUsuario(
  nome: string,
  email: string
): Promise<void> {
  if (!nome.trim()) {
    throw new Error("Nome é obrigatório");
  }

  if (!email.trim()) {
    throw new Error("Email é obrigatório");
  }

  const db = await getDB();

  if (!db) {
    throw new Error("Banco de dados não disponível");
  }

  await adicionarUsuarioDB(db, nome, email);
}

export async function removerUsuario(
  id: number
): Promise<void> {
  const db = await getDB();

  if (!db) {
    throw new Error("Banco de dados não disponível");
  }

  await removerUsuarioDB(db, id);
}