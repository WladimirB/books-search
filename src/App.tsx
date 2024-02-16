import { AppSnackbar, Header, Main } from './components'
import { Provider } from 'react-redux'
import store from './store'
import { createGlobalStyle, ThemeProvider } from 'styled-components'

const GlobalStyle = createGlobalStyle<{ $whiteColor?: boolean }>`
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
  }

  * {
    box-sizing: border-box;
  }
`

const App = () => {
  return (
    <ThemeProvider theme={{ fontFamily: 'Montserrat, sans-serif' }}>
      <GlobalStyle />
      <Provider store={store}>
        <div>
          <AppSnackbar></AppSnackbar>
          <Header></Header>
          <Main></Main>
        </div>
      </Provider>
    </ThemeProvider>
  )
}

export default App
