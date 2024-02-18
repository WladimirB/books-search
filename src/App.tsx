import { AppSnackbar, Header, Main, Footer } from './components'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from 'styled-components'
import GlobalStyle from 'styles/gloabal'

// const colorBlack = '#333333'
// const blackAlter = '#515151'
// const colorPrimary = '#5595e8'
// const textColor = '#bebebe'

const App = () => {
  return (
    <ThemeProvider theme={{ fontFamily: 'Montserrat, sans-serif' }}>
      <GlobalStyle />
      <Provider store={store}>
        <div>
          <AppSnackbar></AppSnackbar>
          <Header></Header>
          <Main></Main>
          <Footer>&copy; 2024</Footer>
        </div>
      </Provider>
    </ThemeProvider>
  )
}

export default App
