
export interface ModalConfig {
    modalTitle: string
    dismissButtonLabel?: string
    closeButtonLabel?: string
    shouldClose?(): Promise<boolean> | boolean
    shouldDismiss?(): Promise<boolean> | boolean
    onClose?(): Promise<boolean> | boolean
    onDismiss?(): Promise<boolean> | boolean
    disableCloseButton?(): boolean
    disableDismissButton?(): boolean
    hideCloseButton?(): boolean
    hideDismissButton?(): boolean
}

export interface ModalDataConfig {
    title?: string;
    subtitle?: string;
    content?: string;
    type?: 'informative' | 'action' | 'alert';
    alertStyle?: 'warning' | 'neutral' | 'primary' | 'event' | 'success' |'error'
    size?: 'small' | 'medium' | 'large';
    primaryBtnLabel?: string;
    secondaryBtnLabel?: string;
    scrollable?: boolean;
}
