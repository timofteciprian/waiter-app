import React from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import { List, Avatar } from "antd";

class Home extends React.Component {
  state = {
    listData: []
  };

  render() {
    for (let i = 0; i < 6; i++) {
      this.state.listData.push({
        title: "Restaurant",
        avatar:
          "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg",
        description:
          "There aren't enough food, service, value or atmosphere ratings. Be one of the first to write a review!",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      });
    }
    return (
      <div>
        <List
          style={styles.listStyle}
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
                avatar={<Avatar src={item.avatar} />}
                title={<a href={"/restaurant"}>{item.title}</a>}
                description={item.description}
              />
              {item.content}
            </List.Item>
          )}
        />
        <Map google={this.props.google} zoom={14} style={styles.map}>
          <Marker onClick={this.onMarkerClick} name={"Current location"} />

          <InfoWindow onClose={this.onInfoWindowClose} />
        </Map>
      </div>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyDmkf0KS8VEtupu2PpGbg9iW0WxSer3pVw"
})(Home);

const styles = {
  listStyle: {
    width: "900px",
    marginLeft: "100px"
  },
  map: {
    width: "600px"
  }
  // width: "80%",
  // marginLeft: "150px"
};
