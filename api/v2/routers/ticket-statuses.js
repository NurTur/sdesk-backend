const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/next`, async ctx => {
	const url = `api/v1/statuses/next`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
