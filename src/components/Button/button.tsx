import * as React from 'react';
import * as classNames from 'classnames';

export type ButtonType = ButtonTypes.info | ButtonTypes.error | ButtonTypes.success;

export enum ButtonTypes {
  info = 'secondary',
  error = 'error',
  success = 'primary'
}

interface OwnProps {
  onClick?: (data?: any) => any
  styleBtn?: ButtonType,
  type?: string,
  wide?: boolean
  prefix?: string
}

export const Button: React.SFC<OwnProps> = ({children, onClick, type, styleBtn, wide, prefix}) => {
  const classes = classNames(prefix, {
    [`${prefix}--${styleBtn}`]: true,
    ['wide']: wide
  });
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
    >
      {children}
    </button>)
};

Button.defaultProps = {
  styleBtn: ButtonTypes.info,
  type: 'button',
  wide: false,
  prefix: 'btn'
};