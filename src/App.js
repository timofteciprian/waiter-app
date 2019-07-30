import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Route, Switch } from "react-router-dom";
import RegistrationForm from "./app/components/auth/Register";
import LoginForm from "./app/components/auth/Login";
import Home from "./app/components/Home";
import RegistrationRestaurantForm from "./app/components/auth/RegisterRestaurant";
import Restaurant from "./app/components/restaurant/Restaurant";
import ReservationTable from "./app/components/restaurant/ReservationTable";
import MenuRestaurant from "./app/components/restaurant/MenuRestaurant";
//import MyAccount from "./app/components/myAccount/MyAccount";
import Navbar from "./app/components/Navbar";
import Sider from "./app/components/myAccount/Sider";
import Dashboard from "./app/components/myAccount/Dashboard";
import AddItem from "./app/components/myAccount/menu/AddItemMenu";
import ListMenu from "./app/components/myAccount/menu/ListMenu";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginForm} />
        <Route path="/register" component={RegistrationForm} />
        <Route
          path="/registerRestaurant"
          component={RegistrationRestaurantForm}
        />
        <Route exact path="/restaurant" component={Restaurant} />
        <Route
          path="/restaurant/reservationTable"
          component={ReservationTable}
        />
        <Route path="/restaurant/menu" component={MenuRestaurant} />
        {/* <Route path="/myAccount" component={MyAccount} /> */}
        <Route exact path="/myAccount" component={Sider} />
        <Route path="/myAccount/dashboard" component={Dashboard} />
        <Route path="/myAccount/addItem" component={AddItem} />
        <Route path="/myAccount/listMenu" component={ListMenu} />
      </Switch>
    </div>
  );
}

export default App;
