import React from "react";
import { Row, Col, Button, Icon, Input, Card, InputNumber, Select } from "antd";
import "../../../css/Tables.css";

const { TextArea } = Input;
const { Option } = Select;
const ButtonGroup = Button.Group;

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberTables: 2,
      value: 0,
      isTableShown: false,
      index: 0,
      tables: [
        {
          name: "Table 1",
          nrSeats: 2,
          location: "inside"
        },
        {
          name: "Table 2",
          nrSeats: 4,
          location: "outside"
        }
      ]
    };
  }

  // setValue = value => {
  //   this.setState({ numberTables: value });
  // };

  setNumberTables = value => {
    this.setState({
      value
    });
  };

  addTables = () => {
    const numberTables = this.state.numberTables;
    const valueNumber = Number(this.state.value);
    const number = valueNumber + numberTables;
    this.setState({ numberTables: number });
    let newTables = this.state.tables.slice();
    for (let i = numberTables; i < number; i++) {
      newTables.push({
        name: `Table ${i + 1}`,
        seats: 0,
        location: ""
      });
      this.setState({ tables: newTables });
    }
  };

  // onChangeLocation = value => {
  //   console.log(value);
  //   const { index } = this.state;
  //   const table = this.state.tables[index];
  //   const { tables } = this.state;
  //   tables.map((item, indexTable) =>{
  //     if(index === indexTable){
  //       table.location =
  //     }
  //   })
  //   // this.setState({
  //   //   table[this.state.index]:value
  //   // })
  // };

  viewDetailsTable = () => {
    const { index } = this.state;
    const table = this.state.tables[index];
    return (
      <div>
        <Card
          size="small"
          title={table.name}
          style={{ width: 300, marginTop: "150px", marginLeft: "30px" }}
        >
          <div style={{ padding: "20px" }}>
            <span>
              <span>
                <p>Add seats</p>
                <InputNumber
                  min={1}
                  max={10}
                  value={table.nrSeats}
                  defaultValue={2}
                  // onChange={onChangeSeats}
                />
              </span>
            </span>
            <p>Location</p>
            <Select
              showSearch
              value={table.location}
              style={{ width: 200 }}
              placeholder="Select location"
              onChange={this.onChangeLocation}
            >
              <Option value="inside">Inside</Option>
              <Option value="outside">Outside</Option>
            </Select>
          </div>
        </Card>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div style={{ padding: "20px" }}>
          <Row>
            <Col span={14}>
              <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
                <h1>Add tables</h1>
                <span>
                  <span>
                    <Button className="button-minus">
                      <Icon type="minus-circle" />
                    </Button>
                  </span>
                  <span>
                    <TextArea
                      //value={this.state.numberTables}
                      rows={1}
                      style={{ width: "100px" }}
                      onChange={e => this.setNumberTables(e.target.value)}
                    />
                  </span>
                  <span>
                    <Button className="button-plus">
                      <Icon type="plus-circle" />
                    </Button>
                  </span>
                  <span>
                    <Button className="button-add" onClick={this.addTables}>
                      Add
                    </Button>
                  </span>
                </span>
                <p style={{ paddingTop: "20px" }}>Table customization</p>
                <div>
                  {this.state.tables.map((item, index) => (
                    <div key={index}>
                      <div className="containerTables">
                        <ButtonGroup size="large">
                          <Button className="buttonTableDelete" size="large">
                            x
                          </Button>
                          <Button
                            className="buttonTableView"
                            size="large"
                            onClick={() =>
                              this.setState({
                                isTableShown: !this.state.isTableShown,
                                index: index
                              })
                            }
                          >
                            {item.name}
                            <Icon type="right" />
                          </Button>
                        </ButtonGroup>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Col>

            <Col span={10}>
              {this.state.isTableShown ? this.viewDetailsTable() : null}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Tables;
