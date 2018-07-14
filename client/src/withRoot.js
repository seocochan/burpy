import * as React from 'react';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { amber, deepOrange, red } from '@material-ui/core/colors';
import CssBaseline from '@material-ui/core/CssBaseline';

// 여기에 테마 색상 지정.
// https://material-ui.com/customization/themes
const theme = createMuiTheme({
  palette: {
    primary: amber,
    // primary: {
    //   light: blue,
    //   main: blue,
    //   contrastText: '#fff',
    // },
    secondary: deepOrange,
    error: red
  }
});

function withRoot(Component) {
  function WithRoot(props) {
    // React Context API로 다른 컴포넌트에 테마 제공
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
