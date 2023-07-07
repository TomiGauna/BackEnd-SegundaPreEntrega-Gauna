import messageModel from "../models/message.model.js";

class MessageManager{

    constructor(){
        this.messageModel = messageModel;
    }

    async getAllMessages(){

        try {
            const messages = await this.messageModel.find();
            return messages
        } catch (error) {
            Error('Error to obtain messages')
        }
    }

    async addMessage(user, message){
        try {
            const newMessage = await this.messageModel.create({ user: user, message: message });
            console.log(newMessage);
            return newMessage
        } catch (error) {
            Error('Failure at the moment of adding a message')
        }
    }

}

export default MessageManager