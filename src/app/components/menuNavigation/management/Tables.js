import React from "react";
import { Row, Col, Button, Icon, Input, Card, InputNumber, Select } from "antd";
import "../../../css/Tables.css";
import {
  createTableApi,
  getTableApi,
  putTableApi,
  deleteTableApi
} from "../../../api/Management";
const { TextArea } = Input;
const { Option } = Select;
const ButtonGroup = Button.Group;

class Tables extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numberTables: 2,
      name: "",
      isTableShown: false,
      index: 0,
      tables: [],
      table: {},
      delete: false
    };
  }
  componentDidMount() {
    this.getTables();
  }

  getTables = async () => {
    const res = await getTableApi();
    if (res !== undefined) {
      console.log(res);
      this.setState({ tables: res });
    }
  };

  setNameTables = value => {
    this.setState({
      name: value
    });
  };

  addTables = async () => {
    const name = this.state.name;
    const nrSeats = 0;
    const location = "";
    const res = await createTableApi(name, nrSeats, location);
    let newTables = this.state.tables.slice();
    newTables.push({
      name,
      nrSeats,
      location,
      id: res.id
    });
    this.setState({ tables: newTables });
  };

  onChangeLocation = value => {
    const { index } = this.state;
    const newTables = this.state.tables.slice();
    const { tables } = this.state;
    tables.forEach((item, indexTable) => {
      if (index === indexTable) {
        newTables[index].location = value;
        this.setState({
          table: {
            ...this.state.table,
            location: value,
            name: item.name,
            id: item.id
          }
        });
      }
    });
    this.setState({
      tables: newTables
    });
  };
  onChangeNrSeats = value => {
    const { index } = this.state;
    const newTables = this.state.tables.slice();
    const { tables } = this.state;
    tables.forEach((item, indexTable) => {
      if (index === indexTable) {
        newTables[index].nrSeats = value;
        console.log("table seats", item);
        this.setState({
          table: {
            ...this.state.table,
            nrSeats: value,
            name: item.name,
            id: item.id
          }
        });
      }
    });
    this.setState({
      tables: newTables
    });
  };

  handleSubmitTable = () => {
    const { table } = this.state;
    console.log(table);
    putTableApi(table.id, table.name, table.location, table.nrSeats);
  };

  deleteTable = item => {
    const { tables } = this.state;
    const newTables = tables.slice();
    tables.forEach((table, index) => {
      if (table === item) newTables.splice(index, 1);
    });
    this.setState({ tables: newTables });
    deleteTableApi(item.id);
  };

  viewDetailsTable = () => {
    const { index } = this.state;
    const table = this.state.tables[index];
    console.log("---->>", table);
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
                  min={0}
                  max={30}
                  value={this.state.table.nrSeats}
                  defaultValue={2}
                  onChange={this.onChangeNrSeats}
                />
              </span>
            </span>
            <p>Location</p>
            <Select
              showSearch
              value={this.state.table.location}
              style={{ width: 200 }}
              placeholder="Select location"
              onChange={this.onChangeLocation}
            >
              <Option value="inside">Inside</Option>
              <Option value="outside">Outside</Option>
            </Select>
            <Button
              style={{ marginTop: "20px" }}
              className="save-details-button"
              type="primary"
              onClick={this.handleSubmitTable}
            >
              Save
            </Button>
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
                    <TextArea
                      placeholder="Add name table"
                      rows={1}
                      style={{ width: "100px" }}
                      onChange={e => this.setNameTables(e.target.value)}
                    />
                  </span>
                  <span>
                    <Button
                      className="button-add-table"
                      onClick={this.addTables}
                    >
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
                          <Button
                            className="buttonTableDelete"
                            size="large"
                            onClick={() => this.deleteTable(item)}
                          >
                            x
                          </Button>
                          <Button
                            className="buttonTableView"
                            size="large"
                            onClick={() =>
                              this.setState({
                                isTableShown: !this.state.isTableShown,
                                index: index,
                                table: item
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
