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
import RegisterSelect from "./app/components/auth/RegisterSelect";
import ProfileRestaurant from "./app/components/profile/profileRestaurant";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/registerSelect" component={RegisterSelect} />
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
        <Route path="/profileRestaurant" component={ProfileRestaurant} />
      </Switch>
    </div>
  );
}

export default App;
