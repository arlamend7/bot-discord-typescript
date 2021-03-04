import { Message } from "discord.js";

export const getComands = (message: Message) => message.content.split(" ").map(x => x.toLowerCase());
export const initWithOneOf = (message: Message, ...modules: { prefix: string }[]) =>
    modules.some(module => message.content.startsWith(module.prefix));
export const initWith = (message: Message, command: string) => message.content.startsWith(command);
export * from "./selenium";
