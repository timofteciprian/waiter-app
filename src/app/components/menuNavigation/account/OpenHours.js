import React from "react";
import { InputNumber, Button } from "antd";
import "../../../css/Account.css";
import {
  postDetailsRestaurant,
  putDetailsRestaurant,
  getDetailsRestaurant
} from "../../../api/Account";

class OpenHours extends React.Component {
  state = {
    profileDetails: {},
    userId: "",
    openAt: "",
    closingAt: ""
  };

  componentDidMount() {
    this.getRestaurant();
  }
  createRestaurant = async () => {
    const { profileDetails } = this.state;
    const res = await postDetailsRestaurant(profileDetails);
    if (res) this.getRestaurant();
  };

  editDetailsRestaurant = async () => {
    const { profileDetails } = this.state;
    const res = await putDetailsRestaurant(profileDetails);
    if (res) this.getRestaurant();
  };

  getRestaurant = async () => {
    const userId = localStorage.getItem("userId");
    const data = await getDetailsRestaurant();
    console.log("data open hours:________>>>", data);
    if (data !== undefined) {
      this.setState({
        profileDetails: data,
        userId: userId
      });
    }
  };
  handleSubmitOpenHoursRestaurant = event => {
    const { profileDetails, userId } = this.state;
    event.preventDefault();
    if (profileDetails && userId) {
      this.editDetailsRestaurant();
    } else {
      this.createRestaurant();
    }
  };

  onChangeHourFrom = value => {
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        openAt: value
      }
    });
  };
  onChangeHourTo = value => {
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        closingAt: value
      }
    });
  };
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "20px",
            height: "292px",
            border: "1px solid #E6E4E4"
          }}
        >
          <h1>Open Hours</h1>
          <div style={{ paddingTop: "15px" }}>
            <span>
              <span style={{ marginLeft: "20px" }}>From:</span>
              <span>
                {" "}
                <InputNumber
                  style={{ marginLeft: "10px" }}
                  min={0}
                  max={24}
                  defaultValue={22}
                  value={this.state.profileDetails.openAt}
                  onChange={e => this.onChangeHourFrom(e)}
                />
              </span>
              <span style={{ marginLeft: "20px" }}>To:</span>
              <span>
                <InputNumber
                  style={{ marginLeft: "10px" }}
                  min={0}
                  max={24}
                  // defaultValue={10}
                  value={this.state.profileDetails.closingAt}
                  onChange={e => this.onChangeHourTo(e)}
                />
              </span>
            </span>
            <Button
              className="save-openHours-button"
              onClick={this.handleSubmitOpenHoursRestaurant}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default OpenHours;
