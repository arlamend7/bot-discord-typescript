import { Builder, Capabilities } from "selenium-webdriver";
import { startBrowser } from "../../../libs/selenium";
import * as chrome from "selenium-webdriver/chrome";
import {path}  from "chromedriver";

let options = new chrome.Options();
let serviceBuilder = new chrome.ServiceBuilder(path);
const screen = {
    width: 1920,
    height: 1080
};
options.addArguments("--disable-gpu");
options.addArguments("--no-sandbox");
options.setProxy(null);
options.windowSize(screen);

export function createBrowser() {
    return startBrowser(
        new Builder()
            .withCapabilities(Capabilities.chrome())
            .setChromeService(serviceBuilder)
            .setChromeOptions(options)
            .build()
    );
}
