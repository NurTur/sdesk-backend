const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/`, async ctx => {
	ctx.query.user = ctx.state.user
	const url = `api/v2/report`
	const html = await forward.get(`rm`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]