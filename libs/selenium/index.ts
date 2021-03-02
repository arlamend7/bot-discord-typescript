import { Builder, Capabilities, Locator, WebDriver, WebElement, WebElementPromise } from "selenium-webdriver";
import * as chrome from "selenium-webdriver/chrome";
import { path,defaultInstance } from "chromedriver";

export var browser: WebDriver;
export var element: ElementHelper;

export async function startBrowser() {
    chrome.setDefaultService(new chrome.ServiceBuilder(path).build());
    return configure(await new Builder().withCapabilities(Capabilities.chrome()).build());
}

function configure(page: WebDriver) {
    conneted = true;
    browser = page;
    return page;
}
export function turnOff() {
    browser.close();
    defaultInstance.disconnect()
    conneted = false;
}
export var conneted : boolean;
export interface ElementHelper {
    (): WebElementPromise;
    all(locator: Locator) : Promise<WebElement[]>;
}
var defaultTimeout = 20000;
export function getElementOrWait(elemento: WebElement, waitTime: number = defaultTimeout) {
    return browser.wait(elemento.isDisplayed(), waitTime).then(() => elemento);
}
export function descePixels(pixel: number) {
    browser.executeScript(`window.scrollTo(0,${pixel});`);
}
export function WaitElementBeClickable(elemento: WebElement, waitTime: number = defaultTimeout) {
    return browser.wait(elemento.isDisplayed() && elemento.isEnabled(), waitTime).then(() => elemento);
}
