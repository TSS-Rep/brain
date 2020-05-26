import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

//import Test from "./test";

interface Ticket {
  _id: string;
  atm: ATM;
  start_date: string;
  engineer?: number;
}

interface ATM {
  _id: string;
  address: string;
  suburb: string;
  postal_code: number;
  city: string;
  state: string;
  brand: string;
  model: string;
  service: string;
  region: string;
  service_time: string;
  recurrent: boolean;
  coor: {
    lat: number;
    lng: number;
  };
}

interface Engineer {
  name: string;
  _id: number;
  coor: { lat: number; lng: number };
  region: string;
  sub_region: string;
  state: string;
  city: string;
  platform: string;
  manager: string;
}
interface ExtraInfoChangeEngineerProps {
  ticket: Ticket;
  map: google.maps.Map|null
}

const COLUMN_NAMES = [
  "Nombre",
  "Conveniencia",
  "Tiempo de Llegada",
  "Distancia",
];

export class ExtraInfoChangeEngineer extends Component<
  ExtraInfoChangeEngineerProps
> {
  engineersRecommended: Engineer[];
  state: any;
  constructor(props: ExtraInfoChangeEngineerProps) {
    super(props);
    this.engineersRecommended = this.getEngineersRecommended(this.props.ticket);
    this.state = this.initState();
    console.log(this.engineersRecommended);
    console.log(this.state);
    this.engineersRecommended.forEach(eng => {
      this.getDistance(eng._id, this.props.ticket.atm.coor, eng.coor);
    })
  }

  initState = () => {
    let st: any = {};
    this.engineersRecommended.forEach((eng) => {
      st[eng._id] = {
        time: 0,
        distance: 0,
      };
    });
    return st;
  };
  // This should be a request to ML server.
  getEngineersRecommended = (ticket: Ticket) => {
    console.log(ticket.atm._id);
    let engineers: Engineer[] = [
      {
        name: "CALVILLO FLORIANO JOSE DE JESUS",
        _id: 1730276,
        coor: {
          lat: 19.5292414,
          lng: -99.0611029,
        },
        region: "NORTE",
        sub_region: "NOROESTE",
        state: "AGUASCALIENTES",
        city: "AGUASCALIENTES",
        platform: "Self Service",
        manager: "Cynthia Plata",
      },

      {
        name: "Alberto Barros",
        _id: 1376310,
        coor: {
          lat: 19.4326071,
          lng: -99.13921299999999,
        },
        region: "NORTE",
        sub_region: "NOROESTE",
        state: "AGUASCALIENTES",
        city: "AGUASCALIENTES",
        platform: "Self Service",
        manager: "Cynthia Plata",
      },
    ];
    return engineers;
  };
  // This will be added in the backend and the distance result will be part of the recomendation
  getDistance = (eng: number, origin: any, dest: any) => {
    const DistanceMatrixService = new google.maps.DistanceMatrixService();
    DistanceMatrixService.getDistanceMatrix(
      {
        origins: [origin],
        destinations: [dest],
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (res, status) => {
        if (status !== google.maps.DistanceMatrixStatus.OK) {
          alert("Error was: " + status);
        } else {
          console.log(res);
          let state: any = {};
          state[eng] = {
            time: res.rows[0].elements[0].duration.text,
            distance: res.rows[0].elements[0].distance.text,
          };
          this.setState(state);
        }
      }
    );
  };

  draw_route(origin:any, destination:any){
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: origin,
        destination: destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: google.maps.TrafficModel.OPTIMISTIC,
        },
      },
      (result, status) => {
        // console.log("status", status);
        if (status === window.google.maps.DirectionsStatus.OK) {
          console.log(result);
          let leg = result.routes[0].legs[0];
          const directionsRenderer = new google.maps.DirectionsRenderer({
            polylineOptions: {
              strokeColor: this.get_route_color(
                leg.distance.value,
                leg.duration_in_traffic.value
              ),
              geodesic: true,
              strokeWeight: 5,
            },
          });

          directionsRenderer.setMap(this.props.map);
          directionsRenderer.setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      }
    );
  }

  get_route_color(distance: number, duration: number) {
      // convert between meters and seconds to km and hours
      let hours = duration / 3600;
      let km = distance / 1000;
      let traffic_speed = km / hours;
      let color = (traffic_speed >= 80) ? "#24f70c" : (traffic_speed >= 25 && traffic_speed < 80)? "#f7b50c": "#eb4034";
      return color
    }

  render() {
    return (
      <div className="p-1">
        <Card style={{ width: "100%" }}>
          <Card.Header>Ingenieros sugeridos</Card.Header>
          <Card.Body>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  {COLUMN_NAMES.map((column) => (
                    <th key={`column_${column}`}>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.engineersRecommended.map((engineer) => (
                  <tr key={`row_${engineer._id}`}>
                    <td onDoubleClick={() => window.alert("double")}>
                      {engineer.name}
                    </td>
                    <td>
                      {
                        <Badge variant={true ? "warning" : "danger"}>
                          0.65
                        </Badge>
                      }
                    </td>
                    <td>
                      <span
                        key={engineer._id}
                        onClick={() =>
                          this.draw_route(engineer.coor, this.props.ticket.atm.coor)
                        }
                      >
                        {this.state[engineer._id].time}
                        </span>
                    </td>
                    <td>
                      <span
                        key={engineer._id}
                        onClick={() =>
                          this.getDistance(
                            engineer._id,
                            this.props.ticket.atm.coor,
                            engineer.coor
                          )
                        }
                      >
                        {this.state[engineer._id].distance}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
