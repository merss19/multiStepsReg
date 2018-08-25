import * as React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {ConnectedRouter} from 'react-router-redux';
import configureStore from './store';
import history from './history';
import PageLogin from './pages/PageLogin';
import PagePasswordRestore from './pages/PagePasswordRestore';
import PageSignUp from './pages/PageSignUp';
import TodayTask from './pages/PageTodayTask';
import PageProfile from './pages/PageProfile';
import {ProtectedRoute} from 'modules/Auth';
import NoMatch from './components/NoMatch'

const store = configureStore();

const Root = (): JSX.Element => (
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={PageLogin}/>
        <Route path="/restore" render={() => <PagePasswordRestore/>}/>
        <Route path="/signup" render={() => <PageSignUp/>}/>
        <ProtectedRoute path='/task' component={TodayTask}/>
        <ProtectedRoute path="/profile" component={PageProfile}/>
        <Route component={NoMatch}/>
      </Switch>
    </ConnectedRouter>
  </Provider>
);

export default Root