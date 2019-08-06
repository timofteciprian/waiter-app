import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import openNotification from "../utils/utils";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      email: "",
      password: "",
      redirect: false
    };
    //handleSubmit = this.handleSubmit.bind();
  }

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

  handleSubmit = event => {
    event.preventDefault();
    const { email, password } = this.state;

    axios
      .post(`http://localhost:3000/users/login`, { email, password })
      .then(res => {
        this.setState({ redirect: true });
        // this.setState({ authUser });
        // localStorage.setItem("authUser", JSON.stringify(this.state.authUser));
        console.log("ok");
      })
      .catch(err => {
        console.log("err data:", err.response.data);
        console.log("err.status:", err.response.status);
        console.log("err:", err.response);
        openNotification(
          err.response.data.message + " " + err.response.status,
          "",
          "frown"
        );
      });
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/home" />;
    }

    const { getFieldDecorator } = this.props.form;
    return (
      <div style={styles.divStyle}>
        <h1 style={styles.titleStyle}>Sign in</h1>
        <div>
          <Form
            // onSubmit={this.handleSubmit}
            className="login-form"
            style={styles.formStyle}
          >
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Please input your username!" }
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
                  { required: true, message: "Please input your Password!" }
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
              {getFieldDecorator("remember", {
                valuePropName: "checked",
                initialValue: true
              })(<Checkbox>Remember me</Checkbox>)}
              <a className="login-form-forgot" href="/">
                Forgot password
              </a>
              <Button
                href=""
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={this.handleSubmit}
              >
                Sign in
              </Button>
              <div style={{ textAlign: "center" }}>
                <p>Or </p>

                <a href="/register">Register restaurant</a>
              </div>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);
export default LoginForm;

const styles = {
  titleStyle: {
    display: "flex",
    marginLeft: "190px",
    marginTop: "50px"
  },
  divStyle: {
    marginLeft: "450px",
    width: "50%",
    height: "10%"
  },

  formStyle: {
    textAlign: "center",
    width: "65%",
    marginTop: "75px"
  }
};
