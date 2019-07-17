import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import { Route, Switch } from "react-router-dom";
import RegistrationForm from "./app/components/auth/Register";
import LoginForm from "./app/components/auth/Login";
import Home from "./app/components/Home";
import Navbar from "./app/components/Navbar";
import RegistrationRestaurantForm from "./app/components/auth/RegisterRestaurant";
import Restaurant from "./app/components/restaurant/Restaurant";
import ReservationTable from "./app/components/restaurant/ReservationTable";
import Menu from "./app/components/restaurant/Menu";

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
        <Route path="/restaurant" component={Restaurant} />
        <Route path="/reservationTable" component={ReservationTable} />
        <Route path="/menu" component={Menu} />
      </Switch>
    </div>
  );
}

export default App;
