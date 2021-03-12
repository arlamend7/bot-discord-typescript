import { ThenableWebDriver, WebDriver } from 'selenium-webdriver';
import { createHelper } from './functions/helper.function';

export var conneted: boolean;
export var defaultTimeout = 20000;

export async function startBrowser(thenableWebDriver: ThenableWebDriver) {
  return configure(await thenableWebDriver);
}

function configure(page: WebDriver) {
  conneted = true;
  
  return {page,helper : createHelper(page)};
}

export * from './functions/helper.function'

