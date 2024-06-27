import { Tooltip } from "bootstrap";
import { useEffect } from "react";

import { TableColumn } from "../../../types/Table";

const useTooltip = (tooltips: boolean, columns: TableColumn[]) => {
    useEffect(() => {
        if (!tooltips) return;

        const tooltipTriggerList = document.querySelectorAll(
            '[data-bs-toggle="tooltip"]'
        );

        const tooltipList = [...tooltipTriggerList].map(
            (tooltipTriggerEl) => new Tooltip(tooltipTriggerEl)
        );

        return () => {
            tooltipList.forEach((element) => {
                element.hide();
            });
        };
    }, [tooltips, columns]);
};

export default useTooltip;
