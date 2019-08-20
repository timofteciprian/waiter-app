import React from "react";
import axios from "axios";
import { Form } from "antd";
import "../../../css/account/RestaurantPreview.css";
import CarouselSlider from "react-carousel-slider";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

//import openNotification from "../utils/OpenNotification";

class RestaurantPreview extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    item: {}
  };

  // componentDidMount() {
  //   this.getData();
  // }

  // getData = () => {
  //   const idRestaurant = localStorage.getItem("idMenu");
  //   console.log(idRestaurant);
  //   const token = localStorage.getItem("userToken");
  //   axios
  //     .get(`http://localhost:3000/restaurant`, {
  //       headers: { Authorization: `Bearer ${token}` }
  //     })
  //     .then(res => {
  //       const data = res.data;
  //       this.setState({ item: data });
  //     });
  // };

  render() {
    //const { item } = this.state;

    return (
      <div style={{ padding: "20px", paddingLeft: 0, paddingTop: 0 }}>
        <div
          style={{
            background: "#ffffff",
            padding: "20px"
          }}
        >
          <h1>Restaurant Preview</h1>
          <AwesomeSlider>
            {item.image.map(image => (
              <div data-src={image} />
            ))}
          </AwesomeSlider>
          <h2 style={{ marginTop: "40px" }}>{item.restaurantName}</h2>
          <p>{item.restaurantType}</p>
          <p>{item.restaurantDescription}</p>
          <p>{item.streetAddress}</p>
        </div>
      </div>
    );
  }
}
const RestaurantPreview_ = Form.create()(RestaurantPreview);
export default RestaurantPreview_;

const item = {
  restaurantType: "Romanian",
  restaurantName: "Marty restaurant",
  restaurantDescription:
    "safada  sda asdas  sad asd sa d as d sad sad asd s das das d sad assadasd",
  county: "Cluj",
  city: "Cluj-Napoca",
  postalCode: 123213,
  image: [
    "https://cdn.start-up.ro/img/thumbs/_misc/df3be71308e57b4d0797966338de4f87/1280x670-10-80.jpg?v=1523445341",
    "http://www.martyrestaurants.com/wp-content/gallery/marty-city-gallery/7k6c4994.jpg",
    "http://www.martyrestaurants.com/wp-content/gallery/marty-westside-gallery-3/7k6c0366.jpg"
  ],
  logo: "",
  streetAddress: "Str Ooo"
};
