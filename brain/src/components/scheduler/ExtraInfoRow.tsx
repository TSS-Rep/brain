import React, { Component } from 'react'

import { ExtraInfoATM } from "components/scheduler/ExtraInfoATM";
import { ExtraInfoEngineer } from "components/scheduler/ExtraInfoEngineer";
import { ExtraInfoChangeEngineer } from "components/scheduler/ExtraInfoChangeEngineer";
import Ticket from 'interfaces/Ticket';
import Engineer from 'interfaces/Engineer';


interface ExtraInfoRowProps {
    colSpan: number;
    keyValue: number;
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
    ticket: Ticket;

    engineer: Engineer;

    map: google.maps.Map|null;
}


export default class ExtraInfoRow extends Component<ExtraInfoRowProps> {
    render() {
        const className = (this.props.show) ? "collapse show" : "collapse"

        return (
          <tr className={className} key={"extraInfoRow" + this.props.keyValue}>
            <td
              key={"extraInfoCell" + this.props.keyValue}
              colSpan={this.props.colSpan}
            >
              {this.props.show && this.props.showExtraInfoATM && (
                <ExtraInfoATM atm={this.props.ticket.atm} />
              )}
              {this.props.show && this.props.showExtraInfoEngineer && (
                <ExtraInfoEngineer engineer={this.props.engineer} />
              )}
              {this.props.show && this.props.showChangeEngineer && (
                <ExtraInfoChangeEngineer ticket={this.props.ticket} map={this.props.map} />
              )}
            </td>
          </tr>
        );
    }
}
