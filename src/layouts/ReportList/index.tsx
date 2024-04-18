import classNames from "classnames";
import Header from "../../components/Header";
import { useTheme } from "../../hooks/ThemeContext";

const ReportList = () => {
    const theme = useTheme();

    return (
        <div className="container-fluid mb-3">
            <div
                className={classNames([
                    `row panel ${theme} pt-2 rounded-bottom`,
                    `border border-top-0`,
                    theme === "dark" && "uch-border-dark",
                ])}
            >
                <div className="col">
                    <div className="row">
                        <Header
                            iconName={"bi-card-list"}
                            nameSpaces={["report_list"]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportList;
