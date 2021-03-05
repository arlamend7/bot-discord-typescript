import { Builder } from "selenium-webdriver";
import { startBrowser } from "../../../libs/selenium";
import * as chrome from "selenium-webdriver/chrome";
import "chromedriver";

let options = new chrome.Options();
let serviceBuilder = new chrome.ServiceBuilder(process.env.CHROME_DRIVER_PATH);
const screen = {
    width: 1920,
    height: 1080
};
options.setChromeBinaryPath(process.env.CHROME_BINARY_PATH);
options.addArguments("--headless");
options.addArguments("--disable-gpu");
options.addArguments("--no-sandbox");
options.windowSize(screen);

export function createBrowser() {
    return startBrowser(new Builder().setChromeService(serviceBuilder).setChromeOptions(options).build());
}
