import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import tableReservation from "../../../static/restaurant-table.png";
import menu from "../../../static/main.png";

const { Header, Content } = Layout;
export default class Restaurant extends React.Component {
  render() {
    return (
      <div style={style.divStyle}>
        <Layout className="layout">
          <Header style={style.headerStyle}>
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={style.divStyle}
            >
              <Menu.Item>
                <Link to="/restaurant/reservationTable">
                  <img
                    src={tableReservation}
                    alt="table"
                    style={{ margin: 20, width: "50px" }}
                  />
                  Reservation the table
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/restaurant/menu">
                  <img
                    src={menu}
                    alt="menu"
                    style={{ margin: 20, width: "50px" }}
                  />
                  Menu
                </Link>
              </Menu.Item>
            </Menu>
          </Header>
          <Content>a</Content>
        </Layout>
      </div>
    );
  }
}

const style = {
  divStyle: {
    backgroundColor: "#605353",
    lineHeight: "130px"
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "#605353",
    height: "100%"
  }
};
