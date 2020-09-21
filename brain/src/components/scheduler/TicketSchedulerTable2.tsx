import React, { useEffect, useState } from 'react';
// import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import BootstrapTable from 'react-bootstrap-table-next';
import { useUnassignedTickets } from 'contexts/UnassignedTickets';
import paginationFactory from 'react-bootstrap-table2-paginator';
import { formattedDate } from 'utils/CleanUtils';
import { recurrentATM } from 'utils/TableFormatters';
import { ExtraInfoATM } from 'components/scheduler/ExtraInfoATM';



type rowState = {
    show: boolean;
    showExtraInfoATM: boolean;
    showExtraInfoEngineer: boolean;
    showChangeEngineer: boolean;
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
            headerAlign: 'center'
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

                    // If the row is expanded and atm extra data is shown already then toggle the data
                    if (!isRowExpanded) {
                        rows.expanded.push(rowIndex);
                        rows.displayData[rowIndex]= {
                            show: false,
                            showExtraInfoATM: false,
                            showExtraInfoEngineer: false,
                            showChangeEngineer: false,
                        }
                    }
                    rows.displayData[rowIndex].showExtraInfoATM = !rows.displayData[rowIndex].showExtraInfoATM;
                    let is_anything_displayed = Object.values(rows.displayData[rowIndex]).some((val: boolean) => val === true)
                    if (!is_anything_displayed) {
                        rows.expanded.filter((x: number) => x !== rowIndex)
                    }
                    setRow(rows);
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
                  } else {
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
