import chalk from "chalk";

export default class Logging {
    private static directions: Record<string, string> = {
        incoming: chalk.bgBlue("Incoming <-"),
        outgoing: chalk.bgBlueBright("Outgoing ->"),
    };

    public static log = (value: any) => this.info(value);

    public static info = (value: any, direction?: string) => {
        const time = chalk.blue(`[${new Date().toLocaleString()}] [INFO]`);
        const prefix = direction ? this.directions[direction] + " " : "";

        const message =
            typeof value === "string" ? chalk.blueBright(value) : value;

        console.log(time, prefix + message);
    };

    public static warn = (value: any) => {
        console.log(
            chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
            typeof value === "string" ? chalk.yellowBright(value) : value
        );
    };

    public static error = (value: any) => {
        console.log(
            chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
            typeof value === "string" ? chalk.redBright(value) : value
        );
    };
}
