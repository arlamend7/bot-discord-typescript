import { Message, MessageAttachment } from 'discord.js';
import { By, Key, WebDriver, WebElement } from 'selenium-webdriver';
import { getElementOrWait, startBrowser, WaitElementBeClickable } from '../../../libs/selenium';

export class Aula {
  horario: string;
  materia: string;
  link: string;
  aluno_id: string;
  data: Date;
}

export async function pegarAulas(matricula: string, senha: string, conf: string, message: Message) {
  var aulas = [];

  await startBrowser().then(async (page) => {
    await page.get('https://aluno.uvv.br/Login');
    await page.findElement(By.id('Matricula')).sendKeys(matricula, Key.TAB, senha);
    await (await page.findElement(By.className('btn col-lg-12 btn-primary input-block-level'))).click();

    await page.sleep(200);
    await page.navigate().to('https://aluno.uvv.br/Calendario/AulasOnline/66738');
    await page.navigate().to('https://aluno.uvv.br/Calendario/AulasOnline/66738');

    await page.sleep(200);
    await message.channel.send(new MessageAttachment(Buffer.from(await page.takeScreenshot(), 'base64')));

    var listaTr;
    if (conf) {
      var date;
      if (conf == '--day') date = new Date().getDay();
      else if (conf == '--tomorrow') date = new Date().getDay() + 1;
      var pegar: boolean = false;
      listaTr = await (await page.findElement(By.className('fc-list-table'))).findElements(By.css('tr'));
      var newListTr = [];
      for (const index in listaTr) {
        var data = await listaTr[index].getAttribute('data-date');
        if (data && pegar) {
          pegar = false;
        }
        if (data ? date == new Date(data).getDay() + 1 : pegar) {
          if (pegar) newListTr.push(listaTr[index]);
          else pegar = true;
        }
      }
      listaTr = newListTr;
    } else {
      listaTr = await (await page.findElement(By.className('fc-list-table'))).findElements(
        By.className('fc-list-item'),
      );
    }

    var count = 0;
    var msg;
    while (count != listaTr.length) {
      await page
        .findElement(By.id('detalhesCalendario'))
        .isDisplayed()
        .then((x) => {
          if (!x) {
            esperarLink(listaTr[count], page).then((res) => {
              count++;
              if (msg) msg.delete();
              if (count != listaTr.length)
                message.channel
                  .send('Recuperando: ' + ((count / listaTr.length) * 100).toFixed(0) + '%')
                  .then((msgres) => {
                    msg = msgres;
                  });
              else {
                message.channel.send('Recuperação concluída.');
              }
              aulas.push(res);
            });
          }
        });
      await page.sleep(300);
    }
    await page.close();
  });
  return aulas;
}

async function esperarLink(tr: WebElement, page: WebDriver) {
  var aula = new Aula();
  tr;
  await getElementOrWait(await tr.findElement(By.className('fc-list-item-time fc-widget-content'))).then((x) => {
    x.getText().then((x) => {
      aula.horario = x;
      tr.click();
    });
  });
  await page.sleep(2000);
  await getElementOrWait(await page.findElement(By.id('Descricao'))).then((x) => {
    x.getText().then((x) => {
      aula.materia = x;
      let data = /(\d+)\/(\d+)\/(\d+)/.exec(x)[0].split('/');
      aula.data = new Date(Number(data[2]), Number(data[1]) - 1, Number(data[0]));
    });
  });
  await getElementOrWait(await page.findElement(By.id('joinWebUrl'))).then((x) => {
    x.getAttribute('value').then((x) => {
      aula.link = x;
    });
  });
  await page.sleep(200);
  await WaitElementBeClickable(await page.findElement(By.className('modal fade in'))).then((x) => x.click());

  return aula;
}

export const print = function (Aula) {
  var texto = '```js\n';
  texto += '{\n';
  texto += '\tMateria : "' + diaMateria(Aula.materia) + '"\n';
  texto += '\tHorario : "' + Aula.horario.slice(0, 5).trim() + '"\n';
  texto += '\tDia : "' + Aula.data.toISOString().slice(0, 10) + '"\n';
  texto += '\tLink : \n';
  texto += '}';
  texto += '```';
  texto += Aula.link + '\n';
  return texto;
};
function diaMateria(texto) {
  var index = texto.indexOf('no dia');
  texto = texto.replace(':', '-');
  return texto.substring(0, index);
}
