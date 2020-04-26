import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

import BrainMap from "./BrainMap";
import TicketSchedulerTable from "./TicketSchedulerTable";
import "./Scheduler.css";

class Scheduler extends Component {
  tickets = [
    {
      _id: "P267349",
      atm: {
        _id: "X99314",
        service: "SUC",
        brand: "DIEBOLD",
        model: "NEXTGEN 3700",
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
        service: "SUC",
        brand: "DIEBOLD",
        model: "NEXTGEN 3700",
        coor: {
          lat: 19.5692414,
          lng: -99.0436029,
        },
      },
      start_date: "25/04/2020 11:42",
      engineer: 1730276,
    },
  ];
  engineers = [
    {
      name: "Fernando Arias",
      _id: 1730276,
      coor: {
        lat: 19.7682414,
        lng: -99.0436029,
      },
    },

    {
      name: "Alberto Barros",
      _id: 1376310,
      coor: {
        lat: 19.4326071,
        lng: -99.13921299999999,
      },
    },
  ];

  render() {
    return (
      <div id="scheduler">
        <Row>
          <Col className="column">
            <Card className="ml-2 mt-2">
              <Card.Header>Tickets Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={["info", "change", "cancel", "displayOnMap"]}
                />
              </Card.Body>
            </Card>

            <Card className="ml-2 mt-3">
              <Card.Header>Tickets No Asignados</Card.Header>
              <Card.Body>
                <TicketSchedulerTable
                  tickets={this.tickets}
                  engineers={this.engineers}
                  actions={[
                    "assign",
                    "change",
                    "info",
                    "cancel",
                    "displayOnMap",
                  ]}
                />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <BrainMap tickets={this.tickets} engineers={this.engineers} />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Scheduler;
