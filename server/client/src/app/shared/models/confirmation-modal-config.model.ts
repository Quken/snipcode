export interface ConfirmationModalConfig {
    message: string;
    header: string;
    primaryButton: {
        value: unknown;
        message: string;
    };
    secondaryButton: {
        value: unknown;
        message: string;
    };
}
