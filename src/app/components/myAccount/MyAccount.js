import React from "react";
import { Upload, Icon, Modal, Avatar } from "antd";
import { Layout, Menu, List, Card, Button } from "antd";
// import { Link } from "react-router-dom";
// import tableReservation from "../../../static/restaurant-table.png";
// import menu from "../../../static/main.png";

const { Meta } = Card;
const { Header, Content } = Layout;
const { SubMenu } = Menu;

// function getBase64(file) {
//   return new Promise((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onload = () => resolve(reader.result);
//     reader.onerror = error => reject(error);
//   });
// }

class MyAccount extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    productsModalVisible: false,
    profileDetailsModalVisible: false,
    editingProduct: {
      title: "",
      description: "",
      price: "",
      image: ""
    },
    products: [
      {
        //id: 1,
        title: "Pizza",
        description:
          "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
        price: "25 ron",
        image:
          "https://previews.123rf.com/images/foodandmore/foodandmore1611/foodandmore161100068/65412980-flame-grilled-margherita-italian-pizza-with-fresh-basil-leaves-on-a-thick-biscuit-base-with-mozzarel.jpg"
      }
    ],
    editingProfileDetails: {
      nameRestaurant: "",
      avatar: "",
      description: "",
      image: ""
    },
    profilesDetails: [
      {
        //id: Math.random(),
        nameRestaurant: "Restaurant",
        avatar:
          "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg",
        description:
          "There aren't enough food, service, value or atmosphere ratings. Be one of the first to write a review!",
        image:
          "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg"
      }
    ]
  };

  // handlePreview = async file => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }
  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true
  //   });
  // };

  // handleChange = ({ fileList }) => this.setState({ fileList });

  // handleCancel = () => this.setState({ previewVisible: false });

  showModalProducts = () => {
    this.setState({
      productsModalVisible: true
    });
  };

  handleOkProducts = () => {
    const newProducts = this.state.products.slice();
    newProducts.push(this.state.editingProduct);
    this.setState({
      products: newProducts,
      productsModalVisible: false
    });
  };

  handleCancelProducts = e => {
    console.log(e);
    this.setState({
      productsModalVisible: false
    });
  };
  onAttributeProductChange = (propertyName, value) => {
    this.setState({
      editingProduct: {
        ...this.state.editingProduct,
        [propertyName]: value
      }
    });
  };
  showModalProfileDetails = () => {
    this.setState({
      profileDetailsModalVisible: true
    });
  };

  handleOkProfileDetails = e => {
    const newProfilesDetails = this.state.profilesDetails.slice();
    newProfilesDetails.push(this.state.editingProfileDetails);
    console.log(this.state.editingProduct);
    this.setState({
      profilesDetails: newProfilesDetails,
      profileDetailsModalVisible: false
    });
  };

  handleCancelProfileDetails = e => {
    console.log(e);
    this.setState({
      profileDetailsModalVisible: false
    });
  };

  onAttributeProfileChange = (propertyName, value) => {
    console.log(value);
    this.setState({
      editingProfileDetails: {
        ...this.state.editingProfileDetails,
        [propertyName]: value
      }
    });
  };
  handleClick = e => {
    console.log("click ", e);
  };
  render() {
    //const { previewVisible, previewImage, fileList } = this.state;
    // const uploadButton = (
    //   <div>
    //     <Icon type="plus" />
    //     <div className="ant-upload-text">Upload</div>
    //   </div>
    // );

    return (
      <div>
        <div style={styles.divStyle}>
          <Layout className="layout">
            {/* <Header style={styles.headerStyle} >
              s
            </Header> */}
            <Content>
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      display: "inline",
                      marginRight: "20px"
                    }}
                  >
                    Details Profile
                  </h2>
                  <Button type="primary" onClick={this.showModalProfileDetails}>
                    Edit details
                  </Button>
                  <Modal
                    title=""
                    visible={this.state.profileDetailsModalVisible}
                    onOk={this.handleOkProfileDetails}
                    onCancel={this.handleCancelProfileDetails}
                  >
                    <p>Name Restaurant:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeProfileChange(
                          "nameRestaurant",
                          e.target.value
                        )
                      }
                    />
                    <p>Avatar:</p>
                    <input type="text" />
                    <p>Description:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeProfileChange(
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <p>Image:</p>
                  </Modal>
                </div>
                <List
                  style={styles.listStyle}
                  itemLayout="vertical"
                  size="large"
                  dataSource={this.state.profilesDetails}
                  renderItem={item => (
                    <List.Item
                      key=""
                      extra={<img width={175} alt="logo" src={item.image} />}
                    >
                      <List.Item.Meta
                        avatar={<Avatar src={item.avatar} />}
                        title={
                          <a href={"/restaurant"}>{item.nameRestaurant}</a>
                        }
                      />
                      {item.description}
                    </List.Item>
                  )}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"
                  }}
                >
                  <h2
                    style={{
                      textAlign: "center",
                      display: "inline",
                      marginRight: "20px"
                    }}
                  >
                    Menu
                  </h2>
                  <Button
                    type="primary"
                    style={{ display: "inline" }}
                    onClick={this.showModalProducts}
                  >
                    Add card
                  </Button>
                  <Modal
                    title=""
                    visible={this.state.productsModalVisible}
                    onOk={this.handleOkProducts}
                    onCancel={this.handleCancelProducts}
                  >
                    <p>Title:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeProductChange("title", e.target.value)
                      }
                    />
                    <p>Description:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeProductChange(
                          "description",
                          e.target.value
                        )
                      }
                    />
                    <p>Price:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeProductChange("price", e.target.value)
                      }
                    />
                    <p>Image:</p>
                    {/* <input type="file" onChange={this.fileSelectedHendler} />
        <button onClick={this.fileUploadHendler}>Upload</button> */}

                    {/* <div className="clearfix">
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      onPreview={this.handlePreview}
                      onChange={this.handleChange}
                    >
                      {uploadButton}
                    </Upload>
                  </div> */}
                  </Modal>
                </div>
                <List
                  grid={{ gutter: 12, column: 3 }}
                  dataSource={this.state.products}
                  style={styles.listStyle}
                  renderItem={item => (
                    <List.Item>
                      <Card
                        hoverable
                        style={{ width: 240 }}
                        cover={<img alt="pizza" src={item.image} />}
                      >
                        <Meta
                          title={item.title}
                          description={
                            <>
                              <div>{item.description}</div>
                              <div>{item.price}</div>
                            </>
                          }
                        />
                      </Card>
                    </List.Item>
                  )}
                />
              </div>
            </Content>
          </Layout>
        </div>
      </div>
    );
  }
}

export default MyAccount;

const styles = {
  tables: {
    width: "600px",
    display: "flex",
    flexWrap: "wrap"
  },
  listStyle: {
    width: "450px",
    marginLeft: "250px"
  },
  divStyle: {
    backgroundColor: "#605353",
    lineHeight: "130px"
  },
  headerStyle: {
    flexDirection: "row",
    backgroundColor: "#605353",
    height: "100%"
  },
  image: {
    width: "250px"
  }
};
// const styles = {
//   titleStyle: {
//     display: "flex",
//     marginLeft: "190px",
//     marginTop: "50px"
//   },
//   divStyle: {
//     marginLeft: "450px",
//     width: "50%",
//     height: "10%"
//   },

//   formStyle: {
//     textAlign: "center",
//     width: "65%",
//     marginTop: "75px"
//   }
// };
