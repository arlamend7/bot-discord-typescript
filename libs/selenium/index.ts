import { ThenableWebDriver, WebDriver } from 'selenium-webdriver';

export var browser: WebDriver;
export var conneted: boolean;
export var defaultTimeout = 20000;

export async function startBrowser(thenableWebDriver: ThenableWebDriver) {
  return configure(await thenableWebDriver);
}

function configure(page: WebDriver) {
  conneted = true;
  browser = page;
  return page;
}

export * from './functions/helper.function'

