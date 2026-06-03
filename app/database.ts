import { Usuario } from "@/src/types/Usuario";
import { SQLiteDatabase } from "expo-sqlite";

export async function listarUsuarios(db: SQLiteDatabase) : Promise<Usuario[]> {
    return db.getAllAsync<Usuario>('SELECT * FROM USUARIOS;');
}

export async function adicionarUsuarioDB(
    db : SQLiteDatabase,
    nome: string,
    email: string,
): Promise<void> {
    await db.runAsync(
        'INSERT INTO USUARIOS (nome,email) VALUES (?,?);',
        [nome, email],
    );
}

export async function removerUsuarioDB(db: SQLiteDatabase, id: number): Promise<void> {
    await db.runAsync('DELETE FROM USUARIOS WHERE id = ?;', [id]);
}