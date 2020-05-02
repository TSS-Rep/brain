import React, { Component } from 'react'

// import { ExtraInfoATM } from "./ExtraInfoATM";


interface ExtraInfoRowProps {
    colSpan: number;
    keyValue: number;
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
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
              HOLA
            </td>
          </tr>
        );
    }
}
