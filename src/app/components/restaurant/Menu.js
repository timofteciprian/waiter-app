import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, Avatar } from "antd";
import { Link } from "react-router-dom";
import tableReservation from "../../../static/restaurant-table.png";
import menu from "../../../static/main.png";

const { Header, Content } = Layout;
export default class ReservationTable extends React.Component {
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
              <Avatar src="http://www.rainbowlogos.com/wp-content/uploads/2016/05/1-3-800x600.jpg" />

              <Menu.Item>
                <Link to="/reservationTable">
                  <img
                    src={tableReservation}
                    alt="table"
                    style={{ margin: 20, width: "50px" }}
                  />
                  Reservation the table
                </Link>
              </Menu.Item>
              <Menu.Item>
                <Link to="/menu">
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
          <Content>
            <div>b</div>
          </Content>
        </Layout>
      </div>
    );
  }
}

const style = {
  tables: {
    width: "600px",
    display: "flex",
    flexWrap: "wrap"
  },
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
