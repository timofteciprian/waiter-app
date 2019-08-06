import React from "react";
import { Form, Input, Checkbox, Button } from "antd";
import axios from "axios";

class RegisterRestaurant extends React.Component {
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

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0
        },
        sm: {
          span: 16,
          offset: 8
        }
      }
    };

    return (
      <div style={styles.divStyle}>
        <h1 style={styles.titleStyle}>Registration restaurant</h1>
        <Form
          {...formItemLayout}
          onSubmit={this.handleSubmit}
          style={styles.formStyle}
        >
          <Form.Item label="E-mail">
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
            })(<Input onChange={this.handleChangeEmail} />)}
          </Form.Item>
          <Form.Item label="Password" hasFeedback>
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
            })(<Input.Password onChange={this.handleChangePassword} />)}
          </Form.Item>
          <Form.Item label="Confirm Password" hasFeedback>
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
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>

          <Form.Item {...tailFormItemLayout}>
            {getFieldDecorator("agreement", {
              valuePropName: "checked"
            })(
              <Checkbox>
                I have read the <a href="/">agreement</a>
              </Checkbox>
            )}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const RegistrationRestaurantForm = Form.create({ name: "register" })(
  RegisterRestaurant
);
export default RegistrationRestaurantForm;

const styles = {
  titleStyle: {
    display: "flex",
    marginLeft: "150px",
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
