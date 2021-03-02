import { Message, Client } from "discord.js";
import { uvv } from "selenium";
import { startBrowser } from "../libs/selenium";
const client = new Client();

startBrowser();
client.once("ready", () => {
    console.log("Ready!");
});

client.login("NzQzODg3MTI1OTc5ODU2OTMw.XzbM3w.c8x7TQpUaJHrKW10vMW7owAtQIs");
client.on("message", (message: Message) => {
    if(message.content.startsWith("logar uvv")){
        uvv.logar().then(() => {
            console.log("abriu");
            
        })
    }
});
