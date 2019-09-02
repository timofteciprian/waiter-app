import React from "react";
import { Row, Col } from "antd";
import "../../../css/InfoItems.css";
import { getFoodMenu } from "../../../api/Management";

class InfoItems extends React.Component {
  state = {
    listCategories: [],
    totalItems: 0,
    active: 0,
    innactive: 0
  };

  componentDidMount() {
    this.getMenuItems();
  }

  getMenuItems = async () => {
    const res = await getFoodMenu();
    if (res !== undefined) {
      this.setState({ listCategories: res });
      this.setInfo(res);
    }
  };

  setInfo = list => {
    let totalItems = 0;
    let active = 0;
    let innactive = 0;
    list.forEach(item => {
      item.dishes.forEach(el => {
        if (el.status === "active") {
          active = active + 1;
        }
        if (el.status === "innactive") {
          innactive = innactive + 1;
        }
        totalItems = active + innactive;
      });
    });
    this.setState({ active, innactive, totalItems });
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
                  <p className="totalItemNumber">{this.state.totalItems}</p>
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
                  <p className="totalActiveNumber">{this.state.active}</p>
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
                  <p className="totalInnactiveNumber">{this.state.innactive}</p>
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
