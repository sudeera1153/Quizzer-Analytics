import React from 'react';
import { Button as MuiButton } from '@mui/material';

export default function Button(props) {
  const {
    text,
    size,
    color,
    variant,
    onClick,
    ...other
  } = props;

  const buttonStyle = {
    margin: '0.5rem',
    textTransform: 'none'
  };

  return (
    <MuiButton
      variant={variant || 'contained'}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      style={buttonStyle}
      {...other}
    >
      {text}
    </MuiButton>
  );
}
