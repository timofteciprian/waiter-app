import React from "react";
import { Input, Button } from "antd";
import { postCategory, getDataCategories } from "../../../../api/Management";
import "../../../../css/MenuSetup.css";

const { TextArea } = Input;

class Categories extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    categories: [],
    category: ""
  };

  componentDidMount() {
    this.getCategories();
  }

  addCategory = async () => {
    let newCategories = this.state.categories.slice();
    const name = this.state.category;
    const res = await postCategory(name);
    newCategories.push({ category: res.name, id: res.id });
    this.setState({ categories: newCategories, category: "" });
  };

  setCategory = value => {
    this.setState({ category: value });
  };

  getCategories = async () => {
    const newCategories = this.state.categories.slice();
    const data = await getDataCategories(newCategories);
    console.log(data);
    if (data !== undefined) {
      this.setState({ categories: data });
    }
  };

  render() {
    return (
      <div style={{ paddingBottom: "20px" }}>
        <div style={{ border: "1px solid #E6E4E4" }}>
          <div style={{ padding: "20px", backgroundColor: "#ffffff" }}>
            <h1>Categories</h1>
            <h5>Add categories for your food menu</h5>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap"
              }}
            >
              {this.state.categories.map((item, index) => (
                <div
                  key={index}
                  style={{
                    paddingRight: "15px",
                    paddingBottom: "15px"
                  }}
                >
                  <Button>{item.category}</Button>
                </div>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                paddingBottom: "15px"
              }}
            >
              <div
                style={{
                  paddingRight: "10px"
                }}
              >
                <TextArea
                  value={this.state.category}
                  placeholder="Add category"
                  rows={1}
                  onChange={e => this.setCategory(e.target.value)}
                />
              </div>
              <Button onClick={this.addCategory}>+ Add</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
