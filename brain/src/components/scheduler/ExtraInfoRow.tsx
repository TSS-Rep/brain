import React, { Component } from 'react'

import { ExtraInfoATM } from "./ExtraInfoATM";
import { ExtraInfoEngineer } from "./ExtraInfoEngineer";
import { ExtraInfoChangeEngineer } from "./ExtraInfoChangeEngineer";


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
      region: string,
      service_time: string,
      recurrent: boolean;
      coor: {
        lat: number;
        lng: number;
      };
    };
    start_date: string;
    engineer?: number;
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

interface ExtraInfoRowProps {
    colSpan: number;
    keyValue: number;
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
    ticket: Ticket;

    engineer: Engineer;
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
                <ExtraInfoChangeEngineer ticket={this.props.ticket} />
              )}
            </td>
          </tr>
        );
    }
}
