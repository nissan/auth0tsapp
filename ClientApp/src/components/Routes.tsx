import * as React from "react";
import { Route, Router } from "react-router-dom";
import history from "../utils/history";
import App from "./App";
const Routes = () => (
  <Router history={history}>
    <Route 
      exact={true} 
      path="/" 
      render={
        // tslint:disable-next-line:jsx-no-lambda
        props => 
        <App {...props} />
        } 
      />
  </Router>
);

export default Routes;
