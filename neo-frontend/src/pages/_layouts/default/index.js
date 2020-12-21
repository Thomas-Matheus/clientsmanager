import React from 'react';
import PropTypes from 'prop-types';
import { CssBaseline, Paper, Grid } from '@material-ui/core';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';

import Loading from '~/components/Loading';

import layoutTheme from '../../../styles/theme';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '60vh',
  },
  content: {
    marginTop: theme.spacing(3),
  },
}));

export default function AuthLayout({ children }) {
  const classes = useStyles();
  const loading = useSelector((state) => state.clients.loading);

  return (
    <ThemeProvider theme={layoutTheme({ layoutTheme: null })}>
      <Grid
        container
        component="main"
        className={classes.root}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <CssBaseline />
        <Grid
          className={classes.content}
          component={Paper}
          item
          xs={9}
          sm={9}
          md={9}
          elevation={0}
          square
        >
          {(!loading && children) || <Loading />}
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}

AuthLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
