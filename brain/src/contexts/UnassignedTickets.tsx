import React, { useEffect, useMemo, useState } from 'react';

export const UnassignedTicketsContext = React.createContext({unassignedTickets: []});
export function UnassignedTicketsProvider(props: any) {
	const [ unassignedTickets, setUnassignedTickets ] = useState([]);
	const [ loadingUnassignedTickets, setLoadingUnassignedTickets ] = useState(true);

	useEffect(() => {
		async function get() {
			const response = await fetch("http://localhost:9707/tickets/unassigned");
			const unassignedTickets = await response.json();
			
			setUnassignedTickets(unassignedTickets);
			setLoadingUnassignedTickets(false);
			// return {unassignedTickets, loadingUnassignedTickets};
		};
		get();
	}, [loadingUnassignedTickets]);
	const value = useMemo(() => {
		return ({
			unassignedTickets,
			loadingUnassignedTickets
		})
	}, [ unassignedTickets, loadingUnassignedTickets ])

	return <UnassignedTicketsContext.Provider value={value} {...props} />
}

export function useUnassignedTickets() {
	const context = React.useContext(UnassignedTicketsContext)

	if (!context) {
		throw new Error("useUnassignedTickets should be inside the UnassignedTicketsContext provider");
		
	}
	return context
}



