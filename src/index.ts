import { Message, Client } from 'discord.js';
import { getComands } from './global/functions';
import { uvv } from './selenium';
const client = new Client();

client.once('ready', () => {
  console.log('Ready!');
});
client.login('NzQzODg3MTI1OTc5ODU2OTMw.XzbM3w.c8x7TQpUaJHrKW10vMW7owAtQIs');
client.on('message', (message: Message) => {
  if (message.content.startsWith('pegar aulas')) {
    const [, , matricula, senha,conf] = getComands(message);
    uvv.pegarAulas(matricula, senha,conf, message).then((aulas) => {
      aulas.map((aula) => uvv.print(aula)).forEach((aula) => message.channel.send(aula));
    });
  }
});
