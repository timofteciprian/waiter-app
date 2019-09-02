import React from "react";
import { Form, Carousel, Avatar } from "antd";
import "../../../css/account/RestaurantPreview.css";
import { getDetailsRestaurantApi } from "../../../api/Account";

//import openNotification from "../utils/OpenNotification";

class RestaurantPreview extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    item: {},
    imagesUrl: [],
    logo: ""
  };

  componentDidMount() {
    this.getData();
    document.addEventListener("onRestaurantDetailsChange", ({ detail }) => {
      this.setState({
        item: detail,
        imagesUrl: detail.images,
        logo: detail.logo
      });
    });
  }

  onRestaurantDetailsChange = item => {
    console.log("item", item);
  };

  getData = async () => {
    const res = await getDetailsRestaurantApi();
    this.setState({ item: res, imagesUrl: res.images, logo: res.logo });
  };

  render() {
    const { item } = this.state;
    return (
      <div style={{ padding: "20px", paddingTop: 0 }}>
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            border: "1px solid #E6E4E4"
          }}
        >
          <h1>Restaurant Preview</h1>
          <Carousel
            className="carousel"
            dotPosition="top"
            // autoplay
            style={{ height: "auto" }}
          >
            {this.state.imagesUrl.map((image, index) => (
              <img
                key={index}
                className="responsive-image__image"
                alt="imageLogin"
                src={image}
              />
            ))}
          </Carousel>
          <Avatar shape="square" size={64} icon="user" src={item.logo} />
          {/* <div style={{ zIndex: "1000" }}> */}

          {/* </div> */}
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
