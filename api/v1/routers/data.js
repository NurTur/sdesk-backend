const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const db = require(`$db-v1`)

router.post(`/set_layout`, async ctx => {
	const userId = ctx.state.user.id
	const position = ctx.request.body.view
	await db.UILayout.update({position}, {where: {userId}})
	ctx.body = {ok: true}
})
router.post(`/set_filters`, async ctx => {
	const userId = ctx.state.user.id
	const filters = ctx.request.body
	let count = 1
	for (let filter of filters) {
		await db.UIConfig.update(
			{order: ++count, visible: filter.visible ? 1 : 0},
			{where: {filterId: filter.id, userId}}
		)
	}
	ctx.body = {ok: true}
})
router.post(`/set_columns`, async ctx => {
	const userId = ctx.state.user.id
	const columns = ctx.request.body
	let count = 1
	for (let column of columns) {
		await db.UIConfig.update(
			{
				order: ++count,
				visible: column.column_visible ? 1 : 0,
				width: column.column_width
			},
			{where: {columnId: column.id, userId}}
		)
	}
	ctx.body = {ok: true}
})
router.get(`/order_history`, async ctx => {
	const url = `api/legacy/data/order_history`
	ctx.body = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/order_spare_parts`, async ctx => {
	const url = `api/legacy/data/order_spare_parts`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/order_spare_parts/spare_part_history`, async ctx => {
	const url = `api/legacy/data/order_spare_parts/spare_part_history`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/installed_spare_parts`, async ctx => {
	const url = `api/legacy/data/installed_spare_parts`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/sub_orders`, async ctx => {
	const url = `api/legacy/data/sub_orders`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/count/all`, async ctx => {
	const url = `api/legacy/data/count/all`
	const html = await forward.get(`ts`, url, ctx.query)
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
