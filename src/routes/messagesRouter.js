import { Router } from 'express';
import MessageManager from '../dao/MongoManagers/MongoMsgManager.js';
import { io } from '../app.js';

const router = Router();
const messageManager = new MessageManager();

router.get('/', async(req, res) => {
    const allMesgs = await messageManager.getAllMessages();
    res.send({allMesgs})
})

router.post("/", async (req, res) => {
    try {
        /* let algo = "mensaje agregado" */
        const { user, message } = req.body
        const newMessage = await messageManager.addMessage(user, message);
        const allMessages = await messageManager.getAllMessages();
        io.emit('obtainMsg', allMessages)
        if(newMessage) {
            res.status(200).send("Message added")
        }else{
            res.status(404).send("The message could not be added")
        }
    } catch (error) {
        console.log(user, message)
        res.status(500).send("Internal server error");
    }
})

export default router