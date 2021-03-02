import { Message, Client } from "discord.js";
const client = new Client();

client.once("ready", () => {
    console.log("Ready!");
    
});

client.login("NzQzODg3MTI1OTc5ODU2OTMw.XzbM3w.c8x7TQpUaJHrKW10vMW7owAtQIs");
client.on("message", (message: Message) => {
    console.log(message.content);
});
