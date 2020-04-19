import React, { Component } from "react";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";

import BrainMap from "./BrainMap";

class Scheduler extends Component {
  state = { width: 200, height: 200 };
  tickets = [
    {
      _id: "P267349",
      service: "SUC",
      engineer: 1730276,
      coor: {
        lat: 19.5682414,
        lng: -99.0436029,
      },
    },

    {
      _id: "P563F01",
      service: "SUC",
      engineer: 1376310,
      coor: {
        lat: 19.4326071,
        lng: -99.15921299999999,
      },
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
          <Col>
            <Card>
              <Card.Header>Tickets Asignados</Card.Header>
              <Card.Body>
                <Card.Text>
                  <Table striped bordered hover size="sm">
                    <thead>
                      <tr>
                        <th>Ticket</th>
                        <th>Ingeniero Asignado</th>
                      </tr>
                    </thead>
                    <tbody>
                      {this.tickets.map((ticket) => (
                        <tr key={ticket._id}>
                          <td>{ticket._id}</td>
                          <td>
                            {
                              this.engineers.filter(
                                (engineer) => engineer._id === ticket.engineer
                              )[0].name
                            }
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Card.Text>
              </Card.Body>
            </Card>

            <Card>
              <Card.Header>Tickets No Asignados</Card.Header>
              <Card.Body>
                <Card.Title>Special title treatment</Card.Title>
                <Card.Text>
                  With supporting text below as a natural lead-in to additional
                  content.
                </Card.Text>
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
