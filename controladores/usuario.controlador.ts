import { Request,Response } from "express";

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
    login(req:Request,res:Response){
        console.log(req.body);
        let usuario = req.body.usuario;
        let pwd = req.body.pwd;
        if(usuario){
            return res.status(200).json({
                status:"ok",
                message:"el usuario es " + usuario
            });
        }
        else{
            return res.status(200).json({
                status:"fail",
                message:"no hay usuario"
            })
        }
        
    }
}

export default usuarioController;