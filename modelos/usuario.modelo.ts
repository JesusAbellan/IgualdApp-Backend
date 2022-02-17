import { model, Schema } from 'mongoose';
import { IUsuario } from '../interfaces/usuario.interface';

const usuarioSchema = new Schema<IUsuario>({
    nombre:{type:String},
    apellidos:{type:String},
    pwd:{type:String},
    email:{type:String, unique:true,uniqueCaseInsensitive:true,trim:true},
    role:[{type:String}]
},
{
    timestamps:true
});

export const Usuario = model<IUsuario>('usuario',usuarioSchema);