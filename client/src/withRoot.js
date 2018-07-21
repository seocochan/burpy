import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber, deepOrange, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: amber,
    secondary: deepOrange,
    error: red,
    background: {
      default: '#f9f9f9'
    }
  },
  typography: {
    fontFamily: `"Nanum Gothic", "Roboto"`
  },
  mixins: {
    toolbar: {
      minHeight: 56
    }
  },
  // https://material-ui.com/customization/themes/#customizing-all-instances-of-a-component-type
  overrides: {}
});

function withRoot(Component) {
  function WithRoot(props) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...props} />
      </MuiThemeProvider>
    );
  }

  return WithRoot;
}

export default withRoot;
