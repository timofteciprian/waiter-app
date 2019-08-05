import React from "react";
import logo from "../../../static/Din-out-logo.png";
import "../../css/Header.css";
import { Row, Col } from "antd";

class HeaderContent extends React.Component {
  render() {
    return (
      <div style={{ background: "white" }}>
        <Row>
          <Col span={4}>
            <img src={logo} alt="Logo" className="logo" />
          </Col>
        </Row>
      </div>
    );
  }
}
export default HeaderContent;
