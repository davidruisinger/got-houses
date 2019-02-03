import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import posed, { PoseGroup } from 'react-pose'
import { Provider } from 'react-redux'
import store from './store'
import { ThemeProvider } from './components/_utils/styledComponents'
import theme from './styles/theme'
import { Normalize } from 'styled-normalize'
import GlobalStyles from './styles/globalStyles'
import Home from './pages/home'
import House from './pages/house'
import Error from './pages/error'

const RouteContainer = posed.div({
  enter: { opacity: 1, y: 0, beforeChildren: true },
  exit: { opacity: 0, y: 20 },
})

const AppRouter = () => (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <>
        <Normalize />
        <GlobalStyles />

        <BrowserRouter>
          <Route
            render={({ location }) => (
              <PoseGroup>
                <RouteContainer key={location.pathname}>
                  <Switch location={location}>
                    <Route exact path="/" component={Home} key="home" />
                    <Route path="/houses/:id" component={House} key="house" />
                    <Redirect from="/houses" to="/" key="houses" />
                    <Route component={Error} key="error" />
                  </Switch>
                </RouteContainer>
              </PoseGroup>
            )}
          />
        </BrowserRouter>
      </>
    </ThemeProvider>
  </Provider>
)

export default AppRouter
