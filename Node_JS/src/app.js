import http from 'http'
import app from './routes/index.js';
import mongoose from './db/db.js';

const server = http.createServer(app);

server.listen(process.env.PORT||3000,()=> {
   console.log(`Servidor aberto na porta ${process.env.PORT||3000}`);
});