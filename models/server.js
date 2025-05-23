const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../database/config');

class Server{
    constructor(){

        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/user';
        this.authPath = '/api/auth';
        this.demographyPath = '/api/demography'
        this.genrePath = '/api/genre'
        this.publisherPath = '/api/publisher'

        this.dbConnect();
        this.middlewares();
        this.routes();
        
    }

    async dbConnect(){
        await dbConnection();
    }

    middlewares(){
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
        this.app.use(this.authPath, require('../routes/auth'))
        this.app.use(this.demographyPath, require('../routes/demography'))
        this.app.use(this.genrePath, require('../routes/genre'))
        this.app.use(this.publisherPath, require('../routes/publisher'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`)
        })
    }
}
module.exports = Server;