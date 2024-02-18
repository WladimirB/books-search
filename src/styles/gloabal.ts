import { createGlobalStyle } from 'styled-components'
import { baseTheme } from './theme'

export default createGlobalStyle`
  :root {
    --app-primary: ${baseTheme.colors.primary};
    --app-success: ${baseTheme.colors.success};
    --app-warning: ${baseTheme.colors.warning};
    --app-danger: ${baseTheme.colors.danger};
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
