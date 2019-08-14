import React from "react";
import logo from "../../../static/Din-out-logo.png";
import "../../css/Header.css";
import { Row, Col, Button, Icon } from "antd";
import ResponsiveImage from "../utils/ResponsiveImage";

class HeaderContent extends React.Component {
  toggle = () => {
    const { onMenuCollapse, isMenuCollapsed } = this.props;
    if (onMenuCollapse) {
      onMenuCollapse(!isMenuCollapsed);
    }
  };
  handleSubmit = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
  render() {
    const { isMenuCollapsed: collapsed } = this.props;
    return (
      <div style={{ background: "white" }}>
        <Row>
          <Col
            xs={{ span: 2, offset: 1 }}
            sm={{ span: 1, offset: 1 }}
            md={{ span: 1, offset: 1 }}
            lg={{ span: 0, offset: 0 }}
            xl={{ span: 0, offset: 0 }}
          >
            <Icon
              className="trigger"
              type={collapsed ? "menu-unfold" : "menu-fold"}
              onClick={this.toggle}
            />
          </Col>
          <Col
            xs={{ span: 13, offset: 2 }}
            sm={{ span: 10, offset: 7 }}
            md={{ span: 10, offset: 7 }}
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
          <Col
            xs={{ span: 3, offset: 0 }}
            sm={{ span: 3, offset: 2 }}
            md={{ span: 3, offset: 2 }}
            lg={{ span: 2, offset: 16 }}
            xl={{ span: 2, offset: 18 }}
          >
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
