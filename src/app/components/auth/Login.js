import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { Redirect } from "react-router-dom";
//import openNotification from "../utils/OpenNotification";
import "../../css/Login.css";
import logo from "../../../static/logo.svg";
import imageLogin from "../../../static/imageLogin.png";
import { ResponsiveImage } from "../../utils/General";
import { login } from "../../api/LoginAndRegister";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      email: "",
      password: "",
      redirect: false
    };
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

  handleSubmit = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const loggedIn = await login(email, password);
    if (loggedIn) this.setState({ redirect: true });
  };

  render() {
    console.log(this.state.redirect);
    if (this.state.redirect) {
      return <Redirect to="/" />;
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
