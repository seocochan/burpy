import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    primary: { main: '#4e5263' },
    secondary: { main: '#f0ecdf' },
    error: red,
    contrastThreshold: 3,
    background: { default: '#f9f9f9' }
  },
  typography: {
    fontFamily: `"Nanum Gothic", "Roboto"`
    // fontWeightMedium: 500,
    // body1: {
    //   fontWeight: 500
    // },
    // subheading: {
    //   fontSize: 12
    // }
  },
  mixins: {
    toolbar: { minHeight: 56 }
  },
  // https://material-ui.com/customization/themes/#customizing-all-instances-of-a-component-type
  overrides: {
    MuiPaper: {
      rounded: { border: '1px solid #ecedef' },
      elevation1: { boxShadow: 'none' },
      elevation2: { boxShadow: 'none' }
    }
  }
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
