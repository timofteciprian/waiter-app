import React from "react";
import axios from "axios";
import { Card } from "antd";
import "../../../../css/MenuSetup.css";

const { Meta } = Card;

const defaultItem = {
  category: "",
  title: "",
  description: "",
  price: 0,
  grammage: 0,
  status: ""
};

class MenuPreview extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    categoryAdd: "",
    categories: ["Pizza", "Pasta", "Chicken"],
    category: "",
    item: { ...defaultItem },
    list_Categories: [],
    listCategories: []
  };

  componentDidMount() {
    this.getData();
  }

  getData = () => {
    const restaurantId = localStorage.getItem("restaurantId");
    const token = localStorage.getItem("token");
    axios
      .get(`http://localhost:9000/menu/${restaurantId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => {
        const list = res.data;
        // this.setCategories(list);
        this.setState({ listCategories: list });
      });
  };

  // setCategories = list => {
  //   let newListCategories = this.state.listCategories.slice();

  //   list.map(item => {
  //     let category = item.category;
  //     const element = item;
  //     const foundCategory = newListCategories.find(
  //       el => el.category === category
  //     );
  //     if (foundCategory === undefined) {
  //       newListCategories.push({
  //         category,
  //         details: []
  //       });
  //       this.setState({
  //         listCategories: newListCategories
  //       });
  //     }
  //     newListCategories = newListCategories.map(listItem => {
  //       if (listItem.category === category) {
  //         listItem.details.push(element);
  //       }
  //       return listItem;
  //     });
  //   });
  //   this.setState({
  //     listCategories: newListCategories
  //   });
  // };

  render() {
    return (
      <div>
        <div style={{ backgroundColor: "#ffffff" }}>
          <p className="titleMenuPreview">Menu preview</p>
          {this.state.listCategories.map((el, categoryIndex) => (
            <div
              key={categoryIndex}
              style={{ display: "flex", flexDirection: "column" }}
            >
              <p className="titleCategoryMenuPreview">{el.foodCategory}</p>
              <div className="carousel">
                {el.dishes.map((item, itemIndex) => (
                  <Card
                    className="containerCards"
                    hoverable
                    key={`item_${categoryIndex}_${itemIndex}`}
                    cover={
                      <img alt="example" className="image" src={item.image} />
                    }
                  >
                    <Meta title={item.title} />
                    <p className="description">{item.description}</p>
                    <span>
                      <span style={{ color: "#FF6143", fontSize: "15px" }}>
                        {item.price} lei{"   "}
                      </span>
                      <span style={{ fontSize: "8px" }}>{item.weight}(g)</span>
                    </span>
                  </Card>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default MenuPreview;
