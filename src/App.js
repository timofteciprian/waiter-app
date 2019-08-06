import React from "react";

import "./App.css";
import "antd/dist/antd.css";
import { Route, Redirect, Switch } from "react-router-dom";
import { Layout } from "antd";
import LoginForm from "./app/components/auth/Login";
import RegistrationForm from "./app/components/auth/Register";
import SiderContent from "./app/components/menuNavigation/Sider";
import Account from "./app/components/menuNavigation/Account";
import AddItem from "./app/components/menuNavigation/management/MenuCategories";
import ItemList from "./app/components/menuNavigation/management/ItemList";
import HeaderContent from "./app/components/menuNavigation/Header";
import Home from "./app/components/menuNavigation/home/Home";
//import backgroundImg from "./static/Din-out-logo.png";

const { Header, Sider, Content } = Layout;

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        authed === true ? (
          <Layout>
            <Header style={{ padding: "0" }}>
              <HeaderContent />
            </Header>
            <Layout>
              <Sider>
                {" "}
                <SiderContent />
              </Sider>
              <Content>
                <Component {...props} authed={authed} />
              </Content>
            </Layout>
          </Layout>
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
            component={RegistrationForm}
          />
          <PrivateRoute
            authed={authenticated}
            exact
            path="/home"
            component={Home}
          />
          <PrivateRoute
            authed={authenticated}
            path="/menuManagement/account"
            component={Account}
          />
          <PrivateRoute
            authed={authenticated}
            path="/menuManagement/addItem"
            component={AddItem}
          />
          <PrivateRoute
            authed={authenticated}
            path="/menuManagement/listMenu"
            component={ItemList}
          />
        </Switch>
      </div>
    );
  }
}
