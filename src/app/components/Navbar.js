import React from "react";
import { Layout, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";

const { Header } = Layout;

export default class Navbar extends React.Component {
  render() {
    return (
      <div>
        <Layout className="layout">
          <Header style={styles.headerStyle}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={{ lineHeight: "64px", backgroundColor: "#4D4141" }}
            >
              <Menu.Item>
                <a href="/">
                  {" "}
                  <Avatar src="http://www.rainbowlogos.com/wp-content/uploads/2016/05/1-3-800x600.jpg" />
                </a>
              </Menu.Item>
              <Menu.Item>
                <Link to="/">Home</Link>
              </Menu.Item>
              <Menu.Item style={styles.loginButtonStyle}>
                <Link to="/login">Login</Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/myAccount/dashboard">My Account</Link>
              </Menu.Item>
            </Menu>
          </Header>
        </Layout>
      </div>
    );
  }
}

const styles = {
  loginButtonStyle: {
    marginLeft: "1000px",
    width: "75px",
    height: "20%"
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "#4D4141"
  }
};
