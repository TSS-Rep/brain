import React, { Component } from 'react'

import { ExtraInfoATM } from "./ExtraInfoATM";


interface ExtraInfoRowProps {
    colSpan: number;
    keyValue: number;
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
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
}


export default class ExtraInfoRow extends Component<ExtraInfoRowProps> {
    render() {
        const className = (this.props.show) ? "collapse show" : "collapse"
        console.log('this.props.show', this.props.show)
        return (
          <tr className={className} key={"extraInfoRow" + this.props.keyValue}>
            <td
              key={"extraInfoCell" + this.props.keyValue}
              colSpan={this.props.colSpan}
            >
              {
                  this.props.show && this.props.showExtraInfoATM && <ExtraInfoATM atm={this.props.atm}/>
              }
            </td>
          </tr>
        );
    }
}
