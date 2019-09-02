import React from "react";
import { Form, Row, Col } from "antd";
import "../../../../css/MenuSetup.css";
import InfoItems from "../InfoItems";
import Categories from "./Categories";
import Item from "./Item";
import MenuPreview from "./MenuPreview";

class MenuSetup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuPreviewRef: null
    };
  }

  render() {
    return (
      <div
        style={{ backgroundColor: "#ffffff", borderTop: "1px solid #E6E4E4" }}
      >
        <InfoItems />
        <div style={{ padding: "20px", paddingTop: "0" }}>
          <Row gutter={16}>
            <Col xs={24} sm={24} md={8} lg={8} xl={8}>
              <Categories />
              <Item menuPreviewRef={this.state.menuPreviewRef} />
            </Col>

            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <MenuPreview
                ref={r =>
                  !this.state.menuPreviewRef &&
                  this.setState({ menuPreviewRef: r })
                }
              />
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

const MenuSetup_ = Form.create()(MenuSetup);
export default MenuSetup_;
