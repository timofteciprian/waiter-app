import React from "react";
import { Form, Input, Checkbox, Button, Row, Col, Icon } from "antd";
import axios from "axios";
import logo from "../../../static/logo.svg";
import imageLogin from "../../../static/imageLogin.png";
import "../../css/Register.css";
import ResponsiveImage from "../utils/ResponsiveImage";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      role: "admin",
      confirmDirty: false,
      autoCompleteResult: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
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
    const { email, password, role } = this.state;
    console.log({ email, password, role });
    axios
      .post(`http://localhost:3000/users/addUser`, { email, password, role })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value) => {
    return new Promise((resolve, reject) => {
      const { form } = this.props;
      if (value && value !== form.getFieldValue("password")) {
        reject("Two passwords that you enter is inconsistent!");
      } else {
        resolve();
      }
    });
  };

  validateToNextPassword = (rule, value) => {
    return new Promise((resolve, reject) => {
      const { form } = this.props;
      if (value && this.state.confirmDirty) {
        reject(form.validateFields(["confirm"], { force: true }));
      }
      resolve();
    });
  };

  render() {
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
              <div style={{ padding: "30px" }}>
                <span style={{ fontSize: "34px" }}>din </span>
                <span style={{ fontSize: "34px", color: "#FF6043" }}>out.</span>
                <p className="description">
                  Din out restaurant management page.
                </p>
              </div>
              <Form onSubmit={this.handleSubmit} className="register-form">
                <Form.Item>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        type: "email",
                        message: "The input is not valid E-mail!"
                      },
                      {
                        required: true,
                        message: "Please input your E-mail!"
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
                      placeholder="Email address"
                      onChange={this.handleChangeEmail}
                    />
                  )}
                </Form.Item>
                <Form.Item>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      }
                    ]
                  })(
                    <Input.Password
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
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please confirm your password!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(
                    <Input.Password
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      onBlur={this.handleConfirmBlur}
                    />
                  )}
                </Form.Item>

                <Form.Item>
                  {getFieldDecorator("agreement", {
                    valuePropName: "checked"
                  })(
                    <Checkbox>
                      I have read the <a href="/">agreement</a>
                    </Checkbox>
                  )}
                </Form.Item>
                <Form.Item>
                  <Button
                    className="buttonRegister"
                    type="primary"
                    htmlType="submit"
                    block
                  >
                    Register
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const RegistrationForm = Form.create({ name: "register" })(Register);
export default RegistrationForm;
