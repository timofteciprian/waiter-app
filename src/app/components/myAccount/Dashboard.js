import React from "react";
import Sider from "./Sider";
import { Form, Input, Layout, TimePicker, Upload, Icon, Select } from "antd";
import { Button } from "antd";
import moment from "moment";

const { Content } = Layout;
const { TextArea } = Input;
const { Option } = Select;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Dashboard_ extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    profileDetailsModalVisible: false,
    profileDetails: {
      restaurantName: "",
      description: "",
      email: "",
      country: "",
      city: "",
      streetAddress: "",
      zipCode: "",
      phoneNo: "",
      logo: "",
      time: "",
      images: "",
      retaurantType: ""
    }
    // profilesDetails: [
    //   {
    //     restaurantName: "",
    //     description: "",
    //     username: "",
    //     email: "",
    //     country: "",
    //     city: "",
    //     streetAddress: "",
    //     zipCode: "",
    //     phoneNo: "",
    //     logo: "",
    //     webSiteUrl: "",
    //     facebookUrl: "",
    //     time: "",
    //     retaurantType: ""
    //   }
    // ]
  };
  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };

  // handleOkProfileDetails = e => {
  //   const newProfilesDetails = this.state.profilesDetails.slice();
  //   newProfilesDetails.push(this.state.editingProfileDetails);
  //   console.log(this.state.editingProduct);
  //   this.setState({
  //     profilesDetails: newProfilesDetails,
  //     profileDetailsModalVisible: false
  //   });
  // };
  handleOkProducts = () => {
    const newProducts = this.state.products.slice();
    newProducts.push(this.state.editingProduct);
    this.setState({
      products: newProducts,
      productsModalVisible: false
    });
  };
  onAttributeChange = (propertyName, value) => {
    console.log(value);
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        [propertyName]: value
      }
    });
    console.log(this.state.profileDetails);
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
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;

    return (
      <div>
        <div style={styles.divStyle}>
          <Layout className="layout">
            {/* <Header style={styles.headerStyle} >
              s
            </Header> */}
            <Content>
              <div style={{ display: "flex" }}>
                <Sider />

                <div>
                  <h1>Details Profile</h1>
                  <p>Name Restaurant:</p>
                  <div style={styles.inputStyle}>
                    <TextArea
                      rows={1}
                      onChange={e =>
                        this.onAttributeChange("restaurantName", e.target.value)
                      }
                    />
                  </div>
                  <p>Phone Number:</p>
                  <TextArea
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("phoneNo", e.target.value)
                    }
                  />
                  <p>Description:</p>
                  <TextArea
                    rows={3}
                    onChange={e =>
                      this.onAttributeChange("description", e.target.value)
                    }
                  />
                  <Form
                    {...formItemLayout}
                    onSubmit={this.handleSubmit}
                    className="signup-form"
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
                      })(<Input />)}
                    </Form.Item>
                  </Form>
                  <p>Country:</p>
                  <TextArea
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("country", e.target.value)
                    }
                  />
                  <p>City:</p>
                  <TextArea
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("city", e.target.value)
                    }
                  />
                  <p>Street Address:</p>
                  <TextArea
                    rows={2}
                    onChange={e =>
                      this.onAttributeChange("streetAddress", e.target.value)
                    }
                  />
                  <p>Zipcode:</p>
                  <TextArea
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("zipCode", e.target.value)
                    }
                  />
                  <p>Logo:</p>
                  <input type="file" onChange={this.fileSelectedHendler} />
                  <button onClick={this.fileUploadHendler}>Upload</button>
                  <div className="clearfix">
                    <Upload
                      name="avatar"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={this.handleChange}
                    >
                      {imageUrl ? (
                        <img
                          src={imageUrl}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButton
                      )}
                    </Upload>
                  </div>
                  <p>Time:</p>
                  From:
                  <TimePicker defaultValue={moment("9:00:00", "HH:mm:ss")} />
                  To:
                  <TimePicker defaultValue={moment("22:00:00", "HH:mm:ss")} />
                  <div style={{ marginTop: "20px" }}>
                    <p>Restaurant Type:</p>
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      placeholder="Select a type of restaurant"
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value="jack">Romanian</Option>
                      <Option value="lucy">Chinese</Option>
                      <Option value="tom">Greek</Option>
                    </Select>
                  </div>
                  <Button
                    type="primary"
                    onClick={this.handleSubmit}
                    style={{ marginTop: "30px" }}
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

const Dashboard = Form.create()(Dashboard_);
export default Dashboard;

const styles = {
  inputStyle: {
    width: "500px"
  },
  formStyle: {
    marginTop: "35px"
  }
};
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
