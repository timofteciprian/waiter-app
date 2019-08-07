import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import axios from "axios";
import { Redirect } from "react-router-dom";
import openNotification from "../utils/OpenNotification";
import "../../css/Login.css";
import logo from "../../../static/logo.svg";
import imageLogin from "../../../static/imageLogin.png";
import ResponsiveImage from "../utils/ResponsiveImage";

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
        console.log(res.data);
        localStorage.setItem("userToken", JSON.stringify(res.data.token));
        localStorage.setItem("user", JSON.stringify(res.data.user));
        console.log("ok");
        this.setState({ redirect: true });
      })
      .catch(err => {
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
      <div>
        <Row type="flex">
          <Col xs={24} sm={24} md={24} lg={17} xl={17}>
            <ResponsiveImage src={imageLogin} width={1140} height={800} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <div style={{ padding: "30px" }}>
              <ResponsiveImage src={logo} width={190} height={160} />
              <div>
                <span style={{ fontSize: "34px" }}>din </span>
                <span style={{ fontSize: "34px", color: "#FF6043" }}>out.</span>
                <p className="description">
                  Din out restaurant management page.
                </p>
              </div>
              <div>
                <Form className="login-form">
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
                          <Icon
                            type="user"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                          <Icon
                            type="lock"
                            style={{ color: "rgba(0,0,0,.25)" }}
                          />
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
                      className="login-form-button"
                      onClick={this.handleSubmit}
                      href="/home"
                    >
                      Sign in
                    </Button>
                    <div>
                      <a className="create-account" href="/register">
                        Create account
                      </a>
                      <a className="login-form-forgot" href="/">
                        Forgot password
                      </a>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);
export default LoginForm;

// const styles = {
//   titleStyle: {
//     display: "flex",
//     marginLeft: "190px",
//     marginTop: "50px"
//   },
//   divStyle: {
//     marginLeft: "450px",
//     width: "50%",
//     height: "10%"
//   },

//   formStyle: {
//     textAlign: "center",
//     width: "65%",
//     marginTop: "75px"
//   }
// };
