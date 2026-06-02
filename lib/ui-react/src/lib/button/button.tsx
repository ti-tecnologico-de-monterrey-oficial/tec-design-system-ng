import styles from './button.module.css';

export interface ButtonProps {
  label: string;
}

export function Button({ label }: ButtonProps) {
  return (
    <button className={styles['container']}>
      {label}
    </button>
  );
}

export default Button;
