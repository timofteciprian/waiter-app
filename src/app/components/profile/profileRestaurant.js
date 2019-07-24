import React from "react";
//import {  } from "antd";

class ProfileRestaurant extends React.Component {
  state = {
    selectedFile: null
  };

  fileSelectedHendler = event => {
    console.log(event.target);
  };
  render() {
    return (
      <div>
        <p>Name:</p>
        <input type="text" />
        <p>Menu:</p>
        <input type="text" />
        <p>Image:</p>
        <input type="file" onChange={this.fileSelectedHendler} />
        <button onClick={this.fileUploadHendler}>Upload</button>
      </div>
    );
  }
}

export default ProfileRestaurant;

// const styles = {
//   titleStyle: {
//     display: "flex",
//     marginLeft: "190px",
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
