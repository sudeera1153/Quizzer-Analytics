import React from 'react';
import { Paper, Card, Typography } from '@mui/material';

export default function PageHeader(props) {
  const pageHeaderStyle = {
    backgroundColor: '#fdfdff',
    padding: '1rem',
    display: 'flex',
    marginBottom: '0.5rem'
  };

  const pageIconStyle = {
    display: 'inline-block',
    padding: '0.5rem',
    color: '#3c44b1'
  };

  const pageTitleStyle = {
    paddingLeft: '1rem',
    '& .MuiTypography-subtitle2': {
      opacity: '0.6'
    }
  };

  const { title, subTitle, icon } = props;

  return (
    <Paper elevation={0} square style={pageHeaderStyle}>
      <div style={pageHeaderStyle}>
        <Card style={pageIconStyle}>{icon}</Card>
        <div style={pageTitleStyle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
