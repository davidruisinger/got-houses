import React, { PureComponent } from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Normalize } from 'styled-normalize'
import GlobalStyles from './styles/globalStyles'
import store from './store'
import Home from './pages/home'
import House from './pages/house'
import Error from './pages/error'
import { ThemeProvider } from './components/_utils/styledComponents'
import theme from './styles/theme'

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <>
              <Normalize />
              <GlobalStyles />
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/houses/:id" component={House} />
                <Redirect from="/houses" to="/" />
                <Route component={Error} />
              </Switch>
            </>
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    )
  }
}

export default App
