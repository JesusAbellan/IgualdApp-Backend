import { Request,Response } from "express";
import { Usuario } from '../modelos/usuario.modelo';
import bcrypt from 'bcrypt';
import { Token } from "../clases/Token";

class usuarioController{
    getDatos(req:Request,res:Response){
        console.log(req.query);
        let usuario = req.query.usuario;
        if(usuario){
            return res.status(200).json({
                status:"ok",
                message:"el usuario es " + usuario
            });
        }
        else{
            return res.status(500).json({
                status:"fail",
                message:"no hay usuario"
            })
        }
    }
    crearUsuario(req:Request,res:Response){
        let u = new Usuario();
        u.usuario = req.body.usuario;
        u.email= req.body.email;
        u.role = ['011'];
        let pwdPlana = req.body.pwd;
        const hash = bcrypt.hashSync(pwdPlana,10)
        u.pwd = hash;
        Usuario.create(u,(err,usuarioDB)=>{
            if(err){
                console.log(err);
                throw err;
            }
            else{
                return res.status(200).json({
                    status:"ok",
                    message:"el usuario creado es " + usuarioDB.usuario,
                    usuario:{
                        _id: usuarioDB._id,
                        usuario: usuarioDB.usuario,
                        email:usuarioDB.email
                    }
                })
            }
        })
    }
    login(req:Request,res:Response){
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;

        Usuario.findOne({
            usuario:usuario,
        },null,null,(err,user) =>{
            if(err){
                throw err;
            }
            if(user){
                if(bcrypt.compareSync(pwd,user.pwd)){
                    const usuarioQueMando = new Usuario();
                    usuarioQueMando._id = user._id;
                    usuarioQueMando.usuario = user.usuario;
                    usuarioQueMando.role = user.role;
                    return res.status(200).json({
                        status: "ok",
                        _id:user._id,
                        token: Token.generaToken(usuarioQueMando)
                    });
                }
                else{
                    return res.status(200).json({
                        status: "fail",
                        message: "la contraseña no es correcta."
                    }); 
                }
            }
            else{
                return res.status(200).json({
                    status:"fail",
                    message:"usuario no encontrado"
                });
            }
        })        
    }
}

export default usuarioController;