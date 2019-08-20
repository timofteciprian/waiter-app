import React from "react";
// import axios from "axios";
import { InputNumber, Select, Icon, Button } from "antd";
import "../../../css/Account.css";
//import openNotification from "../utils/OpenNotification";

const { Option } = Select;

class OpenHours extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],

    openHours: [
      {
        day: "mon-fri",
        from: "10",
        to: "22"
      },
      {
        day: "saturday",
        from: "12",
        to: "23"
      }
    ]
  };

  // componentDidMount() {
  //   this.setState({ openHours });
  // }

  onChangeDay = (value, indexSelect) => {
    let newOpenHours = this.state.openHours.slice();
    this.state.openHours.map((item, index) => {
      if (indexSelect === index) {
        newOpenHours[index].day = value;
      }
    });
    this.setState({ openHours: newOpenHours });
  };

  onChangeHourFrom = (value, indexSelect) => {
    let newOpenHours = this.state.openHours.slice();
    this.state.openHours.map((item, index) => {
      if (indexSelect === index) {
        newOpenHours[index].from = value;
      }
    });
    this.setState({ openHours: newOpenHours });
  };

  onChangeHourTo = (value, indexSelect) => {
    let newOpenHours = this.state.openHours.slice();
    this.state.openHours.map((item, index) => {
      if (indexSelect === index) {
        newOpenHours[index].to = value;
      }
    });
    this.setState({ openHours: newOpenHours });
  };

  delete = index => {
    var array = [...this.state.openHours];
    if (index !== -1) {
      array.splice(index, 1);
      this.setState({ openHours: array });
    }
  };

  addDay = () => {
    let newOpenHours = this.state.openHours.slice();
    newOpenHours.push({ day: "", from: "", to: "" });
    this.setState({ openHours: newOpenHours });
  };

  render() {
    return (
      <div style={{ padding: "20px", paddingLeft: 0 }}>
        <div
          style={{
            background: "#ffffff",
            padding: "20px",
            height: "291px"
          }}
        >
          <h1>Open Hours</h1>
          <div className="listOpenHours">
            {this.state.openHours.map((item, index) => (
              <div key={index} style={{ paddingTop: "15px" }}>
                <span>
                  <span>
                    <Select
                      showSearch
                      style={{ width: 125 }}
                      value={item.day}
                      placeholder="Select day"
                      optionFilterProp="children"
                      onChange={e => this.onChangeDay(e, index)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="mon-fri">Mon-Fri</Option>
                      <Option value="mon-sun">Mon-Sun</Option>
                      <Option value="sat-sun">Sat-Sun</Option>
                      <Option value="monday">Monday</Option>
                      <Option value="tuesday">Tuesday</Option>
                      <Option value="wednesday">Wednesday</Option>
                      <Option value="thursday">Thursday</Option>
                      <Option value="friday">Friday</Option>
                      <Option value="saturday">Saturday</Option>
                      <Option value="sunday">Sunday</Option>
                    </Select>
                  </span>
                  <span style={{ marginLeft: "20px" }}>From:</span>
                  <span>
                    {" "}
                    <InputNumber
                      style={{ marginLeft: "10px" }}
                      min={1}
                      max={100000}
                      defaultValue={22}
                      value={item.from}
                      onChange={e => this.onChangeHourFrom(e, index)}
                    />
                  </span>
                  <span style={{ marginLeft: "20px" }}>To:</span>
                  <span>
                    <InputNumber
                      style={{ marginLeft: "10px" }}
                      min={1}
                      max={100000}
                      defaultValue={10}
                      value={item.to}
                      onChange={e => this.onChangeHourTo(e, index)}
                    />
                  </span>
                  <span style={{ marginLeft: "20px" }}>
                    <Button
                      onClick={() => this.delete(index)}
                      style={{ borderColor: "#ffffff" }}
                    >
                      <Icon type="close-circle" />
                    </Button>
                  </span>
                </span>
              </div>
            ))}
          </div>
          <Button
            onClick={() => this.addDay()}
            style={{
              marginTop: "15px",
              backgroundColor: "#ff6043",
              borderColor: "#ff6043",
              color: "#ffffff"
            }}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default OpenHours;
