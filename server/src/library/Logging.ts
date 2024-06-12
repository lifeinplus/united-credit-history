import chalk from "chalk";
import fs from "fs";
import path from "path";

const fileLog = async (message: string) => {
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
};

class Logging {
    public static log = (value: any) => this.info(value);

    public static info = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        console.log(`${timeChalk} ${messageChalk}`);
        fileLog(`${time} ${message}`);
    };

    public static infoIn = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const direction = "Incoming <-";
        const directionChalk = chalk.bgBlue(direction);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        console.log(`${timeChalk} ${directionChalk} ${messageChalk}`);
        fileLog(`${time} ${direction} ${message}`);
    };

    public static infoOut = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [INFO]`;
        const timeChalk = chalk.blue(time);

        const direction = "Outgoing ->";
        const directionChalk = chalk.bgBlueBright(direction);

        const messageChalk =
            typeof message === "string" ? chalk.blueBright(message) : message;

        console.log(`${timeChalk} ${directionChalk} ${messageChalk}`);
        fileLog(`${time} ${direction} ${message}`);
    };

    public static warn = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [WARN]`;
        const timeChalk = chalk.yellow(time);

        const messageChalk =
            typeof message === "string" ? chalk.yellowBright(message) : message;

        console.log(`${timeChalk} ${messageChalk}`);
        fileLog(`${time} ${message}`);
    };

    public static error = (message: any) => {
        const time = `[${new Date().toLocaleString()}] [ERROR]`;
        const timeChalk = chalk.red(time);

        const messageChalk =
            typeof message === "string" ? chalk.redBright(message) : message;

        console.log(`${timeChalk} ${messageChalk}`);
        fileLog(`${time} ${message}`);
    };
}

export default Logging;
