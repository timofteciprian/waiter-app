import React from "react";
import axios from "axios";
import { Form, Avatar, Carousel } from "antd";
import ResponsiveImage from "../../utils/ResponsiveImage";
import "../../../css/account/RestaurantPreview.css";

//import openNotification from "../utils/OpenNotification";

class RestaurantPreview extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    item: {},
    imagesUrl: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const token = localStorage.getItem("token");
    const restaurantId = localStorage.getItem("restaurantId");
    axios
      .get(`http://localhost:9000/restaurants/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const data = res.data;
        this.setState({ item: data, imagesUrl: data.images });

        console.log("data----->", data);
      });
  };

  render() {
    const { item } = this.state;
    return (
      <div style={{ padding: "20px", paddingLeft: 0, paddingTop: 0 }}>
        <div
          style={{
            background: "#ffffff",
            padding: "20px"
          }}
        >
          <h1>Restaurant Preview</h1>
          <Carousel className="carousel" autoplay>
            {this.state.imagesUrl.map((image, index) => (
              <div key={index}>
                <ResponsiveImage src={image} width={1200} height={800} />
              </div>
            ))}
          </Carousel>
          <h2 style={{ marginTop: "40px" }}>{item.name}</h2>
          <p>{item.category}</p>
          <p>{item.description}</p>
          <p>{item.address}</p>
        </div>
      </div>
    );
  }
}
const RestaurantPreview_ = Form.create()(RestaurantPreview);
export default RestaurantPreview_;
