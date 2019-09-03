import React from "react";
import { Form, Icon, Input, Button, Row, Col } from "antd";
import { Redirect } from "react-router-dom";
import "../../css/Login.css";
import logo from "../../../static/logo.svg";
import image from "../../../static/imageLogin.png";
import { ResponsiveImage } from "../../utils/General";
import { forgotPasswordApi } from "../../api/LoginAndRegister";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authUser: null,
      email: "",
      // redirect: false,
      redirectAfterPass: false
    };
  }

  handleChangeEmail = event => {
    this.setState({
      ...this.state,
      email: event.target.value
    });
  };

  handleSubmit = async event => {
    event.preventDefault();
    const { email } = this.state;
    const res = await forgotPasswordApi(email);
    if (res) {
      this.setState({ redirectAfterPass: true });
    }
  };

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.redirectAfterPass) {
      return <Redirect to="/login" />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <Row type="flex">
          <Col xs={24} sm={24} md={24} lg={17} xl={17}>
            <ResponsiveImage src={image} width={1140} height={800} />
          </Col>
          <Col xs={24} sm={24} md={24} lg={7} xl={7}>
            <div style={{ padding: "30px" }}>
              <ResponsiveImage src={logo} width={190} height={160} />
              <div>
                <span style={{ fontSize: "34px" }}>din </span>
                <span style={{ fontSize: "34px", color: "#FF6043" }}>out.</span>
                <p className="description-dinOut">
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
                    <p className="description-forgotPass">
                      You receive an email with the new password and you can
                      change it in the application.
                    </p>
                  </Form.Item>

                  <Form.Item>
                    <Button
                      type="primary"
                      className="login-form-button"
                      onClick={this.handleSubmit}
                    >
                      Recover Password
                    </Button>
                    <div>
                      <a className="create-account" href="/login">
                        Sign In
                      </a>
                      <a className="login-form-forgot" href="/register">
                        Create Account
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

const ForgotPassForm = Form.create({ name: "normal_recover" })(ForgotPassword);
export default ForgotPassForm;
