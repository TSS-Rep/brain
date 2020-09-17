import React, { useEffect, useMemo, useState } from 'react';

export const EngineersContext = React.createContext({engineers: []});
export function EngineersProvider(props: any) {
	const [ engineers, setEngineers ] = useState([]);
	const [ loadingEngineers, setLoadingEngineers ] = useState(true);

	useEffect(() => {
		(async () => {
			const response = await fetch("http://localhost:9707/engineers");
			const engineers = await response.json();
			
			setEngineers(engineers);
			setLoadingEngineers(false);
			return {engineers, loadingEngineers};
		})();
	}, [loadingEngineers]);
	const value = useMemo(() => {
		return ({
			engineers,
			loadingEngineers
		})
	}, [ engineers, loadingEngineers ])

	return <EngineersContext.Provider value={value} {...props} />
}

export function useEngineers() {
	const context = React.useContext(EngineersContext)

	if (!context) {
		throw new Error("useEngineers should be inside the EngineersContext provider");
		
	}
	return context
}



