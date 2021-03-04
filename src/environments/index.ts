import { config } from "dotenv";
import { enviroment as envdev } from "./environment";
function configuration() {
    config();
    return process.env.ENV ? "." + process.env.ENV : "";
}
export var enviroment: typeof envdev = require(`./environment${configuration()}`);
