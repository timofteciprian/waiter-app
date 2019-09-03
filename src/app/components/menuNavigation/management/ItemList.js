import React from "react";
import { Tabs, Button, Icon } from "antd";
import InfoItems from "./InfoItems";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../../../css/ItemList.css";
import { getFoodMenu, putStatusApi } from "../../../api/Management";

const { TabPane } = Tabs;

function callback(key) {
  console.log(key);
}

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategories: []
    };
  }

  componentDidMount() {
    this.getMenuItems();
  }

  getMenuItems = async () => {
    const res = await getFoodMenu();
    if (res !== undefined) {
      this.setState({ listCategories: res });
    }
  };

  onChangeStatus = (newStatus, id) => {
    const { listCategories } = this.state;
    let newListCategories = listCategories.slice();
    listCategories.forEach((el, indexEl) => {
      el.dishes.forEach((item, index) => {
        if (item.id === id)
          newListCategories[indexEl].dishes[index].status = newStatus;
      });
    });
    this.setState({ listCategories: newListCategories });
    putStatusApi(newStatus, id);
  };

  statusDisplay = (status, id) => {
    let backgroundColorActive = "";
    let backgroundColorInnactive = "";
    let colorActive = "";
    let colorInnactive = "";
    if (status === "active") {
      backgroundColorActive = "#00bfb2";
      backgroundColorInnactive = "#ffffff";
      colorInnactive = "#080808";
      colorActive = "#ffffff";
    } else {
      backgroundColorActive = "#ffffff";
      colorActive = "#080808";
      backgroundColorInnactive = "#FF5059";
      colorInnactive = "#ffffff";
    }

    return (
      <span>
        <span>
          <Button
            onClick={() => this.onChangeStatus("active", id)}
            style={{
              color: colorActive,
              backgroundColor: backgroundColorActive
            }}
          >
            Active
          </Button>
        </span>
        <span>
          <Button
            onClick={() => this.onChangeStatus("innactive", id)}
            style={{
              color: colorInnactive,
              backgroundColor: backgroundColorInnactive
            }}
          >
            Inactive
          </Button>
        </span>
      </span>
    );
  };

  displayDate = date => {
    return date.substring(0, 10);
  };

  render() {
    const { listCategories } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#ffffff",
          borderTop: "1px solid #E6E4E4"
        }}
      >
        <InfoItems />
        <div style={{ padding: "20px", paddingTop: 0 }}>
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "20px",
              border: "1px solid #E6E4E4"
            }}
          >
            <Tabs defaultActiveKey="0" onChange={callback}>
              {listCategories.map((el, index) => (
                <TabPane tab={el.foodCategory} key={index}>
                  <Table>
                    <Thead>
                      <Tr>
                        <Th className="title">Category</Th>
                        <Th className="title">Title</Th>
                        <Th className="title">Date added</Th>
                        <Th className="title">Price</Th>
                        <Th className="title">Grammage</Th>
                        <Th className="title">Edit</Th>
                        <Th className="title">Status</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {el.dishes.map((item, indexItem) => (
                        <Tr key={indexItem}>
                          <Td>{el.foodCategory}</Td>
                          <Td>{item.title}</Td>
                          <Td>{this.displayDate(item.createdAt)}</Td>
                          <Td>{item.price}lei</Td>
                          <Td>{item.weight}g</Td>
                          <Td>
                            <Button href="#">
                              <Icon type="edit" />
                            </Button>
                          </Td>
                          <Td>{this.statusDisplay(item.status, item.id)}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
      </div>
    );
  }
}

export default ItemList;
