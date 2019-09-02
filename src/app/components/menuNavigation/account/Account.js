import React from "react";
import { Row, Col } from "antd";
import Personal from "./Personal";
import "../../../css/Account.css";
import OpenHours from "./OpenHours";
import Business from "./Business";
import RestaurantPreview from "./RestaurantPreview";
import logo from "../../../../static/logoBackground.svg";
//import openNotification from "../utils/OpenNotification";

class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      restaurantPreviewRef: null
    };
  }

  render() {
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #E6E4E4",
          background: `url(${logo}) center no-repeat `
        }}
      >
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Personal />
          </Col>

          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <OpenHours />
          </Col>
        </Row>
        <Row>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <Business restaurantPreviewRef={this.state.restaurantPreviewRef} />
          </Col>
          <Col xs={24} sm={24} md={12} lg={10} xl={8}>
            <RestaurantPreview
              ref={r =>
                !this.state.restaurantPreviewRef &&
                this.setState({ restaurantPreviewRef: r })
              }
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Account;
