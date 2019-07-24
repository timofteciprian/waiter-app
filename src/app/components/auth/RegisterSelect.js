import React from "react";
import { Button, Popover } from "antd";

class RegisterSelect extends React.Component {
  content = (
    <div style={{ textAlign: "center" }}>
      <a href="/register ">Register client </a>
      <p> </p>
      <a href="/registerRestaurant ">Register restaurant</a>
    </div>
  );
  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <Popover content={this.content} style={{ textAlign: "center" }}>
          <Button type="primary">Register</Button>
        </Popover>
      </div>
    );
  }
}

export default RegisterSelect;

// const styles = {
//   titleStyle: {
//     display: "flex",
//     marginLeft: "150px",
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
