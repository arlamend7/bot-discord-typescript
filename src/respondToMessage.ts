import { Message } from "discord.js";
import { getComands, initWith, initWithOneOf } from "./global";
import * as uvv from "./uvv";

export default (message: Message) => {
    if (initWithOneOf(message, uvv)) {
        const args = getComands(message);
        if (initWith(message, `${uvv.prefix} aulas`)) {
            uvv.recuperarAulas(message, args);
        }
    }
}