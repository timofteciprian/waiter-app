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
        <Menu.Item key="10">
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
              <span>Management</span>
            </span>
          }
        >
          <Menu.ItemGroup key="11">
            <Menu.Item key="1">
              <a href="/management/menuSetup">Menu Setup</a>
            </Menu.Item>
            <Menu.Item key="2">
              <a href="/management/itemList">Item List</a>
            </Menu.Item>
            <Menu.Item key="3">
              <a href="/management/tables">Tables</a>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>

        <Menu.Item key="111">
          <span>
            <Icon type="setting" />
            <a href="/account">Account</a>
          </span>
        </Menu.Item>
      </Menu>
    );
  }
}
export default SiderContent;
