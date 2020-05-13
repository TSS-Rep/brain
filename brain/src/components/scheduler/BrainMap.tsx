import React, { Component } from "react";

import GoogleMapReact from "google-map-react";
import { DirectionsRenderer  } from "react-google-maps";

import MapCard from "../commons/MapCard";

import "./Scheduler.css";

interface MapProps {
  tickets: {
    _id: string;
    atm: {
      _id: string;
      brand: string;
      model: string;
      service: string;
      coor: {
        lat: number;
        lng: number;
      };
      recurrent: boolean;
    };
    start_date: string;
    engineer?: number;
  }[];
  engineers: {
    name: string;
    _id: number;
    coor: { lat: number; lng: number };
  }[];
}

type BrainMapState = {
  directions?: any;
}

class BrainMap extends Component<MapProps> {
  state: BrainMapState;
  initialPosition = {
    center: {
      lat: 19.4978,
      lng: -99.1269,
    },
    zoom: 12,
  };

  constructor(props: any){
    super(props)
    const DirectionsService = new google.maps.DirectionsService();
    this.state = {};

    DirectionsService.route(
      {
        origin: new google.maps.LatLng(19.5682414, -99.0436029),
        destination: new google.maps.LatLng(19.7682414, -99.0436029),
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        // console.log("status", status);
        if (status === window.google.maps.DirectionsStatus.OK) {
          this.setState({
            directions: result,
          });
          console.log(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );

    //const directionsRenderer = new google.maps.DirectionsRenderer();
}

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="BrainMap" className="schedulerMap  justify-content-md-left">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={this.initialPosition.center}
          defaultZoom={this.initialPosition.zoom}
        >
          {this.props.tickets.map((ticket) => (
            <MapCard
              {...ticket.atm.coor}
              service={ticket.atm.service}
              key={ticket._id}
            />
          ))}
          {this.props.engineers.map((engineer) => (
            <MapCard {...engineer.coor} service={null} key={engineer._id} />
          ))}

          {this.state.directions && (
            <DirectionsRenderer
              directions={this.state.directions}
              options={{
                polylineOptions: {
                  strokeOpacity: 0.4,
                  strokeWeight: 4,
                },
                preserveViewport: true,
                suppressMarkers: true,
              }}
            />
          )}
        </GoogleMapReact>
      </div>
    );
  }
}

export default BrainMap;
