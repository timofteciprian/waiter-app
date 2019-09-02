import React from "react";
import { Input, Select, Button, Upload, Icon } from "antd";
import { postFoodItem, getDataCategories } from "../../../../api/Management";
import { getUrlImageFromFirebase } from "../../../../api/Account";
import "../../../../css/MenuSetup.css";

const { TextArea } = Input;
const { Option } = Select;

const defaultItem = {
  categoryId: "",
  title: "",
  description: "",
  price: 0,
  weight: 0,
  image: "",
  categoryName: "",
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
    imageBase64: "",
    categoryName: ""
  };

  onSubmitFoodItem = async () => {
    const file = this.state.file;
    const imageBase64 = this.state.imageBase64;
    const imageUrl = await getUrlImageFromFirebase(imageBase64, file);
    const { item } = this.state;
    item.image = imageUrl;
    this.props.menuPreviewRef.onItemAdded(item);
    postFoodItem(item);
    this.setState({ item: defaultItem });
  };

  componentDidMount() {
    this.getCategories();
  }

  getCategories = async () => {
    const newCategories = this.state.categories.slice();
    const data = await getDataCategories(newCategories);
    if (data !== undefined) {
      this.setState({ categories: data });
    }
  };

  onAttributeChange = (propertyName, value) => {
    this.setState({
      item: {
        ...this.state.item,
        [propertyName]: value
      }
    });
  };
  setCategory = indexItem => {
    let categoryId = "";
    let categoryName = "";
    this.state.categories.forEach((item, index) => {
      if (index === indexItem) {
        categoryName = item.category;
        categoryId = item.id;
      }
    });
    this.setState({
      item: {
        ...this.state.item,
        categoryId,
        categoryName
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
        <div
          style={{ backgroundColor: "#ffffff", border: "1px solid #E6E4E4" }}
        >
          <div style={{ padding: "20px" }}>
            <h1>Item</h1>
            <p>Category:</p>
            <Select
              showSearch
              value={this.state.item.categoryName}
              style={{ width: 200 }}
              placeholder="Select category"
              optionFilterProp="children"
              onChange={e => this.setCategory(e)}
            >
              {this.state.categories.map((item, index) => (
                <Option key={index} value={index}>
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
            <Button
              style={{ marginTop: "20px" }}
              onClick={this.onSubmitFoodItem}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Item;
