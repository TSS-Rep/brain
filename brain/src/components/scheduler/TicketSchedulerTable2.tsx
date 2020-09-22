import React, { useEffect, useState } from 'react';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { useUnassignedTickets } from 'contexts/UnassignedTickets';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { formattedDate } from 'utils/CleanUtils';
import { callActionsHandler, recurrentATM } from 'utils/TableFormatters';
import { ExtraInfoATM } from 'components/scheduler/ExtraInfoATM';
// import { ExtraInfoEngineer } from 'components/scheduler/ExtraInfoEngineer';
import { ExtraInfoTicket } from 'components/scheduler/ExtraInfoTicket';
import { SetOfActions } from 'components/scheduler/actions/ActionHandler';



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

function handleDisplayExtraData(target: ExtraDataLabel, rows: rows, setRow: any, rowIndex: number) {
    // Always reset (only 1 is displayed)
    rows.displayData[rowIndex]= {
        showExtraInfoATM: false,
        showExtraInfoEngineer: false,
        showChangeEngineer: false,
        showExtraInfoTicket: false,
    }

    switch (target) {
        case ExtraDataLabel.ATM:
            rows.displayData[rowIndex].showExtraInfoATM = !rows.displayData[rowIndex].showExtraInfoATM;
            rows.displayData[rowIndex].showExtraInfoEngineer = false
            rows.displayData[rowIndex].showExtraInfoTicket = false
            break;
        case ExtraDataLabel.ENGINEER:
            rows.displayData[rowIndex].showExtraInfoEngineer = !rows.displayData[rowIndex].showExtraInfoEngineer;
            rows.displayData[rowIndex].showExtraInfoTicket = false
            rows.displayData[rowIndex].showExtraInfoATM = false
            break;
        case ExtraDataLabel.TICKET:
            rows.displayData[rowIndex].showExtraInfoTicket = !rows.displayData[rowIndex].showExtraInfoTicket;
            rows.displayData[rowIndex].showExtraInfoATM = false
            rows.displayData[rowIndex].showExtraInfoEngineer = false
            break;
    
        default:
            break;
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

    const [ rows, setRow ] = useState<rows>({displayData: {}});
    const columns = [
        {
            dataField: '_id',
            text: 'ID',
            headerAlign: 'center',
            events: {
                onClick: (_e: any, _column: any, _columnIndex: number, _row: any, rowIndex: number) => {
                    handleDisplayExtraData(ExtraDataLabel.TICKET, rows, setRow, rowIndex);
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
                    handleDisplayExtraData(ExtraDataLabel.ATM, rows, setRow, rowIndex);
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
            headerAlign: 'center',
            formatter: callActionsHandler,
            formatExtraData: SetOfActions.UNASSIGNED_TICKET,
        }
    ];
    
    const expandRow = {
        renderer: (row: any, rowIndex: any) => {
            return (
                <div>
                    {rows.displayData[rowIndex].showExtraInfoATM && <ExtraInfoATM atm={row.atm_details} />}
                    {/* rows.displayData[rowIndex].showExtraInfoEngineer && <ExtraInfoEngineer engineer={row.atm_details} /> */}
                    {rows.displayData[rowIndex].showExtraInfoTicket && <ExtraInfoTicket ticket={row} />}
                </div>
            )
            
        }
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
