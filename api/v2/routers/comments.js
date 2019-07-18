const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/`, async ctx => {
	ctx.query.userId = ctx.state.user.id
	const url = `api/v1/comments`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/`, async ctx => {
	const url = `api/v1/comments`
	const data = ctx.request.body
	data.ownerId = ctx.state.user.id
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/`, async ctx => {
	const url = `api/v1/comments`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/:id`, async ctx => {
	const id = ctx.params.id
	let html = await forward.get(`ts`, `api/v1/comments/${id}`)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.delete(`/:id`, async ctx => {
	const url = `api/v1/comments/`
	const id = ctx.params.id
	const userId = ctx.state.user.id
	const html = await forward.delete(`ts`, url, {id, userId})
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/count/:ticketId`, async ctx => {
	const ticketId = ctx.params.ticketId
	const url = `api/v1/comments/count/${ticketId}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/devices/parent/:vendorId`, async ctx => {
	const vendorId = ctx.params.vendorId
	const url = `api/v1/comments/devices/parent/${vendorId}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/devices/child/:parentId`, async ctx => {
	const parentId = ctx.params.parentId
	const url = `api/v1/comments/devices/child/${parentId}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
