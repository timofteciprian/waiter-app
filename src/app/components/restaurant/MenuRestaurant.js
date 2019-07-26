import React from "react";
import "antd/dist/antd.css";
import { Layout, Menu, List, Card } from "antd";
import { Link } from "react-router-dom";
import tableReservation from "../../../static/restaurant-table.png";
import menu from "../../../static/main.png";

const { Meta } = Card;
const { Header, Content } = Layout;

export default class MenuRestaurant extends React.Component {
  render() {
    return (
      <div style={styles.divStyle}>
        <Layout className="layout">
          <Header style={styles.headerStyle}>
            <div className="logo" />

            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["2"]}
              style={styles.divStyle}
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
            <div>
              <List
                grid={{ gutter: 12, column: 3 }}
                dataSource={data}
                style={styles.listStyle}
                renderItem={item => (
                  <List.Item>
                    <Card
                      hoverable
                      style={{ width: 240 }}
                      cover={<img alt="pizza" src={item.img} />}
                    >
                      <Meta title={item.title} description={item.descr} />
                    </Card>
                  </List.Item>
                )}
              />
            </div>
          </Content>
        </Layout>
      </div>
    );
  }
}

const styles = {
  tables: {
    width: "600px",
    display: "flex",
    flexWrap: "wrap"
  },
  listStyle: {
    width: "900px",
    marginLeft: "250px"
  },
  divStyle: {
    backgroundColor: "#605353",
    lineHeight: "130px"
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "#605353",
    height: "100%"
  },
  image: {
    width: "250px"
  }
};

const data = [
  {
    title: "Pizza 1",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 2",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 3",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 4",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 5",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 6",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  },
  {
    title: "Pizza 7",
    descr:
      "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
    img:
      "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
  }
];
