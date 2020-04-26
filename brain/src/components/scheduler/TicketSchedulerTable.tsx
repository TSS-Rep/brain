import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { IconContext } from "react-icons";
import { FaCheckCircle, FaEye, FaExchangeAlt } from "react-icons/fa";
import { MdCancel, MdLocationOn } from "react-icons/md";

interface TicketSchedulerTableProps {
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
    };
    start_date: string;
    engineer: number;
  }[];
  engineers: {
    name: string;
    _id: number;
    coor: { lat: number; lng: number };
  }[];
  actions: string[];
}

type action = {
  [assign: string]: {
    color: string;
    icon: any;
    handler: any;
  };
};

class TicketSchedulerTable extends Component<TicketSchedulerTableProps> {
  COLUMNS = {
    _id: "ID",
    start_date: "Fecha de Inicio",
    atm: "ATM",
    suggestion: "Asignación Sugerida",
    actions: "ACTIONS",
  };
  ACTIONS: action = {
    assign: {
      color: "green",
      icon: <FaCheckCircle />,
      handler: "",
    },
    change: {
      color: "orange",
      icon: <FaExchangeAlt />,
      handler: "",
    },
    cancel: {
      color: "red",
      icon: <MdCancel />,
      handler: "",
    },
    info: {
      color: "blue",
      icon: <FaEye />,
      handler: "",
    },
    displayOnMap: {
      color: "green",
      icon: <MdLocationOn />,
      handler: "",
    },
  };
  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {Object.values(this.COLUMNS).map((columName) => (
              <th>{columName}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {this.props.tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket._id}</td>
              <td>{ticket.start_date}</td>
              <td>{ticket.atm._id}</td>
              {/* This is harcoded now, this should call a function that get the prediction */}
              <td>
                <span className="p-1">
                  {
                    this.props.engineers.filter(
                      (engineer) => engineer._id === ticket.engineer
                    )[0].name
                  }
                </span>
                <span>
                  {<Badge variant={true ? "success" : "danger"}>0.8</Badge>}
                </span>
              </td>
              <td>
                {this.props.actions.map((action) => (
                  <IconContext.Provider
                    value={{ color: this.ACTIONS[action].color }}
                  >
                    <span className="p-1">{this.ACTIONS[action].icon}</span>
                  </IconContext.Provider>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    );
  }
}

export default TicketSchedulerTable;
