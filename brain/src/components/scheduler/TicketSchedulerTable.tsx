import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { IconContext } from "react-icons";
import { FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
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
  handleShowMore?: any
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
    this.displayExtraInfoHandler(e);
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

  displayExtraInfoHandler = (e: any) => {
    /**
     *  Click come from an specific cell in the table, so we need to find
     * the closest row which is its direct ancestor and from this row
     * get the next row which is the display area.
     */
    const hiddenElement = e.currentTarget.closest('tr').nextSibling;
    hiddenElement.className.indexOf("collapse show") > -1 ? hiddenElement.classList.remove("show") : hiddenElement.classList.add("show");
  };

  createTable = () => {
    let table = []

    for (let index = 0; index < this.props.tickets.length * 2; index++) {
      let children = []
      
      if (index % 2 === 0) {
        let ticket = this.props.tickets[index  / 2];
        children.push(<td key={"id" + index}>{ticket._id}</td>)
        children.push(<td key={"startDate" + index}>{ticket.start_date}</td>)
        children.push(<td key={"atm" + index}> <div onClick={this.displayExtraInfoHandler}> {ticket.atm._id}</div></td>)
        children.push(
          <td key={"eng" + index}>
            <span className="p-1" onClick={this.displayExtraInfoHandler}>
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
        );
        children.push(<td key={"actions" + index}>
            {this.props.actions.map((action) => (
              <IconContext.Provider
                key={action + index}
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
        )
        table.push(<tr key={ticket._id}>{children}</tr>)
      }
      else {
        children.push(<td key={"extraInfo" + index} colSpan={Object.keys(this.COLUMNS).length}>HOLA</td>)
        table.push(<tr className="collapse" key={"extraData" + index}>{children}</tr>)
      }
      
    }

    return table
  }

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
          {
            this.createTable()
          }
        </tbody>
      </Table>
    );
  }
}

export default TicketSchedulerTable;
