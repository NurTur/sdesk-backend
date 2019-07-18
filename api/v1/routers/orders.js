const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.post(`/`, async ctx => {
	const url = `api/legacy/orders`
	const data = ctx.request.body
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/create-t/:instPartId`, async ctx => {
	const url = `createTOrders/${ctx.params.instPartId}`
	const html = await forward.get(`tom`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})
module.exports = [router.routes(), router.allowedMethods()]
