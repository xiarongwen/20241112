import React from 'react'
import classNames from 'classnames';
import styles from './Button.module.scss';

interface IButton {
    label: any;
    type?: 'primary' | 'remove' | 'circle';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    onClick?: () => void;
}
const Button: React.FC<IButton> = ({
    label,
    type = 'primary',
    size = 'medium',
    disabled = false,
    onClick,
  }) => {
    const buttonClasses = classNames(
      styles.button,
      styles[type],
      styles[size],
      { [styles.disabled]: disabled }
    );
  
    return (
      <button className={buttonClasses} onClick={onClick} disabled={disabled}>
        {label}
      </button>
    );
  };
  
  export default Button;