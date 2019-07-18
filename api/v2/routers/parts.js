const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const messages = require(`$home/misc/messages`)
const docs = require(`$home/misc/api-docs`)

router.get(`/need`, async ctx => {
	const url = `api/v1/parts/need`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/need`, async ctx => {
	const url = `api/v1/parts/need`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/need/install`, async ctx => {
	const url = `api/v1/parts/need/install`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/need/status`, async ctx => {
	const url = `api/v1/parts/need/status`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/general`, async ctx => {
	const url = `api/v1/parts/general`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/installed/:id`, async ctx => {
	const id = ctx.params.id
	const url = `api/v1/parts/installed/${id}`
	const html = await forward.get(`ts`, url)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/installed`, async ctx => {
	const url = `api/v1/parts/installed`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/installed`, async ctx => {
	const url = `api/v1/parts/installed`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.post(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/installed`, async ctx => {
	const url = `api/v1/parts/installed`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.delete(`/installed`, async ctx => {
	const url = `api/v1/parts/installed`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.delete(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/assigned-to/me`, async ctx => {
	const url = `api/v1/parts/user`
	const name = ctx.state.user.name
	const html = await forward.get(`ps`, url, {name})
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/assigned-to/manager`, async ctx => {
	const ticketId = ctx.query.ticketId
	!ticketId && ctx.throw(422, messages.NO_REQ_PARAMS)
	let html = await forward.get(`am`, `rsm/${ticketId}`)
	const manager = JSON.parse(html.body)[0]
	!manager && ctx.throw(422, messages.NO_MANAGER_FOUND(ticketId))
	html = await forward.get(`ps`, `api/v1/parts/user`, {name: manager.name})
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/devices`, async ctx => {
	const url = `api/v1/parts/devices`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/units`, async ctx => {
	const url = `api/v1/parts/units`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/acts`, async ctx => {
	const url = `api/v1/acts/data`
	ctx.query.userId = ctx.state.user.id
	const html = await forward.get(`am`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.post(`/acts`, async ctx => {
	const url = `api/v1/acts/data`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.post(`am`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/acts`, async ctx => {
	const url = `api/v1/acts/data`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`am`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/help`, async ctx => {
	const help = `./api/v2/docs/parts.apib`
	ctx.type = `html`
	ctx.body = await docs.get(help)
})

module.exports = [router.routes(), router.allowedMethods()]
