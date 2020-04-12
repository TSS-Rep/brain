import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class BrainMap extends Component {
  defaultProps = {
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
        style={{ height: "100vh", width: "50%" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: "" }}
          defaultCenter={this.defaultProps.center}
          defaultZoom={this.defaultProps.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default BrainMap;
