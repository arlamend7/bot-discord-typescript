import { Client } from "discord.js";
import "@environments";
import respondToMessage from "./src/respondToMessage";
import onReady from "./src/onReady";

export const client = new Client();
client.login(process.env.BOT_TOKEN);

client.once("ready", onReady)
client.on("message", respondToMessage);
