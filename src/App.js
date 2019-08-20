import React from "react";
import "./app/css/App.css";
import "antd/dist/antd.css";
import { Route, Redirect, Switch } from "react-router-dom";
import LoginForm from "./app/components/auth/Login";
import RegisterForm from "./app/components/auth/Register";
import Account from "./app/components/menuNavigation/account/Account";
import MenuSetup from "./app/components/menuNavigation/management/menuSetup/MenuSetup";
import ItemList from "./app/components/menuNavigation/management/ItemList";
import Home from "./app/components/menuNavigation/home/Home";
import Tables from "./app/components/menuNavigation/management/Tables";
import AppLayout from "./app/components/AppLayout";
//import backgroundImg from "./static/Din-out-logo.png";

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <AppLayout>
            <Component {...props} authed={authed} />
          </AppLayout>
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              props: props,
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

function PublicRoute({ component: Component, ...rest }) {
  return <Route {...rest} render={props => <Component {...props} />} />;
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authed: false
    };
  }
  render() {
    const token = localStorage.getItem("userToken");
    const authenticated = !!token;

    return (
      <div className="App">
        <Switch>
          {/* <Route exact path="/" component={Home} /> */}
          <PublicRoute
            authed={authenticated}
            exact
            path="/login"
            component={LoginForm}
          />
          <PublicRoute
            authed={authenticated}
            path="/register"
            component={RegisterForm}
          />
          <PrivateRoute
            authed={authenticated}
            exact
            path="/home"
            component={Home}
          />
          <PrivateRoute
            authed={authenticated}
            path="/account"
            component={Account}
          />
          <PrivateRoute
            authed={authenticated}
            path="/management/menuSetup"
            component={MenuSetup}
          />
          <PrivateRoute
            authed={authenticated}
            path="/management/itemList"
            component={ItemList}
          />
          <PrivateRoute
            authed={authenticated}
            path="/management/tables"
            component={Tables}
          />
        </Switch>
      </div>
    );
  }
}
