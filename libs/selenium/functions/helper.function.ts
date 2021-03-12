import { Locator, until, WebDriver, WebElement } from 'selenium-webdriver';
import { defaultTimeout } from '../index';
export * from "selenium-webdriver"
export function createHelper(browser: WebDriver){
  function elementHelper(locator: Locator, waitTime: number = defaultTimeout) {
   return browser.wait(until.elementLocated(locator), waitTime)
    };
  elementHelper.all = (locator: Locator, waitTime: number = defaultTimeout) =>
  browser.wait(until.elementsLocated(locator), waitTime);
  return {
    element : elementHelper,
    descePixels(pixel: number) {
      browser.executeScript(`window.scrollTo(0,${pixel});`);
    },

    waitBeClickable(elemento: WebElement | Locator, waitTime: number = defaultTimeout) {
      if (!(elemento instanceof WebElement)) {
        elemento = browser.wait(until.elementLocated(elemento), waitTime);
      }
      return browser.wait(until.elementIsVisible(elemento) && until.elementIsEnabled(elemento), waitTime);
    },
    waitTextContains(elemento: WebElement| Locator, sub: string, waitTime: number = defaultTimeout) {
      if (!(elemento instanceof WebElement)) {
        elemento = browser.wait(until.elementLocated(elemento), waitTime);
      }
      return browser.wait(until.elementTextContains(elemento, sub), waitTime);
    },
    async waitElementNotVisible(elemento: WebElement | Locator, waitTime: number = defaultTimeout) {
      if (!(elemento instanceof WebElement)) {
        elemento = browser.wait(until.elementLocated(elemento), waitTime);
      }
      await browser.wait(until.elementIsNotVisible(elemento), waitTime);
    }
  }
}
