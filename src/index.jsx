"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_dom_1 = require("react-dom");
var react_hot_loader_1 = require("react-hot-loader");
var Root_1 = require("./Root");
function renderApp() {
    react_dom_1.render(<react_hot_loader_1.AppContainer>
      <Root_1.default />
    </react_hot_loader_1.AppContainer>, document.getElementById('root'));
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
}
else {
    renderApp();
}
//const end = performance.now();
//console.log('sum time', end - start); 
