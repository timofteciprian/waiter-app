import React from "react";
import { Form, Row, Col } from "antd";
import "../../../../css/MenuSetup.css";
import InfoItems from "../InfoItems";
import Categories from "./Categories";
import Item from "./Item";
import MenuPreview from "./MenuPreview";

//import imagePizza from "../../../../static/pizza.jpeg";

class MenuSetup extends React.Component {
  render() {
    return (
      <div>
        <InfoItems />
        <div style={{ padding: "20px", paddingTop: "0" }}>
          <Row gutter={16}>
            <Col span={8}>
              <Categories />
              <Item />
            </Col>

            <Col span={16}>
              <MenuPreview />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const MenuSetup_ = Form.create()(MenuSetup);
export default MenuSetup_;
