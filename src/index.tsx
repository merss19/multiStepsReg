import * as React from 'react';
import {render} from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import Root from './Root';

function renderApp() {
  render(
    <AppContainer>
      <Root/>
    </AppContainer>,
    document.getElementById('root')
  )
}

/*
const startApp = () => {
    const session = getToken()

    if(session){
      store.dispatch()
    } else {
      renderApp()
    }
}
*/
//const start= performance.now();
if (module.hot) {
  module.hot.accept();
  renderApp();
} else {
  renderApp();
}
//const end = performance.now();
//console.log('sum time', end - start);