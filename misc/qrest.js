async function query(ctx, next) {
	const qs = decodeURI(ctx.url.match(/\?(.+)/)[1])
	const q = qs.split(`&`)
	const hash = q.map(p => {
		const param = p.split(`=`)
		return {[param[0]]: parse(param[1])}
	})
	ctx.qrest = hash
	await next()
}

function parse(str) {
	let value = simple(str)
	const result = value.map(v => v.match(/[\[\(]/gi) ? list(v) : v)
	return result
}

function simple(str) {
	return str.match(/(\w+\[.+\])|([\w:*]+)/gi)
}

function list(str) {
	const params = str.match(/(\w+)[\[\(](.+)[\]\)]/)
	return params ? {[params[1]]: params[2]} : params
}
module.exports = query
