/**
 * A module for middleware that would like to make external calls through `fetch`
 * @module fetchUtils
 */

/**
 * Wrapper around `fetch` to send an array of queries to the server. It ensures
 * that the request will have the required Oauth access token and constructs
 * the `fetch` call arguments based on the request method
 * @param {String} apiUrl the general-purpose endpoint for API calls to the
 *   application server
 * @param {Object} options {
 *     method: "get", "post", "delete", or "patch",
 *     auth: { oauth_token },
 *   }
 * @return {Promise} resolves with a `{queries, responses}` object
 */
export const fetchQueries = (apiUrl, options) => queries => {
	options.method = options.method || 'GET';
	const {
		auth,
		method,
	} = options;

	if (!auth.oauth_token) {
		console.log('No access token provided - hope there\'s a refresh token');
	}
	const isPost = method.toLowerCase() === 'post';

	const params = new URLSearchParams();
	params.append('queries', JSON.stringify(queries));
	const fetchUrl = `${apiUrl}?${isPost ? '' : params}`;
	const fetchConfig = {
		method,
		headers: {
			Authorization: `Bearer ${auth.oauth_token}`,
			'content-type': isPost ? 'application/x-www-form-urlencoded' : 'text/plain',
		}
	};
	if (isPost) {
		fetchConfig.body = params;
	}
	return fetch(
		fetchUrl,
		fetchConfig
	)
	.then(queryResponse => queryResponse.json())
	.then(responses => ({ queries, responses }));
};

