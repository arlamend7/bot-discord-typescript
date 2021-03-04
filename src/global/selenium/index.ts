import { Builder, Capabilities } from "selenium-webdriver";
import { startBrowser } from "../../../libs/selenium";
import * as chrome from "selenium-webdriver/chrome";
import { path } from "chromedriver";

chrome.setDefaultService(new chrome.ServiceBuilder(path).build());

export function createBrowser() {
    return startBrowser(new Builder().withCapabilities(Capabilities.chrome()).build());
}
