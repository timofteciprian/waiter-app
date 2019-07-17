import React from "react";

import { List, Avatar } from "antd";

export default class Home extends React.Component {
  state = {
    listData: []
  };

  render() {
    for (let i = 0; i < 6; i++) {
      this.state.listData.push({
        title: "Restaurant",
        avatar:
          "https://thumbs.dreamstime.com/z/restaurant-chef-icon-logo-vector-illustration-114601311.jpg",
        description:
          "There aren't enough food, service, value or atmosphere ratings. Be one of the first to write a review!",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }
    return (
      <div style={divStyle}>
        <List
          itemLayout="vertical"
          size="large"
          dataSource={this.state.listData}
          renderItem={item => (
            <List.Item
              key={item.title}
              extra={
                <img
                  width={175}
                  alt="logo"
                  src="https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg"
                />
              }
            >
              <List.Item.Meta
                avatar={<Avatar src={item.title} />}
                title={<a href={"/restaurant"}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
      </div>
    );
  }
}

const divStyle = {
  // width: "80%",
  // marginLeft: "150px"
};
