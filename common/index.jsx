import React from "react";
import {render} from "react-dom";
import {routerMiddleware, syncHistoryWithStore} from "react-router-redux";
import {composeWithDevTools} from "redux-devtools-extension";
import Perf from "react-addons-perf";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import RootReducer from "./reducers";
import {Root} from "components";
import {history, Routing} from "./routing";
import {createLogger} from "redux-logger";
import 'react-activity-indicator/src/activityindicator.css'
import "grommet/scss/vanilla/index";
import "bulma/css/bulma.css";


const configureStore = () => {
    let thunkApplied = applyMiddleware(thunk);
    let store;
    let middleware;

    if (process.env.NODE_ENV !== 'production') {
        window.Perf = Perf;
        thunkApplied = composeWithDevTools(thunkApplied);
        const logger = createLogger({
            collapsed: true
        });
        middleware = applyMiddleware(routerMiddleware(history), logger);
    } else {
        middleware = applyMiddleware(routerMiddleware(history));
    }

    store = createStore(RootReducer, thunkApplied, middleware);

    return store
};

const renderRoot = (Root) => {
    let store = configureStore();
    let syncedHistory = syncHistoryWithStore(history, store);
    render(
        <Root key={Math.random()}
              routes={Routing}
              history={syncedHistory}
              store={store}/>, document.getElementById('app'))
};

renderRoot(Root);

if (module.hot) {
    module.hot.accept()
}
