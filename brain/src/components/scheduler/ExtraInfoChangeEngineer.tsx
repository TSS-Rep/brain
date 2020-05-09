import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";

interface Ticket {
    _id: string;
    atm: ATM
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
      region: string,
      service_time: string,
      coor: {
        lat: number;
        lng: number;
      };
    };

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
}

const COLUMN_NAMES = ["Nombre", "Conveniencia"]

export class ExtraInfoChangeEngineer extends Component<ExtraInfoChangeEngineerProps> {
  engineersRecommended: Engineer[];
  constructor(props: ExtraInfoChangeEngineerProps){
    super(props)

    this.engineersRecommended = this.getEngineersRecommended(this.props.ticket)

  }
  // This should be a request to ML server.
  getEngineersRecommended = (ticket: Ticket) => {
    console.log(ticket.atm._id);
    let engineers: Engineer[] = [
      {
        name: "CALVILLO FLORIANO JOSE DE JESUS",
        _id: 1730276,
        coor: {
          lat: 19.7682414,
          lng: -99.0436029,
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
                    <th>{column}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {this.engineersRecommended.map((engineer) => (
                  <tr>
                    <td onDoubleClick={() => window.alert("double")}>{engineer.name}</td>
                    <td>
                      {
                        <Badge variant={true ? "warning" : "danger"}>
                          0.65
                        </Badge>
                      }
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
