const express = require('express')
const asistenciaRouter = require('./routes/registroasistencia')
const cors = require('cors')

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            asistencia:"/api/v1/asistencia"
        }
        this.middleware();
        this.routes();
    }

    routes(){
        this.app.use(this.paths.asistencia, asistenciaRouter);
    }

    middleware(){
        this.app.use(cors());//Habilita Origen Cruzado
        this.app.use(express.json());
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en el puerto ', this.port);
        });
    }
}

module.exports = Server