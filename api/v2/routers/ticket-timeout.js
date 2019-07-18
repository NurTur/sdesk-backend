const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/`, async ctx => {
	const url = `api/v1/ticket-timeout`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/`, async ctx => {
	const url = `api/v1/ticket-timeout`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/reasons`, async ctx => {
	const url = `api/v1/ticket-timeout/reasons`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
