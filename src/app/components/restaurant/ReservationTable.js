import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu } from "antd";
import { Link } from "react-router-dom";
import table from "../../../static/Group.svg";
import tableReservation from "../../../static/restaurant-table.png";
import menu from "../../../static/main.png";
import Example from "./setTablesInRestaurant/example";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";

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
          <Content>
            <DndProvider backend={HTML5Backend}>
              <Example />
            </DndProvider>
            <div style={style.tables}>
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
              <img src={table} alt="table" style={{ margin: 20 }} />
            </div>
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
