import express from "express";
import mongoose from "mongoose";
import handlebars from 'express-handlebars';
import __dirname from './utils.js';
import productsRouter from './routes/productsRouter.js';
import cartsRouter from './routes/cartsRouter.js';
import messagesRouter from './routes/messagesRouter.js'
import viewsRouter from './routes/viewsRouter.js';
import MessageManager from "./dao/MongoManagers/MongoMsgManager.js";
import { Server } from "socket.io";
const hidden = 'Belalugosi21';

const messageManager = new MessageManager();

const app = express();
const listeningPort = 8080;

const serverHttp = app.listen(listeningPort, () => console.log(`Hearing on port ${listeningPort}`)); 
export const io = new Server(serverHttp);

const mongo = `mongodb+srv://tomgauna:${hidden}@backcluster.aokzmna.mongodb.net/ecommerce`;
const connection = mongoose.connect(mongo).then((conn) => {
    console.log('Mongo DB connected')
}).catch((error) => {
    console.log('Something Broke!')
})

app.engine('handlebars', handlebars.engine());

app.set('views', __dirname+'/views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use(express.static(__dirname+'/public'));

app.use('/api/products/', productsRouter); 
app.use('/api/carts/', cartsRouter);
app.use('/api/messages/', messagesRouter)
app.use('/', viewsRouter);

io.on('connection', (socket) => {
    console.log('New client connected')

    /* socket.on('msg', async(data) => {
        /* console.log(data); 
        await messageManager.addMessage(data)
        const messages = await messageManager.getAllMessages()
        /* messages.push(data); 
        io.emit('uploadingMessages', messages)
    })

    socket.on('authenticated', data => {
       socket.broadcast.emit('newUserConnected', data);
       /* console.log('Server: ', data) 
    }) */
})