import { createGlobalStyle } from 'styled-components'
import { baseTheme } from './theme'

export default createGlobalStyle`
  :root {
    --app-primary: #0497EA;
    --app-success: #52c41a;
    --app-warning: #faad14;
    --app-error: #f5222d;
  }

  body {
    font-family: ${(props) => props.theme.fontFamily};
    font-size: 18px;
    margin: 0;
    background-color: ${baseTheme.colors.main};
    color: ${baseTheme.colors.font}
  }

  * {
    box-sizing: border-box;
  }
`
