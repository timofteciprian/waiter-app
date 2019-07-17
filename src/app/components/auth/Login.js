import React from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

class Login extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div style={style.divStyle}>
        <h1 style={style.titleStyle}>Sign in</h1>
        <div>
          <Form
            onSubmit={this.handleSubmit}
            className="login-form"
            style={style.formStyle}
          >
            <Form.Item>
              {getFieldDecorator("username", {
                rules: [
                  { required: true, message: "Please input your username!" }
                ]
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Username"
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
                //href="#"
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Sign in
              </Button>
              <div style={{ textAlign: "center" }}>
                Or <a href="/register ">register now!</a>
              </div>
            </Form.Item>
            <Button type="primary">
              <a href="/">Client</a>
            </Button>
            <Button type="primary">
              <a href="/">Admin</a>
            </Button>
            <div style={{ textAlign: "center", marginTop: "100px" }}>
              <a href="/registerRestaurant ">
                Do you want to register a restaurant?
              </a>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}

const LoginForm = Form.create({ name: "normal_login" })(Login);
export default LoginForm;

const style = {
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
