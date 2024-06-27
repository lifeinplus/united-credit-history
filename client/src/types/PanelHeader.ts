export interface PanelHeaderProps {
    date?: PanelHeaderFieldProps;
    handleExtend?: () => void;
    iconName: string;
    nameSpaces: string[];
    number?: PanelHeaderFieldProps;
    showExtendedData?: boolean;
}

export interface PanelHeaderFieldProps {
    caption: string | undefined;
    value: string | undefined;
}
