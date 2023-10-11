import  express  from "express";
import router from "./Routes/index.js";

import mongoose from "../src/db/DB.js"; // Ficheiro de conexão à BD no MONGO
import employeeRouter  from "./Routes/index.js";

const app = express();

app.use(express.json());

app.get('/', (req, res)=>{
    res.send(`Connected to MongoDB`)
})

const startServer = () => {
    app.listen(process.env.PORT||3000,()=> {
        console.log(`Servidor aberto na porta ${process.env.PORT||3000}`);
    });
};

startServer();

app.use(router);

export {app};



