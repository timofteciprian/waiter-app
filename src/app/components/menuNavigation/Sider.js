import React from "react";
import { Menu, Icon } from "antd";
import "../../css/Sider.css";

const { SubMenu } = Menu;

class SiderContent extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        //style={{ width: 256 }}
        //defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["1"]}
        className="menu"
        mode="inline"
      >
        <Menu.Item key="012">
          <span>
            <Icon type="home" />
            <a href="/home">Home</a>
          </span>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <Icon type="calendar" />
              <span>Menu Management</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1">
            <Menu.Item key="01">
              <a href="/menuManagement/addItem">Add item</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/menuManagement/listMenu">List menu</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>

        <Menu.Item key="0111">
          <span>
            <Icon type="setting" />
            <a href="/menuManagement/account">Account</a>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}
export default SiderContent;
