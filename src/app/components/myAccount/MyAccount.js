import React from "react";
import { Upload, Icon, Modal, Avatar } from "antd";
import { Layout, Menu, List, Card, Button } from "antd";
import { Link } from "react-router-dom";
import tableReservation from "../../../static/restaurant-table.png";
import menu from "../../../static/main.png";

const { Meta } = Card;
const { Header, Content } = Layout;

function getBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

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
        title: "Pizza",
        description:
          "Sos de roșii, salam picant, mozzarella, brânză topită, brânză Gorgonzola, porumb.",
        price: "25 ron",
        image:
          "http://www.trenta.ro/wp-content/uploads/2012/04/Pizza-Cascavalerii-Gustului-26-cm-si-30-cm.jpg"
      }
    ],
    profileDetails: [
      {
        title: "Restaurant",
        avatar:
          "https://previews.123rf.com/images/sergeypykhonin/sergeypykhonin1707/sergeypykhonin170700052/81892309-restaurant-logo-icon-or-symbol-for-design-menu-eatery-canteen-or-cafe-lettering-vector-illustration.jpg",
        description:
          "There aren't enough food, service, value or atmosphere ratings. Be one of the first to write a review!",
        content:
          "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently."
      }
    ]
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  showModalProducts = () => {
    this.setState({
      productsModalVisible: true
    });
  };
  showModalProfileDetails = () => {
    this.setState({
      profileDetailsModalVisible: true
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
  handleOkProfileDetails = e => {
    console.log(e);
    this.setState({
      profileDetailsModalVisible: false
    });
  };

  handleCancelProducts = e => {
    console.log(e);
    this.setState({
      productsModalVisible: false
    });
  };
  handleCancelProfileDetails = e => {
    console.log(e);
    this.setState({
      profileDetailsModalVisible: false
    });
  };

  onAttributeChange = (propertyName, value) => {
    this.setState({
      editingProduct: {
        ...this.state.editingProduct,
        [propertyName]: value
      }
    });
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
            <Header style={styles.headerStyle}>
              <div className="logo" />

              <Menu
                theme="dark"
                mode="horizontal"
                defaultSelectedKeys={["2"]}
                style={styles.divStyle}
              >
                <Menu.Item>
                  <Link to="/restaurant/reservationTable">
                    <img
                      src={tableReservation}
                      alt="table"
                      style={{ margin: 20, width: "50px" }}
                    />
                    Reservation the table
                  </Link>
                </Menu.Item>
                <Menu.Item>
                  <Link to="/restaurant/menu">
                    <img
                      src={menu}
                      alt="menu"
                      style={{ margin: 20, width: "50px" }}
                    />
                    Menu
                  </Link>
                </Menu.Item>
              </Menu>
            </Header>
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
                </div>
                <List
                  style={styles.listStyle}
                  itemLayout="vertical"
                  size="large"
                  dataSource={this.state.profileDetails}
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
                <div>
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
                        this.onAttributeChange("title", e.target.value)
                      }
                    />
                    <p>Description:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeChange("description", e.target.value)
                      }
                    />
                    <p>Price:</p>
                    <input
                      type="text"
                      onChange={e =>
                        this.onAttributeChange("price", e.target.value)
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
                  <Modal
                    title="Basic Modal"
                    visible={this.state.profileDetailsModalVisible}
                    onOk={this.handleOkProfileDetails}
                    onCancel={this.handleCancelProfileDetails}
                  >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                  </Modal>
                </div>
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
    width: "900px",
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
