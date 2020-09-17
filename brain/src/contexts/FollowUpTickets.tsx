import React, { useEffect, useMemo, useState } from 'react';

export const FollowUpTicketsContext = React.createContext({followUpTickets: []});
export function FollowUpTicketsProvider(props: any) {
	const [ followUpTickets, setFollowUpTickets ] = useState([]);
	const [ loadingFollowUpTickets, setLoadingFollowUpTickets ] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:9707/tickets/followup");
			const followUpTickets = await response.json();
			
			setFollowUpTickets(followUpTickets);
			setLoadingFollowUpTickets(false);
			return {followUpTickets, loadingFollowUpTickets};
		})();
	}, [loadingFollowUpTickets]);
	const value = useMemo(() => {
		return ({
			followUpTickets,
			loadingFollowUpTickets
		})
	}, [ followUpTickets, loadingFollowUpTickets ])

	return <FollowUpTicketsContext.Provider value={value} {...props} />
}

export function useFollowUpTickets() {
	const context = React.useContext(FollowUpTicketsContext)

	if (!context) {
		throw new Error("useFollowUpTickets should be inside the FollowUpTicketsContext provider");
		
	}
	return context
}



