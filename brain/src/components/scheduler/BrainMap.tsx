import React, { Component} from "react";

import GoogleMapReact from "google-map-react";
// import { DirectionsRenderer  } from "react-google-maps";

import MapCard from "../commons/MapCard";
 //import {DirectionsRendererTest} from "./TestDisplayRoute";
//import Test from './test'

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
  setMap(map:google.maps.Map): void;
}

interface GoogleApiLoaded {
  map: google.maps.Map
}

type BrainMapState = {
  directions?: any;
}

class BrainMap extends Component<MapProps> {
  state: BrainMapState;
  map: google.maps.Map | null;
  initialPosition = {
    center: {
      lat: 19.4978,
      lng: -99.1269,
    },
    zoom: 12,
  };

  constructor(props: any) {
    super(props);
    const DirectionsService = new google.maps.DirectionsService();
    this.state = {};
    this.map = null;

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

  handleApiLoaded(mapInstance: google.maps.Map) {
    this.map = mapInstance;
    this.props.setMap(mapInstance)
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div id="BrainMap" className="schedulerMap  justify-content-md-left">
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_API_KEY }}
          defaultCenter={this.initialPosition.center}
          defaultZoom={this.initialPosition.zoom}
          onGoogleApiLoaded={({ map }: GoogleApiLoaded) =>
            this.handleApiLoaded(map)
          }
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

          {
            // <Test
            //   map={this.map}
            //   origin={{
            //     lat: 19.5092414,
            //     lng: -99.0836029,
            //   }}
            //   destination={{
            //     lat: 19.5292414,
            //     lng: -99.0611029,
            //   }}
            // />
          }

          {/* {this.map && (
            <DirectionsRendererTest
              map={this.map}
              origin={{
                lat: 19.5092414,
                lng: -99.0836029,
              }}
              destination={{
                lat: 19.5292414,
                lng: -99.0611029,
              }}
            />
          )} */}
        </GoogleMapReact>
      </div>
    );
  }
}

export default BrainMap;
