import * as React from "react";
import { Route, Router, Switch } from "react-router-dom";
import Auth from "../utils/auth0/Auth";
import history from "../utils/history";
import App from "./App";
import Callback from "./Callback";
import Home from "./Home";

const auth = new Auth();

// const handleAuthentication = (props) => {
//   if (/access_token|id_token|error/.test(props.location.hash)) {
//     auth.handleAuthentication();
//   }
// };

const Routes = () => (
  <Router history={history}>
    <Switch>
    <Route
      exact={true}
      path="/"
      render={
        // tslint:disable-next-line:jsx-no-lambda
        props => <App {...props} />
      }
      />
    <Route
      path="/home"
      // tslint:disable-next-line:jsx-no-lambda
      render={props => <Home auth={auth} {...props} />}
      />
    <Route
      path="/callback"
      // tslint:disable-next-line:jsx-no-lambda
      render={props => {
        if (/access_token|id_token|error/.test(props.location.hash)) {
          auth.handleAuthentication();
        }
        return <Callback {...props} />;
      }}
      />
      </Switch>
  </Router>
);

export default Routes;
