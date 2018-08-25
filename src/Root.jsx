"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_redux_1 = require("react-redux");
var react_router_dom_1 = require("react-router-dom");
var react_router_redux_1 = require("react-router-redux");
var store_1 = require("./store");
var history_1 = require("./history");
var PageLogin_1 = require("./pages/PageLogin");
var PagePasswordRestore_1 = require("./pages/PagePasswordRestore");
var PageSignUp_1 = require("./pages/PageSignUp");
var PageTodayTask_1 = require("./pages/PageTodayTask");
var PageProfile_1 = require("./pages/PageProfile");
var Auth_1 = require("modules/Auth");
var NoMatch_1 = require("./components/NoMatch");
var store = store_1.default();
var Root = function () { return (<react_redux_1.Provider store={store}>
    <react_router_redux_1.ConnectedRouter history={history_1.default}>
      <react_router_dom_1.Switch>
        <react_router_dom_1.Route exact path="/" component={PageLogin_1.default}/>
        <react_router_dom_1.Route path="/restore" render={function () { return <PagePasswordRestore_1.default />; }}/>
        <react_router_dom_1.Route path="/signup" render={function () { return <PageSignUp_1.default />; }}/>
        <Auth_1.ProtectedRoute path='/task' component={PageTodayTask_1.default}/>
        <Auth_1.ProtectedRoute path="/profile" component={PageProfile_1.default}/>
        <react_router_dom_1.Route component={NoMatch_1.default}/>
      </react_router_dom_1.Switch>
    </react_router_redux_1.ConnectedRouter>
  </react_redux_1.Provider>); };
exports.default = Root;
