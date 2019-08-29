import React from "react";
import axios from "axios";
import { Tabs, Button, Icon } from "antd";
import InfoItems from "./InfoItems";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "../../../css/ItemList.css";

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
    this.getData();
  }

  getData = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:9000/menu/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const list = res.data;
        this.setState({ listCategories: list });
      });
  };

  // onChangeStatus = (newStatus, id) => {

  //   listCategories = this.listCategories.map(item => {
  //     if(id === item._id){

  //     }
  //   )}
  // };

  statusDisplay = (status, id) => (
    <span>
      <span>
        <Button
          // onClick={this.onChangeStatus(true, id)}
          style={{
            color: "#ffffff",
            backgroundColor: status === true ? "#00bfb2" : "#FF5059"
          }}
        >
          Active
        </Button>
      </span>
      <span>
        <Button
          onClick={this.onChangeStatus}
          style={{
            color: "#ffffff",
            backgroundColor: status === false ? "#00bfb2" : "#FF5059"
          }}
        >
          Inactive
        </Button>
      </span>
    </span>
  );

  displayDate = date => {
    return date.substring(0, 10);
  };

  // listCompleted = data.map(item => (
  //   <Column title={item.name} dataIndex={item.name} key={item.name} />
  // ));
  render() {
    const { listCategories } = this.state;
    console.log(listCategories);
    return (
      <div>
        <InfoItems />
        <div style={{ padding: "20px", paddingTop: 0 }}>
          <div style={{ backgroundColor: "#ffffff", padding: "20px" }}>
            <Tabs defaultActiveKey="0" onChange={callback}>
              {this.state.listCategories.map((el, index) => (
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
                          <Td>{item.status}</Td>
                        </Tr>
                      ))}
                    </Tbody>
                  </Table>
                </TabPane>
              ))}
            </Tabs>
          </div>
        </div>
        {/* 
        <div style={{ padding: "20px" }}>
          <Row>
            <Col
              xs={{ span: 24, order: 1 }}
              sm={{ span: 24, order: 1 }}
              md={{ span: 24, order: 1 }}
              lg={{ span: 24, order: 1 }}
              xl={{ span: 24, order: 1 }}
            >
              <div>
                <div style={{ background: "#ffffff" }}>
                  <Tabs defaultActiveKey="1" onChange={callback}>
                    <TabPane tab="All items" key="1">
                      <div style={{ paddingTop: "20px" }}>
                        <div style={{ backgroundColor: "#ffffff" }}>
                          <Table columns={columns} dataSource={data} />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Pasta" key="2">
                      <div style={{ paddingTop: "20px" }}>
                        <div style={{ backgroundColor: "#ffffff" }}>
                          <Table columns={columns} dataSource={data} />
                        </div>
                      </div>
                    </TabPane>
                    <TabPane tab="Pizza" key="3">
                      ...
                    </TabPane>
                    <TabPane tab="Sushi" key="4">
                      <div style={{ paddingTop: "20px" }}>
                        <div style={{ backgroundColor: "#ffffff" }}>
                          <Table columns={columns} dataSource={data} />
                        </div>
                      </div>
                    </TabPane>
                  </Tabs>
                </div>
              </div>
            </Col>
          </Row>
        </div> */}
      </div>
    );
  }
}

export default ItemList;
