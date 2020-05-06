import React, { Component } from 'react'

import { ExtraInfoATM } from "./ExtraInfoATM";
import { ExtraInfoEngineer } from "./ExtraInfoEngineer";


interface ExtraInfoRowProps {
    colSpan: number;
    keyValue: number;
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
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
    engineer: {
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
                <ExtraInfoATM atm={this.props.atm} />
              )}
              {this.props.show && this.props.showExtraInfoEngineer && (
                <ExtraInfoEngineer engineer={this.props.engineer} />
              )}
            </td>
          </tr>
        );
    }
}
