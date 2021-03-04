import { Locator, until, WebElement, WebElementPromise } from 'selenium-webdriver';
import { browser, defaultTimeout } from '../index';

export const element: ElementFinderHelper = (locator: Locator, waitTime: number = defaultTimeout) =>
  browser.wait(until.elementLocated(locator), waitTime);
element.all = (locator: Locator, waitTime: number = defaultTimeout) =>
  browser.wait(until.elementsLocated(locator), waitTime);

interface ElementFinderHelper {
  (locator: Locator): WebElementPromise;
  all(locator: Locator): Promise<WebElement[]>;
}
export function descePixels(pixel: number) {
  browser.executeScript(`window.scrollTo(0,${pixel});`);
}

export function waitBeClickable(elemento: WebElement | Locator, waitTime: number = defaultTimeout) {
  if (!(elemento instanceof WebElement)) {
    elemento = browser.wait(until.elementLocated(elemento), waitTime);
  }
  return browser.wait(until.elementIsVisible(elemento) && until.elementIsEnabled(elemento), waitTime);
}
export function waitTextContains(elemento: WebElement, sub: string, waitTime: number = defaultTimeout) {
  return browser.wait(until.elementTextContains(elemento, sub), waitTime);
}
export async function waitElementNotVisible(elemento: WebElement, waitTime: number = defaultTimeout) {
  await browser.wait(until.elementIsNotVisible(elemento), waitTime);
}
