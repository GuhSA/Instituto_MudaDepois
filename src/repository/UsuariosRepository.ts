import { SQLiteDatabase } from "expo-sqlite";
import { Usuario } from "../types/Usuario";

export async function listarUsuarios(db: SQLiteDatabase) : Promise<Usuario[]> {
    return db.getAllAsync<Usuario>('SELECT * FROM USUARIOS;');
}

export async function adicionarUsuarioDB(
    db : SQLiteDatabase,
    nome: string,
    email: string,
): Promise<void> {
    await db.runAsync(
        'INSERT INTO UsuarioS (nome,email) VALUES (?,?);',
        [nome, email],
    );
}

export async function removerUsuarioDB(db: SQLiteDatabase, id: number): Promise<void> {
    await db.runAsync('DELETE FROM USUARIOS WHERE id = ?;', [id]);
}