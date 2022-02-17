"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_modelo_1 = require("../modelos/usuario.modelo");
const bcrypt_1 = __importDefault(require("bcrypt"));
const Token_1 = require("../clases/Token");
class usuarioController {
    getDatos(req, res) {
        console.log(req.query);
        let usuario = req.query.usuario;
        if (usuario) {
            return res.status(200).json({
                status: "ok",
                message: "el usuario es " + usuario
            });
        }
        else {
            return res.status(500).json({
                status: "fail",
                message: "no hay usuario"
            });
        }
    }
    crearUsuario(req, res) {
        let u = new usuario_modelo_1.Usuario();
        u.nombre = req.body.nombre;
        u.apellidos = req.body.apellidos;
        u.email = req.body.email;
        u.role = ['011'];
        console.log(u);
        let pwdPlana = req.body.pwd;
        const hash = bcrypt_1.default.hashSync(pwdPlana, 10);
        u.pwd = hash;
        usuario_modelo_1.Usuario.create(u, (err, usuarioDB) => {
            if (err) {
                console.log(err);
                throw err;
            }
            else {
                return res.status(200).json({
                    status: "ok",
                    message: "el usuario creado es " + usuarioDB.nombre + " " + usuarioDB.apellidos
                });
            }
        });
    }
    login(req, res) {
        console.log(req.body);
        let email = req.body.email;
        let pwd = req.body.pwd;
        usuario_modelo_1.Usuario.findOne({
            email: email,
        }, null, null, (err, user) => {
            if (err) {
                throw err;
            }
            if (user) {
                if (bcrypt_1.default.compareSync(pwd, user.pwd)) {
                    const usuarioQueMando = new usuario_modelo_1.Usuario();
                    usuarioQueMando._id = user._id;
                    usuarioQueMando.nombre = user.nombre;
                    usuarioQueMando.apellidos = user.apellidos;
                    usuarioQueMando.role = user.role;
                    return res.status(200).json({
                        status: "ok",
                        _id: user._id,
                        token: Token_1.Token.generaToken(usuarioQueMando),
                        mensaje: 'login correcto'
                    });
                }
                else {
                    return res.status(200).json({
                        status: "fail",
                        mensaje: "la contraseña no es correcta."
                    });
                }
            }
            else {
                return res.status(200).json({
                    status: "fail",
                    mensaje: "usuario no encontrado"
                });
            }
        });
    }
    renuevaToken(req, res) {
        let usuarioToken = req.body.usuarioToken;
        const usuarioQueMando = new usuario_modelo_1.Usuario();
        usuarioQueMando._id = usuarioToken._id;
        usuarioQueMando.nombre = req.body.nombre;
        usuarioQueMando.apellidos = req.body.apellidos;
        usuarioQueMando.role = usuarioToken.role;
        return res.status(200).json({
            status: "ok",
            message: "Token renovado",
            _id: usuarioToken._id,
            token: Token_1.Token.generaToken(usuarioQueMando)
        });
    }
}
exports.default = usuarioController;
