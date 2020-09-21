import React, { useEffect, useState } from 'react';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { useUnassignedTickets } from 'contexts/UnassignedTickets';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { formattedDate } from 'utils/CleanUtils';
import { recurrentATM } from 'utils/TableFormatters';
import { ExtraInfoATM } from 'components/scheduler/ExtraInfoATM';
import { ExtraInfoEngineer } from 'components/scheduler/ExtraInfoEngineer';
import { ExtraInfoTicket } from 'components/scheduler/ExtraInfoTicket';



type rowState = {
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
    showExtraInfoTicket: boolean;
}

type displayControl = {
    [assign: number]: rowState;
};

interface rows {
    displayData: displayControl,
    expanded: number[],
    
}

const paginationOptions = {
	// pageStartIndex: 0,
	sizePerPage: 5,
	hideSizePerPage: true,
	hidePageListOnlyOnePage: true
};

interface Provider {
	atm: string;
	_id: string;
}

enum ExtraDataLabel {
    ATM = "ATM",
    ENGINEER = "ENGINEER",
    TICKET = "TICKET",
}

function handleDisplayExtraData(target: ExtraDataLabel, rows: rows, setRow: any, isRowExpanded: boolean, rowIndex: number) {
    // If the row is expanded and atm extra data is shown already then toggle the data
    if (!isRowExpanded) {
        rows.expanded.push(rowIndex);
        rows.displayData[rowIndex]= {
            showExtraInfoATM: false,
            showExtraInfoEngineer: false,
            showChangeEngineer: false,
            showExtraInfoTicket: false,
        }
    }
    switch (target) {
        case ExtraDataLabel.ATM:
            rows.displayData[rowIndex].showExtraInfoATM = !rows.displayData[rowIndex].showExtraInfoATM;
            break;
        case ExtraDataLabel.ENGINEER:
            rows.displayData[rowIndex].showChangeEngineer = !rows.displayData[rowIndex].showExtraInfoEngineer;
            break;
        case ExtraDataLabel.TICKET:
            rows.displayData[rowIndex].showExtraInfoTicket = !rows.displayData[rowIndex].showExtraInfoTicket;
            break;
    
        default:
            break;
    }
    let is_anything_displayed = Object.values(rows.displayData[rowIndex]).some((val: boolean) => val === true)
    if (!is_anything_displayed) {
        rows.expanded.filter((x: number) => x !== rowIndex)
    }
    setRow(rows);
}

export default function TicketSchedulerTable2() {
	const { unassignedTickets } = useUnassignedTickets();
    const [ tickets, setTickets ] = useState<Provider[]>([]);

	useEffect(
		() => {
			let temp = unassignedTickets.map((ticket: any) => {
                ticket.atm_details = ticket.atm;
                ticket.atm_details.recurrent = true;
                ticket.atm = ticket.atm._id;
				ticket.id = ticket._id;
				ticket.start_date = formattedDate(ticket.start_date);
				return ticket;
			});
			setTickets(temp);
		},
		[ unassignedTickets ]
    );

    const [ rows, setRow ] = useState<rows>({displayData: {}, expanded: []});
    const columns = [
        {
            dataField: '_id',
            text: 'ID',
            headerAlign: 'center',
            events: {
                onClick: (_e: any, _column: any, _columnIndex: number, _row: any, rowIndex: number) => {
                const isRowExpanded = rows.expanded.includes( rowIndex );
                handleDisplayExtraData(ExtraDataLabel.TICKET, rows, setRow, isRowExpanded, rowIndex);
                }
            }
        },
        {
            dataField: 'start_date',
            text: 'Fecha de Inicio',
            headerAlign: 'center'
        },
        {
            dataField: 'atm',
            text: 'ATM',
            headerAlign: 'center',
            formatter: recurrentATM,
            events: {
                onClick: (_e: any, _column: any, _columnIndex: number, _row: any, rowIndex: number) => {
                const isRowExpanded = rows.expanded.includes( rowIndex );
                handleDisplayExtraData(ExtraDataLabel.ATM, rows, setRow, isRowExpanded, rowIndex);
                }
            }
        },
        {
            dataField: 'suggestion',
            text: 'Asignación Sugerida',
            headerAlign: 'center'
        },
        {
            dataField: 'actions',
            text: 'ACTIONS',
            headerAlign: 'center'
        }
    ];
    
    const expandRow = {
        renderer: (row: any, rowIndex: any) => {
                if (rows.displayData[rowIndex].showExtraInfoATM) {
                    return (
                        <ExtraInfoATM atm={row.atm_details} />
                    )
                  } 
                else if (rows.displayData[rowIndex].showExtraInfoEngineer){
                    return (
                        <ExtraInfoEngineer engineer={row.atm_details} />
                    )
                }
                else if (rows.displayData[rowIndex].showExtraInfoTicket){
                    return (
                        <ExtraInfoTicket ticket={row} />
                    )
                }
                else {
                    return <div>Cargando...</div>
                  }
        },
        expanded: rows.expanded,
    };

	return (
		<div id="test">
			<BootstrapTable
				keyField="id"
				data={tickets}
				columns={columns}
				striped
				hover
				condensed
                expandRow={expandRow}
                pagination={paginationFactory(paginationOptions)}
			/>
		</div>
	);
}
