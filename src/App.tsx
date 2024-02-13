import { Container } from './components/UI'
import { Header } from './components'
import { Provider } from 'react-redux'
import store from './store'
import './assets/css/reset.css'

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Header></Header>
        <Container>App</Container>
      </div>
    </Provider>
  )
}

export default App
