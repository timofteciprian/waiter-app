import React from "react";
import { Input, Upload, Icon, Button, Modal, Spin } from "antd";
import "../../../css/Account.css";
import {
  putDetailsRestaurant,
  postDetailsRestaurant,
  getDetailsRestaurant,
  getUrlImagesFromFirebase,
  getUrlImageFromFirebase,
  getBase64
} from "../../../api/Account";

//import openNotification from "../utils/OpenNotification";

const { TextArea } = Input;

class Business extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    loadingLogo: false,
    restaurantTypes: [
      "raw vegan",
      "italian",
      "chinese",
      "indian",
      "vegetarian",
      "romanian",
      "traditional"
    ],
    profileDetails: { images: [] },
    userId: "",
    imageBase64: "",
    file: {},
    images: [],
    logo: "",
    loadingSpin: true
  };

  componentDidMount() {
    this.getRestaurantDetails();
  }

  submitCreateRestaurant = async () => {
    const { profileDetails } = this.state;
    const res = await postDetailsRestaurant(profileDetails);
    if (res) this.getRestaurantDetails();
  };

  submitEditDetailsRestaurant = async () => {
    const { profileDetails } = this.state;
    document.dispatchEvent(
      new CustomEvent("onRestaurantDetailsChange", { detail: profileDetails })
    );
    const res = await putDetailsRestaurant(profileDetails);
    console.log(res);
    if (res) this.getRestaurantDetails();
  };

  handleSubmitDetailsRestaurant = event => {
    const { profileDetails, userId } = this.state;
    event.preventDefault();
    if (profileDetails && userId) {
      this.submitEditDetailsRestaurant();
    } else {
      this.submitCreateRestaurant();
    }
  };

  getRestaurantDetails = async () => {
    const userId = localStorage.getItem("userId");
    const data = await getDetailsRestaurant();
    if (data !== undefined) {
      this.setState({
        profileDetails: data,
        images: data.images,
        logo: data.logo,
        userId: userId,
        loadingSpin: false
      });
    }
  };

  onAttributeChange = (propertyName, value) => {
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        [propertyName]: value
      }
    });
  };

  handleCancelImages = () => this.setState({ previewVisible: false });

  handlePreviewImages = file => {
    console.log("tumbUrl", file.thumbUrl);
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true
    });
  };

  handleUploadImages = async ({ fileList }) => {
    console.log(fileList);
    this.setState({ fileList });
    const newImagesUrl = this.state.profileDetails.images.slice();
    const imagesUrl = await getUrlImagesFromFirebase(newImagesUrl, fileList);
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        images: imagesUrl
      }
    });
  };

  handleChangeLogo = info => {
    if (info.file.status === "uploading") {
      this.setState({ loadingLogo: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        file: info.file
      });
      getBase64(info.file.originFileObj, async base64 => {
        const logoUrl = await getUrlImageFromFirebase(base64, info.file);
        this.setState({
          profileDetails: {
            ...this.state.profileDetails,
            logo: logoUrl
          },
          imageBase64: base64,
          loadingLogo: false
        });
      });
    }
  };

  deleteImage = indexImage => {
    console.log(indexImage);
    const newImages = this.state.images.slice();
    newImages.splice(indexImage, 1);
    console.log("newImg---->", newImages);
    this.setState({
      profileDetails: {
        ...this.state.profileDetails,
        images: newImages
      },
      images: newImages
    });
  };

  render() {
    const {
      profileDetails,
      previewVisible,
      previewImage,
      fileList
    } = this.state;
    const uploadButtonImages = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const uploadButtonLogo = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
        <p style={{ fontSize: 10 }}>Add or change</p>
      </div>
    );

    return (
      <div>
        <div style={{ padding: "20px", paddingTop: 0 }}>
          <div
            style={{
              background: "#ffffff",
              padding: "20px",
              border: "1px solid #E6E4E4"
            }}
          >
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
                            className={
                              profileDetails.category === item
                                ? "button-restaurantType"
                                : ""
                            }
                            onClick={() =>
                              this.onAttributeChange("category", item)
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
                    maxLength="80"
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
                    <p>Images:</p>
                    {this.state.images.map((item, index) => (
                      <span key={index}>
                        <img
                          src={item}
                          alt="img"
                          style={{ width: 100, height: 100, padding: 5 }}
                        />
                        <Button onClick={() => this.deleteImage(index)}>
                          <Icon type="delete" />
                        </Button>
                      </span>
                    ))}
                    <Upload
                      listType="picture-card"
                      fileList={fileList}
                      onPreview={this.handlePreviewImages}
                      onChange={this.handleUploadImages}
                      beforeUpload={() => false} // return false so that antd doesn't upload the picture right away
                    >
                      {uploadButtonImages}
                    </Upload>

                    <Modal
                      visible={previewVisible}
                      footer={null}
                      onCancel={this.handleCancelImages}
                    >
                      <img
                        alt="example"
                        style={{ width: "100%" }}
                        src={previewImage}
                      />
                    </Modal>
                  </div>
                  <div>
                    <p>Logo:</p>
                    <img
                      src={this.state.logo}
                      alt=""
                      style={{ width: 100, height: 100, padding: 5 }}
                    />
                    <Upload
                      name="logo"
                      listType="picture-card"
                      className="avatar-uploader"
                      showUploadList={false}
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      onChange={this.handleChangeLogo}
                    >
                      {this.state.imageBase64 ? (
                        <img
                          src={this.state.imageBase64}
                          alt="avatar"
                          style={{ width: "100%" }}
                        />
                      ) : (
                        uploadButtonLogo
                      )}
                    </Upload>
                  </div>
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
