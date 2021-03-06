export function apiRequest(queries) {
	return {
		type: 'API_REQUEST',
		payload: queries,
	};
}

export function apiSuccess({ queries, responses }) {
	return {
		type: 'API_SUCCESS',
		payload: { queries, responses },
	};
}

export function apiError(err) {
	console.error(err.message);
	return {
		type: 'API_ERROR',
		payload: err,
	};
}

export function apiComplete() {
	return {
		type: 'API_COMPLETE'
	};
}

export function locationSync(location) {
	return {
		type: 'LOCATION_SYNC',
		payload: location,
	};
}


