export interface InputComponent {
    inputValue?: string;
    require?: boolean;
    validation?: (value: any) => boolean;
    rule?: string;
    validationMessage?: string;
    order?: number;
    disabled?: boolean;
    maxLength?: number;
}
