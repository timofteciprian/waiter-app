import React from "react";
import { Menu } from "antd";

const { SubMenu } = Menu;

class Sider extends React.Component {
  handleClick = e => {
    console.log("click ", e);
  };

  render() {
    return (
      <Menu
        onClick={this.handleClick}
        style={{ width: 256 }}
        //defaultSelectedKeys={["1"]}
        // defaultOpenKeys={["1"]}
        mode="inline"
      >
        <Menu.Item key="1">
          <a href="/myAccount/dashboard">Dashboard</a>
        </Menu.Item>
        <SubMenu
          key="sub1"
          title={
            <span>
              <span>Menu</span>
            </span>
          }
        >
          <Menu.ItemGroup key="g1">
            <Menu.Item key="01">
              <a href="/myAccount/addItem">Add item</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/myAccount/listMenu">List menu</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          key="sub2"
          title={
            <span>
              <span>Notification</span>
            </span>
          }
        >
          <Menu.Item key="5">Option 5</Menu.Item>
          <Menu.Item key="6">Option 6</Menu.Item>
          <SubMenu key="sub3" title="Submenu">
            <Menu.Item key="7">Option 7</Menu.Item>
            <Menu.Item key="8">Option 8</Menu.Item>
          </SubMenu>
        </SubMenu>
      </Menu>
    );
  }
}
export default Sider;
