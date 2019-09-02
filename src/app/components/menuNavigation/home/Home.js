import React from "react";
import { Row, Col, Progress, Rate, Card, Tabs } from "antd";
import "../../../css/Home.css";
import Active from "./tabs/Active";
import Completed from "./tabs/Completed";
import ViewAll from "./tabs/ViewAll";
import logo from "../../../../static/logoBackground.svg";

const { TabPane } = Tabs;

class Home extends React.Component {
  state = {
    procentTable: 30,
    procentReservation: 70,
    active: {
      name: "",
      arrival: "",
      date: "",
      numberOfSeats: 0,
      cash: "",
      amount: "",
      orderId: "",
      status: ""
    }
  };

  render() {
    return (
      <div
        style={{
          padding: "20px",
          background: "#ffffff",
          backgroundImage: `url(${logo})`,
          border: "1px solid #E6E4E4"
        }}
      >
        <Row gutter={16} type="flex">
          <Col
            xs={{ span: 24, order: 2, offset: 0 }}
            sm={{ span: 16, order: 2, offset: 3 }}
            md={{ span: 8, order: 2, offset: 0 }}
            lg={{ span: 8, order: 2, offset: 0 }}
            xl={{ span: 8, order: 2, offset: 0 }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #E6E4E4"
              }}
            >
              <Card bordered={false} className="card">
                <p className="active-views">ACTIVE VIEWS</p>
                <p className="number-views">3498</p>
                <p className="total-number-of-view">Total number of views</p>
              </Card>
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 3, offset: 0 }}
            sm={{ span: 16, order: 3, offset: 3 }}
            md={{ span: 8, order: 3, offset: 0 }}
            lg={{ span: 8, order: 3, offset: 0 }}
            xl={{ span: 8, order: 3, offset: 0 }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #E6E4E4"
              }}
            >
              <Card bordered={false} className="card">
                <p className="review-rating">REVIEW RATING</p>
                <p className="restaurant-review-av">Restaurant reviw average</p>
                <Rate className="rateProcent" disabled defaultValue={3} />
              </Card>
            </div>
          </Col>
          <Col
            xs={{ span: 24, order: 4, offset: 0 }}
            sm={{ span: 16, order: 4, offset: 3 }}
            md={{ span: 8, order: 4, offset: 0 }}
            lg={{ span: 8, order: 4, offset: 0 }}
            xl={{ span: 8, order: 4, offset: 0 }}
          >
            <div
              style={{
                background: "#ffffff",
                border: "1px solid #E6E4E4"
              }}
            >
              <Card bordered={false} className="card">
                <p>Online table occupation</p>
                <Progress
                  percent={this.state.procentTable}
                  style={styles.procent}
                />
                <p>Online reservations</p>
                <Progress percent={this.state.procentReservation} />
              </Card>
            </div>
          </Col>
        </Row>

        <Row>
          <Col
            xs={{ span: 15, order: 1 }}
            sm={{ span: 24, order: 1 }}
            md={{ span: 24, order: 1 }}
            lg={{ span: 24, order: 1 }}
            xl={{ span: 24, order: 1 }}
          >
            <div style={{ paddingTop: "20px" }}>
              <div
                style={{ background: "#ffffff", border: "1px solid #E6E4E4" }}
              >
                <Tabs defaultActiveKey="1">
                  <TabPane tab="Active" key="1">
                    <div style={{ paddingTop: "20px" }}>
                      <div style={{ backgroundColor: "#ffffff" }}>
                        <Active />
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="Completed" key="2">
                    <div style={{ paddingTop: "20px" }}>
                      <div style={{ backgroundColor: "#ffffff" }}>
                        <Completed />
                      </div>
                    </div>
                  </TabPane>
                  <TabPane tab="View all" key="4">
                    <div style={{ paddingTop: "20px" }}>
                      <div style={{ backgroundColor: "#ffffff" }}>
                        <ViewAll />
                      </div>
                    </div>
                  </TabPane>
                </Tabs>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Home;

const styles = {
  procent: {
    strokeColor: "red"
  }
};
