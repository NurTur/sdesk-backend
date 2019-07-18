const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/`, async ctx => {
	const url = `api/v1/customers`
	const name = ctx.query.name
	const html = await forward.get(`ts`, url, {name})
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
