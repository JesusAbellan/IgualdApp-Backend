import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from './clases/Server';
import usuarioRutas from './rutas/usuario.rutas';

const servidor = new Server();

servidor.app.use(bodyParser.urlencoded({limit:"5mb",extended:true}));
servidor.app.use(bodyParser.json({limit:"5mb"}));
servidor.app.use(cors({
    origin:true,
    credentials:true
}))

servidor.app.use("/usuarios", usuarioRutas);

servidor.start(() =>{
    console.log("Servidor iniciado en el puerto " + servidor.port);
});