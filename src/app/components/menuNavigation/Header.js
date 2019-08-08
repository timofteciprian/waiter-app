import React from "react";
import logo from "../../../static/Din-out-logo.png";
import "../../css/Header.css";
import { Row, Col, Button, Icon } from "antd";
import ResponsiveImage from "../utils/ResponsiveImage";

export function getCollapse() {
  return this.state.collapsed;
}

class HeaderContent extends React.Component {
  state = {
    collapsed: false
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };
  handleSubmit = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  render() {
    return (
      <div style={{ background: "white" }}>
        <Row>
          <Col
            xs={{ span: 2, offset: 1 }}
            sm={{ span: 1, offset: 2 }}
            md={{ span: 0, offset: 0 }}
            lg={{ span: 0, offset: 0 }}
            xl={{ span: 0, offset: 0 }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Col>
          <Col
            xs={{ span: 13, offset: 2 }}
            sm={{ span: 10, offset: 8 }}
            md={{ span: 10, offset: 9 }}
            lg={{ span: 6, offset: 0 }}
            xl={{ span: 4, offset: 0 }}
          >
            <ResponsiveImage
              src={logo}
              width={199}
              height={66}
              className="logo"
              alt="logo"
            />
          </Col>
          <Col xs={0} sm={2} md={2} lg={16} xl={18} />

          <Col xs={3} sm={4} md={3} lg={2} xl={2}>
            <Button className="logOut-form-button" onClick={this.handleSubmit}>
              Log Out
            </Button>
          </Col>
        </Row>
      </div>
    );
  }
}
export default HeaderContent;
