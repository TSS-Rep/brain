import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { IconContext } from "react-icons";
import { FaCheckCircle, FaEye, FaExchangeAlt } from "react-icons/fa";
import { MdCancel, MdLocationOn, MdLocationOff } from "react-icons/md";

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
  // Delete from the DB
  private handleTicketAssign = async (e: any) => {
    console.log(e);
  };
  // Delete from the DB
  private handleTicketCancelation = async (e: any) => {
    console.log(e);
  };
  // Delete from the DB
  private handleEnginnerChange = async (e: any) => {
    console.log(e);
  };
  // Delete from the DB
  private handleShowInfo = async (e: any) => {
    console.log(e);
  };
  // Delete from the DB
  private handleDisplayOnMap = async (e: any) => {
    console.log(e);
  };
  ACTION_LENGTH_OF_UNASSIGNED = 4;
  COLUMNS = {
    _id: "ID",
    start_date: "Fecha de Inicio",
    atm: "ATM",
    suggestion:
      this.props.actions.length > this.ACTION_LENGTH_OF_UNASSIGNED
        ? "Asignación Sugerida"
        : "Ingeniero Asignado",
    actions: "ACTIONS",
  };
  ACTIONS: action = {
    assign: {
      color: "green",
      icon: <FaCheckCircle />,
      handler: this.handleTicketAssign,
    },
    change: {
      color: "orange",
      icon: <FaExchangeAlt />,
      handler: this.handleEnginnerChange,
    },
    cancel: {
      color: "red",
      icon: <MdCancel />,
      handler: this.handleTicketCancelation,
    },
    info: {
      color: "blue",
      icon: <FaEye />,
      handler: this.handleShowInfo,
    },
    displayOnMap: {
      color: "green",
      icon: <MdLocationOn />,
      handler: this.handleDisplayOnMap,
    },
    noDisplayOnMap: {
      color: "green",
      icon: <MdLocationOff />,
      handler: this.handleDisplayOnMap,
    },
  };

  render() {
    return (
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            {Object.values(this.COLUMNS).map((columName) => (
              <th key={columName}>{columName}</th>
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
                    key={action}
                    value={{
                      color: this.ACTIONS[action].color,
                    }}
                  >
                    <span
                      onClick={this.ACTIONS[action].handler.bind(this)}
                      className="active p-1"
                    >
                      {this.ACTIONS[action].icon}
                    </span>
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
