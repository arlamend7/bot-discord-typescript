import { Message } from "discord.js";
import { print } from "./helper/aula-to-discord-text";
import { pegarAulas } from "./selenium/functions/pegar-aulas.function";

export function recuperarAulas(message: Message, [, , matricula, senha, conf]: string[]) {
    message.channel.startTyping();
    message.channel.send("Recuperação de aulas iniciada").then(x => x.delete({ timeout: 2000 }));
    pegarAulas(matricula, senha, conf, message).then(aulas => {
        aulas.map(aula => print(aula)).forEach(aula => message.channel.send(aula));
        message.channel.stopTyping();
    });
}
