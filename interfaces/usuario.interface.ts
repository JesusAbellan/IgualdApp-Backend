import { Document } from "mongoose";

export interface IUsuario extends Document{
    nombre: string,
    apellidos: string,
    email: string,
    pwd: string,
    role: string[],
}