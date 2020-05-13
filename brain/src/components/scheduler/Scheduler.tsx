import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import BrainMap from "./BrainMap";
import TicketSchedulerTable from "./SchedulerTicketTable";
import "./Scheduler.css";

interface SchedulerState {
  tickets: Ticket[] | [];
  ticketsShowedOnMap: {
    [key: string]: boolean;
  };
}

interface Ticket {
  _id: string;
  atm: {
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
    reincident: boolean;
    coor: {
      lat: number;
      lng: number;
    };
  };
  start_date: string;
  engineer?: number;
}

type showOnMap = {
  [key: string]: boolean;
};

class Scheduler extends Component {
  private tickets: Ticket[];
  private engineers: any[];
  private ticketsShowedOnMap: showOnMap = {};
  state: SchedulerState;
  constructor(props: any) {
    super(props);
    this.tickets = [
      {
        _id: "P267349",
        atm: {
          _id: "X99314",
          address: "AV. VIA MORELOS NO. 242",
          suburb: "SANTA MARIA TULPETLAC",
          postal_code: 55400,
          city: "ECATEPEC DE MORELOS",
          state: "ESTADO DE MEXICO",
          service: "SUC",
          brand: "DIEBOLD",
          model: "NEXTGEN 3700",
          region: "METRO NORTE",
          service_time: "L-V 09:00-16:00",
          reincident: false,
          coor: {
            lat: 19.5682414,
            lng: -99.0436029,
          },
        },
        start_date: "25/04/2020 11:42",
        engineer: 1730276,
      },

      {
        _id: "P265372",
        atm: {
          _id: "X99314",
          address: "AV. VIA MORELOS NO. 242",
          suburb: "SANTA MARIA TULPETLAC",
          postal_code: 55400,
          city: "ECATEPEC DE MORELOS",
          state: "ESTADO DE MEXICO",
          service: "SUC",
          brand: "DIEBOLD",
          model: "NEXTGEN 3700",
          region: "METRO NORTE",
          service_time: "L-V 09:00-16:00",
          reincident: true,
          coor: {
            lat: 19.5092414,
            lng: -99.0836029,
          },
        },
        start_date: "25/04/2020 11:42",
        engineer: 1376310,
      },
    ];
    this.engineers = [
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

    for (let i = 0; i < this.tickets.length; i++) {
      let ticket = this.tickets[i];
      this.ticketsShowedOnMap[ticket._id] = true;
    }

    this.state = {
      tickets: this.tickets,
      // Show all the tickets by default
      ticketsShowedOnMap: this.ticketsShowedOnMap,
    };
  }

  handleTicketsShowedOnMapState(ticketsShowedOnMap: showOnMap) {
    console.log(ticketsShowedOnMap);
    this.setState({ ticketsShowedOnMap });
  }

  render() {
    return (
      <div id="scheduler">
        <Row>
          <Col className="ml-4">
            <Card className=" mt-2">
              <Card.Header>Tickets Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={["change", "cancel", "displayOnMap"]}
                  ticketsShowedOnMap={this.state.ticketsShowedOnMap}
                  handleTicketsShowedOnMapState={this.handleTicketsShowedOnMapState.bind(
                    this
                  )}
                />
              </Card.Body>
            </Card>

            <Card className=" mt-2">
              <Card.Header>Tickets No Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={["assign", "change", "cancel", "displayOnMap"]}
                  ticketsShowedOnMap={this.state.ticketsShowedOnMap}
                  handleTicketsShowedOnMapState={this.handleTicketsShowedOnMapState.bind(
                    this
                  )}
                />
              </Card.Body>
            </Card>
          </Col>

          <Col>
            <BrainMap
              tickets={this.state.tickets.filter((ticket) => {
                return this.state.ticketsShowedOnMap[ticket._id];
              })}
              engineers={this.engineers}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Scheduler;
