import React from "react";
import { Card } from "antd";
import "../../../../css/MenuSetup.css";
import { getFoodMenu } from "../../../../api/Management";

const { Meta } = Card;

class MenuPreview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listCategories: []
    };
  }

  componentDidMount() {
    this.getData();
  }

  onItemAdded(item) {
    let newListCategories = this.state.listCategories.slice();
    this.state.listCategories.forEach((el, index) => {
      if (el.foodCategory === item.categoryName) {
        newListCategories[index].dishes.push(item);
      }
    });
    this.setState({ listCategories: newListCategories });
  }

  getData = async () => {
    const data = await getFoodMenu();
    if (data !== undefined) {
      this.setState({ listCategories: data });
    }
  };
  render() {
    return (
      <div>
        <div
          style={{ backgroundColor: "#ffffff", border: "1px solid #E6E4E4" }}
        >
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
