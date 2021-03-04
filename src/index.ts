import { Message, Client } from "discord.js";
import { getComands, initWith, initWithOneOf } from "@global";
import { enviroment } from "@environments";
import * as uvv from "./uvv";

console.log(enviroment.base);

export const client = new Client();
client.login(process.env.BOT_TOKEN);

client.on("message", (message: Message) => {
    if (initWithOneOf(message, uvv)) {
        const args = getComands(message);
        if (initWith(message, `${uvv.prefix} aulas`)) {
            uvv.recuperarAulas(message, args);
        }
    }
});
