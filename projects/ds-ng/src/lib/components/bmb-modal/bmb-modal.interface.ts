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
