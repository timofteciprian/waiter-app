import React from "react";
import axios from "axios";
import { Input } from "antd";
import { Button } from "antd";
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

  addCategory = () => {
    const token = localStorage.getItem("token");
    const name = this.state.category;
    axios
      .post(
        `http://localhost:9000/food-categories`,
        { name },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      )
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log("errrr:", err.response);
      });
  };
  setCategory = value => {
    this.setState({ category: value });
  };
  getCategories = () => {
    const token = localStorage.getItem("token");
    const restaurantId = localStorage.getItem("restaurantId");
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
          newCategories.push(category);
        }
        this.setState({ categories: newCategories });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    return (
      <div>
        <div>
          <div style={{ paddingBottom: "20px" }}>
            <div style={{ backgroundColor: "#ffffff" }}>
              <div style={{ padding: "20px" }}>
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
                      <Button>{item}</Button>
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
                      rows={1}
                      onChange={e => this.setCategory(e.target.value)}
                    />
                  </div>
                  <Button onClick={this.addCategory}>+ Add</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Categories;
