const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.post(`/take-for-execution`, async ctx => {
	const url = `api/legacy/set-status/take-for-execution`
	const data = ctx.request.body
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/take-for-work`, async ctx => {
	const url = `api/legacy/set-status/take-for-work`
	const data = ctx.request.body
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/take-for-customer-waiting`, async ctx => {
	const url = `api/legacy/set-status/take-for-customer-waiting`
	const data = ctx.request.body
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
