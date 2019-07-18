const request = require(`./request`)
const dns = require(`../configs/dns`)
const logger = require(`../configs/log4js`)

function toString(query) {
	for (let key in query) {
		if (typeof query[key] === `object`) {
			query[key] = JSON.stringify(query[key])
		}
	}
	return query
}
async function fetch(method, ms, uri, params) {
	const url = `${dns[ms]}/${uri}`
	const options = {url, method}
	method === `get` && (options.qs = toString(params))
	method === `delete` && (options.qs = toString(params))
	method === `put` && (options.json = params)
	method === `post` && (options.json = params)
	const html = await request(options)
	const href = html.request.url && html.request.url.href ? html.request.url.href : url
	logger.debug(method.toUpperCase(), decodeURIComponent(href))
	return html
}

module.exports = {
	get: (ms, url, params) => fetch(`get`, ms, url, params),
	put: (ms, url, params) => fetch(`put`, ms, url, params),
	delete: (ms, url, params) => fetch(`delete`, ms, url, params),
	post: (ms, url, params) => fetch(`post`, ms, url, params)
}
