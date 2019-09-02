import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import { Button, Modal } from "antd";
import { getReservationsApi, getOrderApi } from "../../../../api/Home";

class ViewAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      visible: false,
      dataOrder: {},
      name: "",
      items: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const res = await getReservationsApi();
    if (res !== undefined) {
      this.procesessReservations(res);
    }
  };

  procesessReservations = data => {
    const newData = [];
    data.map(item => {
      const name = item.clientId.firstName + " " + item.clientId.lastName;
      const newItem = {
        ...item,
        name,
        tableType: "",
        arrival: ""
      };
      if (item.cash === true) {
        newItem.cash = "Yes";
      } else {
        newItem.cash = "No";
      }
      const res = item.arrivingAt.split("T");
      newItem.arrivingAt = res[0];

      const arrival = res[1].split(".");
      newItem.arrival = arrival[0];

      if (item.status === "active") {
        newData.push(newItem);
      }
      return newData;
    });
    this.setState({ data: newData });
  };

  handleCancelModal = e => {
    console.log(e);
    this.setState({
      visible: false
    });
  };

  // showModal = id => {
  //   this.setState({
  //     visible: true
  //   });
  //   this.getDataOrder(id);
  // };

  getDataOrder = async id => {
    const res = await getOrderApi(id);
    if (res !== undefined) {
      this.setState({ dataOrder: res, items: res.itemIds });
    }
    // this.procesessDataOrder(data);
  };

  // getDateOrder = datee => {
  //   console.log(datee);
  //   const res = datee.split("T");
  //   const d = res[0];
  //   return d;
  // };

  render() {
    return (
      <Table>
        <Thead>
          <Tr>
            <Th className="title">Name</Th>
            <Th className="title">Arrival</Th>
            <Th className="title">Date</Th>
            <Th className="title">Nr. of seats</Th>
            <Th className="title">Cash</Th>
            <Th className="title">Amount</Th>
            {/* <Th className="title">Table type</Th> */}
            <Th className="title">Status</Th>
          </Tr>
        </Thead>
        <Tbody>
          {this.state.data.map((item, indexItem) => (
            <Tr key={indexItem}>
              <Td>{item.name}</Td>
              <Td>{item.arrival}</Td>
              <Td>{item.arrivingAt}</Td>
              <Td>{item.nrSeats}</Td>
              <Td>{item.cash}</Td>
              {/* <Td>{item.tableType}</Td> */}
              <Td>
                <div>
                  <Button onClick={() => this.showModal(item.order[0].id)}>
                    {item.order[0].id}
                  </Button>
                  <Modal
                    title="Basic Modal"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancelModal}
                  >
                    {/* <p>Order:{item.order[0].id}</p> */}
                    {/* <p>{this.getDateOrder(this.state.dataOrder.createdAt)}</p> */}
                    <Table>
                      <Thead>
                        <Tr>
                          <Th className="title">Name</Th>
                          <Th className="title">Price</Th>
                        </Tr>
                      </Thead>
                      <Tbody>
                        {this.state.items.map((el, index) => (
                          <Tr key={index}>
                            <Td>{el.title}</Td>
                            <Td>{el.price}</Td>
                          </Tr>
                        ))}
                      </Tbody>
                    </Table>
                    <p>Amount:{this.state.dataOrder.amount}lei</p>
                  </Modal>
                </div>
              </Td>
              <Td>{item.status}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      // <Table columns={columns} dataSource={this.state.data} />
    );
  }
}

export default ViewAll;
