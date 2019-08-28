import React from "react";
import axios from "axios";
import { Input, Upload, Icon, Button, Modal, message } from "antd";
import { storageRef } from "../../../lib/firebase";
import "../../../css/Account.css";

//import openNotification from "../utils/OpenNotification";

const { TextArea } = Input;

class Business extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    loadingLogo: false,
    confirmDirty: false,
    logoUrl: "",
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
    profileDetails: {
      description: "",
      country: "",
      city: "",
      address: "",
      postalCode: 0,
      logo: "",
      images: [],
      openAt: 0,
      closingAt: 0
    },
    restaurantId: "",
    token: "",
    userId: ""
  };

  componentDidMount() {
    this.getRestaurant();
  }

  initialDetailsRestaurant = () => {
    this.setState({
      profileDetails: {
        openAt: 10,
        closingAt: 22
      }
    });
    const {
      profileDetails: {
        name,
        description,
        country,
        city,
        address,
        postalCode,
        //logo,
        // images,
        openAt,
        closingAt
      }
    } = this.state;
    const token = localStorage.getItem("token");
    axios
      .post(
        `http://localhost:9000/restaurants`,
        {
          name,
          description,
          country,
          city,
          address,
          postalCode,
          //logo,
          // images,
          openAt,
          closingAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log("response initial details request", res.data);
        localStorage.setItem("restaurantId", res.data.id);
        this.getRestaurant();
      })
      .catch(err => {
        console.log("errr initial:", err.response);
      });
  };

  editDetailsRestaurant = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const {
      profileDetails: {
        name,
        description,
        country,
        city,
        address,
        postalCode,
        // logo,
        images,
        openAt,
        closingAt
      },
      token
    } = this.state;
    // console.log(images);
    axios
      .put(
        `http://localhost:9000/restaurants/${restaurantId}`,
        {
          name,
          description,
          country,
          city,
          address,
          postalCode,
          // logo,
          images,
          openAt,
          closingAt
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log("responseEdit:", res.data);
        this.getRestaurant();
      })
      .catch(err => {
        console.log("errrredit:", err.response);
        console.log("errrr:", err);
      });
  };

  handleSubmitDetailsRestaurant = event => {
    const { profileDetails, userId } = this.state;
    event.preventDefault();
    if (profileDetails && userId) {
      this.editDetailsRestaurant();
    } else {
      this.initialDetailsRestaurant();
    }
  };

  getRestaurant = () => {
    const token = localStorage.getItem("token");
    this.setState({ token: token });
    axios
      .get(
        `http://localhost:9000/restaurants/owned`,

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        const userId = localStorage.getItem("userId");
        localStorage.setItem("restaurantId", res.data.id);
        const data = res.data;
        this.setState({
          profileDetails: data,
          userId: userId
        });
        console.log(data);
      })
      .catch(err => {
        console.log("errrr:", err);
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

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUpload = ({ fileList }) => {
    this.setState({ fileList });
  };

  onSaveImages = async () => {
    const newImagesUrl = this.state.profileDetails.images.slice();
    for (let i = 0; i < this.state.fileList.length; i++) {
      const imageData = this.state.fileList[i];
      console.log(
        "this.state.fileList---------------->",
        this.state.fileList[i]
      );
      const response = await storageRef
        .child(
          `images/${imageData.originFileObj.uid}.${
            imageData.type.split("/")[1]
          }`
        )
        .putString(
          this.state.fileList[i].thumbUrl.split("base64,")[1],
          "base64"
        );
      const imageUrl = await response.task.snapshot.ref.getDownloadURL();
      newImagesUrl.push(imageUrl);
    }
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        images: newImagesUrl
      }
    });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
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
                  </div>
                  <p>Name Restaurant:</p>
                  <div>
                    <TextArea
                      rows={1}
                      value={profileDetails.name}
                      onChange={e =>
                        this.onAttributeChange("name", e.target.value)
                      }
                    />
                  </div>
                  <p>Description:</p>
                  <TextArea
                    rows={3}
                    value={profileDetails.description}
                    onChange={e =>
                      this.onAttributeChange("description", e.target.value)
                    }
                  />
                  <p>Country:</p>
                  <TextArea
                    value={profileDetails.country}
                    rows={1}
                    onChange={e =>
                      this.onAttributeChange("country", e.target.value)
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
                    value={profileDetails.address}
                    rows={2}
                    onChange={e =>
                      this.onAttributeChange("address", e.target.value)
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
                  <div>
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreview}
                      onChange={this.handleUpload}
                      beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                    >
                      {uploadButton}
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
                    onClick={this.onSaveImages}
                  >
                    Save Images
                  </Button>
                  <Button
                    className="save-details-button"
                    type="primary"
                    onClick={this.handleSubmitDetailsRestaurant}
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
