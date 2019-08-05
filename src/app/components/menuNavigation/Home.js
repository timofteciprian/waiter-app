import React from "react";
import { Row, Col, Progress, Rate, Card, Table } from "antd";
import "../../css/Home.css";

// const { Content } = Layout;
const { Column } = Table;

class Home extends React.Component {
  state = {
    procentTable: 30,
    procentReservation: 70
  };
  render() {
    return (
      <div style={{ padding: "20px" }}>
        <Row gutter={16}>
          <Col span={8}>
            <Card bordered={false} className="card">
              <p className="active-views">ACTIVE VIEWS</p>
              <p className="number-views">3498</p>
              <p className="total-number-of-view">Total number of views</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="card">
              <p className="review-rating">REVIEW RATING</p>
              <p className="restaurant-review-av">Restaurant reviw average</p>
              <Rate className="rateProcent" disabled defaultValue={2} />
            </Card>
          </Col>
          <Col span={8}>
            <Card bordered={false} className="card">
              <p style={{ fontWeight: "bold", fontFamily: "SF Pro Text" }}>
                Online table occupation
              </p>
              <Progress
                percent={this.state.procentTable}
                style={styles.procent}
              />
              <p>Online reservations</p>
              <Progress percent={this.state.procentReservation} />
            </Card>
          </Col>
        </Row>
        <div style={{ paddingTop: "20px" }}>
          <div style={{ backgroundColor: "#ffffff" }}>
            <Table dataSource={data}>
              <Column title="Name" dataIndex="name" key="name" />
              <Column
                title="Arrival time"
                dataIndex="arrivalHour"
                key="arrivalHour"
              />
              <Column
                title="Number of people"
                dataIndex="people"
                key="people"
              />
              <Column
                title="Table Type"
                dataIndex="tableType"
                key="tableType"
              />
            </Table>
          </div>
        </div>
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

const data = [
  {
    key: "1",
    name: "John",
    arrivalHour: 21,
    arrivalMin: 10,
    people: 2,
    tableType: 2
  },
  {
    key: "2",
    name: "Jim",
    arrivalHour: 21,
    arrivalMin: 10,
    people: 5,
    tableType: 6
  },
  {
    key: "3",
    name: "Joe",
    arrivalHour: 21,
    arrivalMin: 10,
    people: 4,
    tableType: 4
  }
];

/* <Column
            title="Tags"
            dataIndex="tags"
            key="tags"
            render={tags => (
              <span>
                {tags.map(tag => (
                  <Tag color="blue" key={tag}>
                    {tag}
                  </Tag>
                ))}
              </span>
            )}
          />
           */
