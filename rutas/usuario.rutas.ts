import { Router } from "express";
import usuarioController from "../controladores/usuario.controlador";

const usuarioRutas = Router();
usuarioRutas.get("/getDatos",usuarioController.prototype.getDatos);
usuarioRutas.post("/login",usuarioController.prototype.login);

export default usuarioRutas;