import classNames from "classnames";
import { useTranslation } from "react-i18next";

import Header from "../components/Header";
import { useTheme } from "../hooks";

const About = () => {
    const theme = useTheme();
    const { t } = useTranslation(["about"]);
    const textTheme = theme === "light" ? "text-dark" : "text-light";

    const tasks = ["t1", "t2", "t3", "t4", "t5", "t6", "t7"].map((task) => {
        return {
            id: task,
            text: t(`tasks.${task}.text`),
            title: t(`tasks.${task}.title`),
        };
    });

    const legend = [
        { leftBadge: "0", rightBadge: "1" },
        { leftBadge: "A", rightBadge: "B" },
        { leftBadge: "C", rightBadge: "D" },
        { leftBadge: "E", rightBadge: "F" },
        { leftBadge: "G", rightBadge: "-" },
    ].map((item) => {
        return {
            ...item,
            id: item.leftBadge + item.rightBadge,
            leftText: t(`legend.${item.leftBadge}`),
            rightText: t(`legend.${item.rightBadge}`),
        };
    });

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames(
                    `row panel ${theme} pt-3 pb-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark"
                )}
            >
                <div className="col">
                    <div className="row">
                        <Header
                            iconName={"bi-file-text"}
                            nameSpaces={["about"]}
                        />
                    </div>
                    <Title name={t("definition.title")} textTheme={textTheme} />
                    <div className="row">
                        <div className="col">
                            <p className={textTheme}>{t("definition.value")}</p>
                        </div>
                    </div>
                    <Title name={t("tasks.title")} textTheme={textTheme} />
                    <div className="row">
                        <div className="col">
                            <Tasks tasks={tasks} textTheme={textTheme} />
                        </div>
                    </div>
                    <Title name={t("legend.title")} textTheme={textTheme} />
                    <div className="row">
                        <div className="col">
                            <Legend legend={legend} textTheme={textTheme} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

type TaskProps = {
    tasks: Array<{
        id: string;
        title: string;
        text: string;
    }>;
    textTheme: string;
};

function Tasks({ tasks, textTheme }: TaskProps) {
    return (
        <ol className={textTheme}>
            {tasks.map((task) => (
                <li key={task.id}>
                    <dl className="row">
                        <dd className="col-sm-9 col-lg-10">{task.text}</dd>
                        <dt className="col-sm-3 col-lg-2 text-truncate">
                            <i className="d-none d-sm-inline bi bi-caret-left-fill"></i>
                            <i className="d-sm-none bi bi-caret-up-fill"></i>{" "}
                            {task.title}
                        </dt>
                    </dl>
                </li>
            ))}
        </ol>
    );
}

type LegendProps = {
    legend: Array<{
        id: string;
        leftBadge: string;
        leftText: string;
        rightBadge: string;
        rightText: string;
    }>;
    textTheme: string;
};

function Legend({ legend, textTheme }: LegendProps) {
    return (
        <>
            {legend.map((item) => (
                <div key={item.id} className="row">
                    <div className="col-3 col-sm-2 col-lg-1 order-sm-2 text-center mb-2">
                        <span
                            className={`uch-badge status uch-text-bg-${item.leftBadge}`}
                        >
                            {item.leftBadge}
                        </span>
                    </div>
                    <div className="col-9 col-sm-4 col-lg-5 order-sm-1 text-sm-end mb-2">
                        <span className={textTheme}>{item.leftText}</span>
                    </div>
                    <div className="col-3 col-sm-2 col-lg-1 order-sm-3 text-center mb-2">
                        <span
                            className={`uch-badge status uch-text-bg-${item.rightBadge}`}
                        >
                            {item.rightBadge}
                        </span>
                    </div>
                    <div className="col-9 col-sm-4 col-lg-5 order-sm-4 mb-2">
                        <span className={textTheme}>{item.rightText}</span>
                    </div>
                </div>
            ))}
        </>
    );
}

type TitleProps = {
    name: string;
    textTheme: string;
};

function Title({ name, textTheme }: TitleProps) {
    return (
        <div className="row my-2">
            <div className="col">
                <h5 className={textTheme}>{name}</h5>
            </div>
        </div>
    );
}

export default About;
