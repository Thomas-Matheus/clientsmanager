import { createMuiTheme } from '@material-ui/core/styles';
import { darken, lighten } from 'polished';

export default function Default() {
  return createMuiTheme({
    palette: {
      primary: {
        main: '#546A7B',
        dark: `${darken(0.1, '#546A7B')}`,
        light: `${lighten(0.1, '#546A7B')}`,
        contrastText: '#fff',
      },
      secondary: {
        main: '#393D3F',
        dark: `${darken(0.1, '#393D3F')}`,
        light: `${lighten(0.1, '#393D3F')}`,
      },
    },
  });
}
