import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

const Navbar = () => {
  return (
    <Layout className="layout">
      <Header style={style.headerStyle}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          defaultSelectedKeys={["2"]}
          style={{ lineHeight: "64px", backgroundColor: "#4D4141" }}
        >
          <Menu.Item>
            <a href="/">Logo</a>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item style={style.loginStyle}>
            <Link to="/login">Login</Link>
          </Menu.Item>
        </Menu>
      </Header>
    </Layout>
  );
};

export default Navbar;

const style = {
  loginStyle: {
    marginLeft: "1000px",
    width: "75px",
    height: "20%"
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "#4D4141"
  }
};
