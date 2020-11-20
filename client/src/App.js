import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Helmet } from 'react-helmet'

import PrivateRoute from './components/PrivateRoute'

import Landing from './views/landing/'
import Dashboard from './views/dashboard/'
import Login from './views/login/'

import store from './store'
// import setAuthToken from './utils/setAuthToken';
import { SET_USER } from './actions/types'
import isEmpty from './utils/isEmpty'

// Check for user credentials in local storage (in-case app is reloaded/reopened)
if (!isEmpty(localStorage.userCredentials)) {
  // setAuthToken(localStorage.userCredentials);
  store.dispatch({
    type: SET_USER,
    payload: {
      isAuthenticated: true,
      userCredentials: JSON.parse(localStorage.userCredentials),
    },
  })
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Helmet>
          <title>Twittive</title>
        </Helmet>
        <Switch>
          <Route exact path="/landing" component={Landing} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          {/* Default route */}
          <Route component={Landing} />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
