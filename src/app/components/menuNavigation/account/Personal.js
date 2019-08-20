import React from "react";
// import axios from "axios";
import { Form, Input, Icon, Button } from "antd";
import "../../../css/Account.css";
//import openNotification from "../utils/OpenNotification";

class Personal_ extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],

    email: "",
    password: ""
  };

  handleChangeEmail = event => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  };

  handleChangePassword = event => {
    this.setState({
      ...this.state,
      password: event.target.value
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div style={{ padding: "20px", height: "335px" }}>
        <div style={{ background: "#ffffff", padding: "20px" }}>
          <Form className="login-form">
            <h1>Personal</h1>
            <h4>Account settings</h4>
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  {
                    required: true,
                    message: "Please input your username!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email"
                  onChange={this.handleChangeEmail}
                />
              )}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Please input your Password!"
                  }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChangePassword}
                />
              )}
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                className="save-email-password-button"
                onClick={this.handleSave}
                href="/home"
              >
                Save
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}
const Personal = Form.create()(Personal_);
export default Personal;
