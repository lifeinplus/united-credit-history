import { useTranslation } from "react-i18next";
import { ExtendControlProps } from "../../../types/CreditHistory";

const ExtendControl = ({
    handleExtend,
    showExtendedData,
}: ExtendControlProps) => {
    const { t } = useTranslation(["credit_history"]);

    return (
        <div>
            <div className="form-check form-switch navbar-text pb-1">
                <input
                    id="switchExtendedData"
                    checked={showExtendedData}
                    className="form-check-input"
                    onChange={handleExtend}
                    role="switch"
                    type="checkbox"
                />
                <label
                    className="form-check-label"
                    htmlFor="switchExtendedData"
                >
                    {t("extended_control")}
                </label>
            </div>
        </div>
    );
};

export default ExtendControl;
