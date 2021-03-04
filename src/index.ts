import { Message, Client } from 'discord.js';

import { getComands } from './global/functions';
import { uvv } from './selenium';
import * as yml from 'ytdl-core';
const client = new Client();

client.once('ready', () => {
  console.log('Ready!');
});
client.login('NzQzODg3MTI1OTc5ODU2OTMw.XzbM3w.c8x7TQpUaJHrKW10vMW7owAtQIs');
client.on('message', (message: Message) => {
  if (message.content.startsWith('pegar aulas')) {
    message.channel.startTyping();
    message.channel.send('Recuperação de aulas iniciada').then((x) => x.delete({ timeout: 2000 }));
    const [, , matricula, senha, conf] = getComands(message);
    uvv.pegarAulas(matricula, senha, conf, message).then((aulas) => {
      aulas.map((aula) => uvv.print(aula)).forEach((aula) => message.channel.send(aula));
      message.channel.stopTyping();
    });
  }
  if (message.content.startsWith('hi')) {
    message.member.voice.channel.join().then(async (x) => {
      x.play(yml('https://www.youtube.com/watch?v=8is7OuaHKxA'), { volume: 5 })
        .on('start', (e) => {
          console.log('start,' + e);
        })
        .on('ready', (e) => {
          console.log('sucesso,' + e);
        })
        .on('error', (e) => {
          console.log('erro,' + e);
        })
        .on('finish', (e) => {
          x.channel.leave();
          console.log('finish,' + e);
        }).resume();
        
    });
  }
});
