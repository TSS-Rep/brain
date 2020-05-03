import React, { Component } from "react";

import Table from "react-bootstrap/Table";
import Badge from "react-bootstrap/Badge";
import { IconContext } from "react-icons";
import { FaCheckCircle, FaExchangeAlt } from "react-icons/fa";
import { MdCancel, MdLocationOn, MdLocationOff } from "react-icons/md";

import ExtraInfoRow from "./ExtraInfoRow";

interface TicketSchedulerTableProps {
  tickets: {
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
      region: string,
      service_time: string,
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
    region: string;
    sub_region: string;
    state: string;
    city: string;
    platform: string;
    manager: string;
  }[];
  actions: string[];
  handleShowMore?: any
}

interface TicketSchedulerTableState {
  // Used to store tthe state of each row of extra info.
  showExtraInfo: [
    {
      show: boolean;
      showExtraInfoATM: boolean;
      showExtraInfoEngineer: boolean;
      showChangeEngineer: boolean;
    }
  ]
}

type action = {
  [assign: string]: {
    color: string;
    icon: any;
    handler: any;
  };
};

type showRowsState = [{
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
  }]

class TicketSchedulerTable extends Component<TicketSchedulerTableProps, TicketSchedulerTableState> {

  // Declare state property and annotate it with TicketSchedulerTableState
  state: TicketSchedulerTableState
  constructor(props: TicketSchedulerTableProps) {
    super(props)

    let showExtraInfo: showRowsState = [
      {
        show: false,
        showExtraInfoATM: false,
        showExtraInfoEngineer: false,
        showChangeEngineer: false,
      },
    ];
    for(let i = 0; i < this.props.tickets.length - 1; i++){
      showExtraInfo.push({
        show: false,
        showExtraInfoATM: false,
        showExtraInfoEngineer: false,
        showChangeEngineer: false,
      });
    }
    console.log(showExtraInfo.length);
    this.state = {showExtraInfo};

  }
  
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
    this.displayExtraInfoHandler(this.INVOKERS['CHANGE'], 0);
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
      this.props.actions.length === this.ACTION_LENGTH_OF_UNASSIGNED
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
  INVOKERS = {
    'ATM': 'ATM',
    'ENG': 'ENG',
    'CHANGE': 'CHANGE'
  }

  displayExtraInfoHandler = (invoker: string, index: number) => {
    let eng, change, atm;
    // The index represent the visible row but the row we want is the next
    index = (index === 0) ? 0 : index - 1
    let showExtraInfo = { ...this.state.showExtraInfo };

    switch (invoker) {
      case this.INVOKERS["ATM"]:
        showExtraInfo[index].showExtraInfoATM = !showExtraInfo[index].showExtraInfoATM;
        break;
      case this.INVOKERS["ENG"]:
        showExtraInfo[index].showExtraInfoEngineer = !showExtraInfo[index].showExtraInfoEngineer;
        break;
      case this.INVOKERS["CHANGE"]:
        break;

      default:
        break;
    }

    eng = showExtraInfo[index].showExtraInfoEngineer;
    change = showExtraInfo[index].showChangeEngineer;
    atm = showExtraInfo[index].showExtraInfoATM;
    showExtraInfo[index].show =
      eng || change || atm ? true : !showExtraInfo[index].show;
    this.setState({ showExtraInfo });
  };

  createTable = () => {
    let table = [];

    // Traverse 2 * length time because for each ticket row a extra data row is added.
    for (let index = 0; index < this.props.tickets.length * 2; index++) {
      let children = []
      
      // Ticket row
      if (index % 2 === 0) {
        let ticket = this.props.tickets[index  / 2];
        let engineerName = this.props.engineers.filter(
          (engineer) => engineer._id === ticket.engineer
        )[0].name;
        children.push(<td key={"id" + index}>{ticket._id}</td>)
        children.push(<td key={"startDate" + index}>{ticket.start_date}</td>)
        children.push(
          <td key={"atm" + index}>
            {" "}
            <div onClick={() => this.displayExtraInfoHandler(this.INVOKERS['ATM'], index)}>
              {" "}
              {ticket.atm._id}
            </div>
          </td>
        );
        children.push(
          <td key={"eng" + index}>
            <span
              className="p-1"
              onClick={() =>
                this.displayExtraInfoHandler(this.INVOKERS["ENG"], index)
              }
            >
              {engineerName}
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
      // Extra info row
      else {
        let ticket = this.props.tickets[(index - 1) / 2];
        let engineer = this.props.engineers.filter(
          (engineer) => engineer._id === ticket.engineer
        )[0];
        let i = index === 1 ? 0 : index - 2;
        console.log(Object.keys(this.COLUMNS).length);
        table.push(
          <ExtraInfoRow
            keyValue={i}
            colSpan={Object.keys(this.COLUMNS).length}
            key={i}
            show= {this.state.showExtraInfo[i].show || false}
            showExtraInfoATM= {this.state.showExtraInfo[i].showExtraInfoATM || false}
            showExtraInfoEngineer= {this.state.showExtraInfo[i].showExtraInfoEngineer || false}
            showChangeEngineer= {this.state.showExtraInfo[i].showChangeEngineer || false}
            atm={ticket.atm}
            engineer={engineer}
          />
        );
      }
      
    }

    console.log("returne ", table)
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
