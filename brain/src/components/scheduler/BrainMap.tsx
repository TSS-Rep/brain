import React, { Component } from "react";

import GoogleMapReact from "google-map-react";

import MapCard from "../commons/MapCard";

interface MapProps {
  tickets: {
    _id: string;
    service: string;
    engineer: number;
    coor: {
      lat: number;
      lng: number;
    };
  }[];
  engineers: {
    name: string;
    _id: number;
    coor: { lat: number; lng: number };
  }[];
}

class BrainMap extends Component<MapProps> {
  initialPosition = {
    center: {
      lat: 19.4978,
      lng: -99.1269,
    },
    zoom: 12,
  };
  render() {
    console.log(this.props);
    return (
      // Important! Always set the container height explicitly
      <div
        className="justify-content-md-left"
        style={{ height: "80vh", width: "100%" }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={this.initialPosition.center}
          defaultZoom={this.initialPosition.zoom}
        >
          {this.props.tickets.map((ticket) => (
            <MapCard {...ticket.coor} service={ticket.service} />
          ))}
          {this.props.engineers.map((engineer) => (
            <MapCard {...engineer.coor} service={null} />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default BrainMap;
