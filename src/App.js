import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import LoginForm from "./app/components/auth/Login";
import RegistrationForm from "./app/components/auth/RegisterRestaurant";
import SiderContent from "./app/components/menuNavigation/Sider";
import Account from "./app/components/menuNavigation/Account";
import AddItem from "./app/components/menuNavigation/management/MenuCategories";
import ItemList from "./app/components/menuNavigation/management/ItemList";
import HeaderContent from "./app/components/menuNavigation/Header";
import Home from "./app/components/menuNavigation/Home";
//import backgroundImg from "./static/Din-out-logo.png";

const { Header, Sider, Content } = Layout;

function App() {
  return (
    <div className="App">
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
            <Switch>
              {/* <Route exact path="/" component={Home} /> */}
              <Route exact path="/" component={LoginForm} />
              <Route path="/registerRestaurant" component={RegistrationForm} />
              <Route exact path="/home" component={Home} />
              <Route path="/menuManagement/account" component={Account} />
              <Route path="/menuManagement/addItem" component={AddItem} />
              <Route path="/menuManagement/listMenu" component={ItemList} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
}

export default App;
