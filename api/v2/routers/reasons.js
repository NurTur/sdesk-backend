const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/parent/:vendorId`, async ctx => {
	const vendorId = ctx.params.vendorId
	const url = `api/v1/reasons/parent/${vendorId}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/child/:parentId`, async ctx => {
	const parentId = ctx.params.parentId
	const url = `api/v1/reasons/child/${parentId}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
