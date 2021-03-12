import { By, Key, WebElement, WebDriver } from "@libs/selenium";
import { enviroment } from "@environments";
import { createBrowser } from "@global/selenium";
import { Message, MessageAttachment } from "discord.js";
import { Aula } from "../../models/aula";

const url = enviroment.uvv.urlBase;

export async function pegarAulas(matricula: string, senha: string, conf: string, message: Message) {
    var aulas = [];

    await createBrowser().then(async ({page,helper}) => {
        console.log("abriu");
        
        await page.get(url);        
        await helper.element(By.id("Matricula")).sendKeys(matricula, Key.TAB, senha);

        await (await helper.element(By.className("btn col-lg-12 btn-primary input-block-level"))).click();
        await page.navigate().to(url + "Calendario/AulasOnline/66738");
        await page.navigate().to(url + "Calendario/AulasOnline/66738");
        
        await page.sleep(200);
        if(process.env.ENV !== "prod")
        await message.channel.send(new MessageAttachment(Buffer.from(await page.takeScreenshot(), "base64")));

        var listaTr: any[];
        if (conf) {
            var date: number;
            if (conf == "--day") date = new Date().getDay();
            else if (conf == "--tomorrow") date = new Date().getDay() + 1;
            var pegar: boolean = false;
            listaTr = await (await helper.element(By.className("fc-list-table"))).findElements(By.css("tr"));
            var newListTr = [];
            for (const index in listaTr) {
                var data = await listaTr[index].getAttribute("data-date");
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
            listaTr = await (await helper.element(By.className("fc-list-table"))).findElements(By.className("fc-list-item"));
        }

        var count = 0;
        var msg;
        while (count != listaTr.length) {
            await page
                .findElement(By.id("detalhesCalendario"))
                .isDisplayed()
                .then(x => {
                    if (!x) {
                        esperarLink(listaTr[count], page, helper).then(res => {
                            count++;
                            if (msg) msg.delete();
                            if (count != listaTr.length)
                                message.channel
                                    .send("Recuperando: " + ((count / listaTr.length) * 100).toFixed(0) + "%")
                                    .then(msgres => {
                                        msg = msgres;
                                    });
                            else {
                                message.channel.send("Recuperação concluída.");
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

async function esperarLink(tr: WebElement, page: WebDriver, helper) {
    var aula = new Aula();
    await tr.findElement(By.className("fc-list-item-time fc-widget-content")).then(x => {
        x.getText().then(x => {
            aula.horario = x;
            tr.click();
        });
    });
    await page.sleep(2000);
    await helper.element(By.id("Descricao")).then(x => {
        x.getText().then(x => {
            aula.materia = x;
            let data = /(\d+)\/(\d+)\/(\d+)/.exec(x)[0].split("/");
            aula.data = new Date(Number(data[2]), Number(data[1]) - 1, Number(data[0]));
        });
    });
    await helper.element(By.id("joinWebUrl")).then(x => {
        x.getAttribute("value").then(x => {
            aula.link = x;
        });
    });
    await page.sleep(200);
    await helper.waitBeClickable(By.className("modal fade in")).then(x => x.click());

    return aula;
}
