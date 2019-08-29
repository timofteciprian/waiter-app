import React from "react";
import axios from "axios";
import { Input, Select, Button, Upload, Icon } from "antd";
import "../../../../css/MenuSetup.css";
import { storageRef } from "../../../../lib/firebase";

const { TextArea } = Input;
const { Option } = Select;

const defaultItem = {
  categoryId: "",
  title: "",
  description: "",
  price: 0,
  weight: 0,
  image: "",
  status: true
};

class Item extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    categories: [],
    item: { ...defaultItem },
    file: {},
    imageBase64: ""
  };

  onSaveItem = () => {
    const {
      item: { categoryId, title, description, price, weight, image }
    } = this.state;
    const token = localStorage.getItem("token");
    const restaurantId = localStorage.getItem("restaurantId");
    console.log(categoryId, title, description, price, weight, image);
    axios
      .post(
        `http://localhost:9000/food-items`,
        {
          categoryId,
          title,
          description,
          price,
          image,
          weight,
          restaurantId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      )
      .then(res => {
        console.log("ok:", res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:9000/food-categories/restaurant/${restaurantId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(res => {
        const categories = res.data;
        const newCategories = this.state.categories.slice();
        for (let i = 0; i < categories.length; i++) {
          const category = categories[i].name;
          const id = categories[i].id;
          newCategories.push({ category, id });
        }
        this.setState({ categories: newCategories });
      })
      .catch(err => {
        console.log(err);
      });
  };

  onAttributeChange = (propertyName, value) => {
    console.log(value);
    this.setState({
      item: {
        ...this.state.item,
        [propertyName]: value
      }
    });
  };

  getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  handleChangeImage = info => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      this.setState({
        file: info.file
      });
      this.getBase64(info.file.originFileObj, imageUrl =>
        this.setState({
          imageBase64: imageUrl,
          loading: false
        })
      );
    }
  };

  onSaveImage = async () => {
    const imageData = this.state.file;
    const response = await storageRef
      .child(`images/${imageData.uid}.${imageData.type.split("/")[1]}`)
      .putString(this.state.imageBase64.split("base64,")[1], "base64");
    const imageUrl = await response.task.snapshot.ref.getDownloadURL();
    console.log("imageUrl----->", imageUrl);
    this.setState({
      item: {
        ...this.state.item,
        image: imageUrl
      }
    });
  };

  render() {
    const { item } = this.state;
    const uploadButton = (
      <div>
        <Icon type={this.state.loading ? "loading" : "plus"} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <div style={{ backgroundColor: "#ffffff" }}>
          <div style={{ padding: "20px" }}>
            <h1>Item</h1>
            <p>Category:</p>
            <Select
              showSearch
              value={this.state.item.categoryId}
              style={{ width: 200 }}
              placeholder="Select category"
              optionFilterProp="children"
              onChange={e => this.onAttributeChange("categoryId", e)}
            >
              {this.state.categories.map((item, index) => (
                <Option key={index} value={item.id}>
                  {item.category}
                </Option>
              ))}
            </Select>
            <p>Title:</p>
            <div>
              <TextArea
                value={item.title}
                rows={1}
                onChange={e => this.onAttributeChange("title", e.target.value)}
              />
            </div>

            <p>Description:</p>
            <TextArea
              value={item.description}
              rows={3}
              onChange={e =>
                this.onAttributeChange("description", e.target.value)
              }
            />

            <p>Price:</p>
            <TextArea
              value={item.price}
              rows={1}
              onChange={e => this.onAttributeChange("price", e.target.value)}
            />
            <p>Weight:</p>
            <TextArea
              value={item.weight}
              rows={1}
              onChange={e => this.onAttributeChange("weight", e.target.value)}
            />
            <div>
              <p>Image:</p>
              <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                onChange={this.handleChangeImage}
              >
                {this.state.imageBase64 ? (
                  <img
                    src={this.state.imageBase64}
                    alt="avatar"
                    style={{ width: "100%" }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </div>
            <Button style={{ marginTop: "20px" }} onClick={this.onSaveImage}>
              Save Image
            </Button>
            <Button style={{ marginTop: "20px" }} onClick={this.onSaveItem}>
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
