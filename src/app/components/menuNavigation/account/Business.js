import React from "react";
import axios from "axios";
import { Input, Upload, Icon, Button, Modal } from "antd";
import "../../../css/Account.css";

//import openNotification from "../utils/OpenNotification";

const { TextArea } = Input;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Business extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    type: "",
    restaurantTypes: [
      "Indian",
      "Romanian",
      "Vegetarian",
      "Greek",
      "Italian",
      "Chinese",
      "Traditional"
    ],
    profileDetails: {},
    restaurantId: "",
    userToken: ""
  };

  componentDidMount() {
    this.getRestaurant();
  }

  handleChange = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageUrl,
          loading: false
        })
      );
    }
  };
  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChangeImage = ({ fileList }) => this.setState({ fileList });

  editDetailsRestaurant = () => {
    const {
      profileDetails: {
        restaurantType,
        restaurantName,
        restaurantDescription,
        county,
        city,
        postalCode,
        streetAddress
      },
      restaurantId,
      userToken
    } = this.state;

    axios
      .patch(
        `http://localhost:3000/restaurants/${restaurantId}`,
        {
          restaurantType,
          restaurantName,
          restaurantDescription,
          county,
          city,
          postalCode,
          streetAddress
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        console.log("responseEdit:", res.data);
      })
      .catch(err => {
        console.log("errrr:", err.response);
        // openNotification(
        //   err.response.data.message + " " + err.response.status,
        //   "",
        //   "frown"
        // );
      });
  };

  initialDetailsRestaurant = () => {
    const {
      profileDetails: {
        restaurantType,
        restaurantName,
        restaurantDescription,
        county,
        city,
        postalCode,
        streetAddress
      }
    } = this.state;
    const token = localStorage.getItem("userToken");
    axios
      .post(
        `http://localhost:3000/restaurants/addRestaurant`,
        {
          restaurantType,
          restaurantName,
          restaurantDescription,
          county,
          city,
          postalCode,
          streetAddress
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log("response initial details request", res.data);
        localStorage.setItem("restaurantId", res.data._id);
        this.setState({ restaurantId: res.data._id });
      })
      .catch(err => {
        console.log(err.response);
        // openNotification(
        //   err.response.data.message + " " + err.response.status,
        //   "",
        //   "frown"
        // );
      });
  };

  handleSubmit = event => {
    const { profileDetails, restaurantId } = this.state;
    event.preventDefault();
    if (profileDetails && restaurantId) {
      this.editDetailsRestaurant();
    } else {
      this.initialDetailsRestaurant();
    }
  };

  getRestaurant = () => {
    const userToken = localStorage.getItem("userToken");
    const userId = localStorage.getItem("userId");
    const restaurantId = localStorage.getItem("restaurantId");
    this.setState({ userToken: userToken, restaurantId: restaurantId });
    axios
      .get(
        `http://localhost:3000/restaurantByUserId/${userId}`,

        {
          headers: {
            Authorization: `Bearer ${userToken}`
          }
        }
      )
      .then(res => {
        localStorage.setItem("restaurantId", res.data._id);
        const data = res.data;
        this.setState({ profileDetails: data });
      })
      .catch(err => {
        console.log("errrr:", err.response);
        // openNotification(
        //   err.response.data.message + " " + err.response.status,
        //   "",
        //   "frown"
        // );
      });
  };

  onAttributeChange = (propertyName, value) => {
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        [propertyName]: value
      }
    });
  };

  setRestaurantType = value => {
    this.setState({ type: value });
  };

  addRestaurantType = () => {
    const type = this.state;
    let newListRestaurantTypes = this.state.restaurantTypes.slice();
    newListRestaurantTypes.push(type);

    this.setState({
      restaurantTypes: newListRestaurantTypes,
      type: ""
    });
  };

  render() {
    const uploadButtonLogo = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { imageUrl } = this.state;
    const { previewVisible, previewImage } = this.state;

    const uploadButtonImage = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { profileDetails } = this.state;
    return (
      <div>
        <div style={{ padding: "20px", paddingTop: 0 }}>
          <div style={{ background: "#ffffff", padding: "20px" }}>
            <div>
              <div style={{ display: "flex" }}>
                <div>
                  <h1>Business</h1>
                  <h4>Restaurant information</h4>
                  <div style={{ marginTop: "20px" }}>
                    <p>Restaurant Type:</p>
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap"
                      }}
                    >
                      {this.state.restaurantTypes.map((item, index) => (
                        <div
                          key={index}
                          style={{
                            padding: "5px"
                          }}
                        >
                          <Button
                            onClick={() =>
                              this.onAttributeChange("restaurantType", item)
                            }
                          >
                            {item}
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        padding: "5px"
                      }}
                    >
                      <TextArea
                        value={this.state.type}
                        rows={1}
                        onChange={e => this.setRestaurantType(e.target.value)}
                      />
                      <Button onClick={this.addRestaurantType}>+ Add</Button>
                    </div>
                  </div>
                  <p>Name Restaurant:</p>
                  <div>
                    <TextArea
                      rows={1}
                      value={profileDetails.restaurantName}
                      onChange={e =>
                        this.onAttributeChange("restaurantName", e.target.value)
                      }
                    />
                  </div>
                  <p>Description:</p>
                  <TextArea
                    rows={3}
                    value={profileDetails.restaurantDescription}
                    onChange={e =>
                      this.onAttributeChange(
                        "restaurantDescription",
                        e.target.value
                      )
                    }
                  />
                  <p>County:</p>
                  <TextArea
                    value={profileDetails.county}
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("county", e.target.value)
                    }
                  />
                  <p>City:</p>
                  <TextArea
                    value={profileDetails.city}
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("city", e.target.value)
                    }
                  />
                  <p>Street Address:</p>
                  <TextArea
                    value={profileDetails.streetAddress}
                    rows={2}
                    onChange={e =>
                      this.onAttributeChange("streetAddress", e.target.value)
                    }
                  />
                  <p>Postal code:</p>
                  <TextArea
                    value={profileDetails.postalCode}
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("postalCode", e.target.value)
                    }
                  />
                  <div style={{ marginTop: "20px" }}>
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
                          uploadButtonLogo
                        )}
                      </Upload>
                    </div>
                  </div>

                  <div className="clearfix" style={{ marginTop: "20px" }}>
                    <p>Images: </p>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      onPreview={this.handlePreview}
                      onChange={this.handleChangeImage}
                    >
                      {uploadButtonImage}
                    </Upload>
                    <Modal
                      visible={previewVisible}
                      footer={null}
                      onCancel={this.handleCancel}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>

                  <Button
                    className="save-details-button"
                    type="primary"
                    onClick={this.handleSubmit}
                  >
                    Save
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Business;
