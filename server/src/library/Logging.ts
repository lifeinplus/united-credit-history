import chalk from "chalk";
import EventEmitter from "events";
import fs from "fs";
import path from "path";

class Emitter extends EventEmitter {}
const emitter = new Emitter();

emitter.on("fileLog", async (message) => {
    const dirPath = path.join("logs");
    const filePath = path.join(dirPath, "main.log");

    try {
        if (!fs.existsSync(dirPath)) {
            await fs.promises.mkdir(dirPath);
        }

        await fs.promises.appendFile(filePath, message + "\n");
    } catch (error) {
        console.error(error);
    }
});

export default class Logging {
    private static write = ({
        time,
        timeChalk,
        direction,
        directionChalk,
        message,
        messageChalk,
    }: Record<string, string>) => {
        direction = direction ? direction + " " : "";
        directionChalk = directionChalk ? directionChalk + " " : "";

        console.log(timeChalk + " " + directionChalk + messageChalk);
        emitter.emit("fileLog", time + " " + direction + message);
    };

    public static log = (value: any) => this.info(value);

    public static info = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        this.write({ time, timeChalk, message, messageChalk });
    };

    public static infoIn = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const direction = "Incoming <-";
        const directionChalk = chalk.bgBlue(direction);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        this.write({
            time,
            timeChalk,
            direction,
            directionChalk,
            message,
            messageChalk,
        });
    };

    public static infoOut = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const direction = "Outgoing ->";
        const directionChalk = chalk.bgBlueBright(direction);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        this.write({
            time,
            timeChalk,
            direction,
            directionChalk,
            message,
            messageChalk,
        });
    };

    public static warn = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [WARN]`;
        const timeChalk = chalk.yellow(time);

        const messageChalk =
            typeof message === "string" ? chalk.yellowBright(message) : message;

        this.write({ time, timeChalk, message, messageChalk });
    };

    public static error = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [ERROR]`;
        const timeChalk = chalk.red(time);

        const messageChalk =
            typeof message === "string" ? chalk.redBright(message) : message;

        this.write({ time, timeChalk, message, messageChalk });
    };
}
