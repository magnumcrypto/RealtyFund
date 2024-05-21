export interface UserData {
    ok: boolean;
    data: User;
}

export interface User {
    nombre: string;
    apellidos: string;
    direccion: string;
    tel: string;
}