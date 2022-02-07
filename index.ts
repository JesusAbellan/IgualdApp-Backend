import bodyParser from 'body-parser';
import cors from 'cors';
import { Server } from './clases/Server';
import usuarioRutas from './rutas/usuario.rutas';
import mongoose from 'mongoose';

const servidor = new Server();

servidor.app.use(bodyParser.urlencoded({limit:"5mb",extended:true}));
servidor.app.use(bodyParser.json({limit:"5mb"}));
servidor.app.use(cors({
    origin:true,
    credentials:true
}))

servidor.app.use("/usuario", usuarioRutas);

servidor.start(() =>{
    console.log("Servidor iniciado en el puerto " + servidor.port);
});

mongoose.connect('mongodb://localhost:27017/IgualdAppBDD',(err) => {
    if(err){
        console.log('no podemos conectar');
        throw err;
    }
    else{
        console.log('conectado a la base de datos');
    }
});