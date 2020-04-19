import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class BrainMap extends Component {
  initialPosition = {
    center: {
      lat: 19.4978,
      lng: -99.1269,
    },
    zoom: 12,
  };
  render() {
    return (
      // Important! Always set the container height explicitly
      <div
        className="justify-content-md-left"
        style={{ height: "80vh", width: "100%" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAtM1Vf4iDDY_ALVp-xlpXu7HJ6xxCXjVQ" }}
          defaultCenter={this.initialPosition.center}
          defaultZoom={this.initialPosition.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default BrainMap;
