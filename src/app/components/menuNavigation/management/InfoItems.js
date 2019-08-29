import React from "react";
import { Row, Col } from "antd";
import "../../../css/InfoItems.css";

class InfoItems extends React.Component {
  state = {
    loading: false,
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: "",
    categories: ["Pizza", "Pasta", "Chicken", "Sushi"],
    category: ""
  };

  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col
            xs={{ span: 24, order: 2, offset: 0 }}
            sm={{ span: 24, order: 2, offset: 0 }}
            md={{ span: 8, order: 2, offset: 0 }}
            lg={{ span: 8, order: 2, offset: 0 }}
            xl={{ span: 8, order: 2, offset: 0 }}
          >
            <div className="totalItem">
              <Row type="flex">
                <Col
                  xs={{ span: 10, order: 1, offset: 0 }}
                  sm={{ span: 10, order: 1, offset: 0 }}
                  md={{ span: 24, order: 1, offset: 0 }}
                  lg={{ span: 9, order: 1, offset: 0 }}
                  xl={{ span: 10, order: 1, offset: 0 }}
                >
                  <p className="totalItemNumber">10</p>
                </Col>
                <Col
                  xs={{ span: 14, order: 2, offset: 0 }}
                  sm={{ span: 14, order: 2, offset: 0 }}
                  md={{ span: 24, order: 2, offset: 0 }}
                  lg={{ span: 15, order: 2, offset: 0 }}
                  xl={{ span: 14, order: 2, offset: 0 }}
                >
                  <p className="titleTotalItem">Total Items</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 2, offset: 0 }}
            sm={{ span: 24, order: 2, offset: 0 }}
            md={{ span: 8, order: 2, offset: 0 }}
            lg={{ span: 8, order: 2, offset: 0 }}
            xl={{ span: 8, order: 2, offset: 0 }}
          >
            <div className="active">
              <Row type="flex">
                <Col
                  xs={{ span: 10, order: 1, offset: 0 }}
                  sm={{ span: 10, order: 1, offset: 0 }}
                  md={{ span: 24, order: 1, offset: 0 }}
                  lg={{ span: 10, order: 1, offset: 0 }}
                  xl={{ span: 10, order: 1, offset: 0 }}
                >
                  <p className="totalActiveNumber">8</p>
                </Col>
                <Col
                  xs={{ span: 14, order: 2, offset: 0 }}
                  sm={{ span: 14, order: 2, offset: 0 }}
                  md={{ span: 24, order: 2, offset: 0 }}
                  lg={{ span: 14, order: 2, offset: 0 }}
                  xl={{ span: 14, order: 2, offset: 0 }}
                >
                  <p className="titleActive">Active</p>
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 2, offset: 0 }}
            sm={{ span: 24, order: 2, offset: 0 }}
            md={{ span: 8, order: 2, offset: 0 }}
            lg={{ span: 8, order: 2, offset: 0 }}
            xl={{ span: 8, order: 2, offset: 0 }}
          >
            <div className="innactive">
              <Row type="flex">
                <Col
                  xs={{ span: 10, order: 1, offset: 0 }}
                  sm={{ span: 10, order: 1, offset: 0 }}
                  md={{ span: 24, order: 1, offset: 0 }}
                  lg={{ span: 10, order: 1, offset: 0 }}
                  xl={{ span: 10, order: 1, offset: 0 }}
                >
                  <p className="totalInnactiveNumber">2</p>
                </Col>
                <Col
                  xs={{ span: 14, order: 2, offset: 0 }}
                  sm={{ span: 14, order: 2, offset: 0 }}
                  md={{ span: 24, order: 2, offset: 0 }}
                  lg={{ span: 14, order: 2, offset: 0 }}
                  xl={{ span: 14, order: 2, offset: 0 }}
                >
                  <p className="titleInnactive">Innactive</p>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default InfoItems;
