import React from "react";
import {browserHistory, Route} from "react-router";
import {useBasename} from "history";
import {App, Views} from "containers";
import BlockComponent from "containers/Views/BlockDetail/BlockComponent";
import TransactionDetailComponent from "containers/Views/TransactionDetail/TransactionDetailComponent";

export const history = getHistory()


const PageNotFound = () => (
    <section className="row" style={{marginBottom: '400px'}}>
        <h1>Nothing here!</h1>
    </section>
);


export const Routing = () => (
    <Route name="App" path='' component={App}>
        <Route name="Views" path="/" component={Views}/>
        <Route name="Block" path="/block/:height" component={BlockComponent}/>
        <Route name="Transaction" path="/tx/:hash" component={TransactionDetailComponent}/>
        <Route name="404" path="/*" component={PageNotFound}/>
    </Route>
)


function getHistory() {
    return useBasename(() => browserHistory)()
}
