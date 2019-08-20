import React from "react";
import { Row, Col } from "antd";
import Personal from "./Personal";
import "../../../css/Account.css";
import OpenHours from "./OpenHours";
import Business from "./Business";
//import RestaurantPreview from "./RestaurantPreview";

//import openNotification from "../utils/OpenNotification";

class Account extends React.Component {
  state = {
    loading: false
  };

  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <Personal />
          </Col>

          <Col span={10}>
            <OpenHours />
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Business />
          </Col>
          <Col span={10}>{/* <RestaurantPreview /> */}</Col>
        </Row>
      </div>
    );
  }
}

export default Account;
