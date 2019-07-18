const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const db = require(`$db-v2`)

router.get(`/`, async ctx => {
	const userId = ctx.state.user.id
	const where = {userId}
	const schedules = {
		model: db.Schedule,
		require: true
	}
	ctx.body = await db.Notification.findAll({include: [schedules], where})
})
router.put(`/`, async ctx => {
	const userId = ctx.state.user.id
	const data = ctx.request.body
	await db.Notification.update(data, {where: {userId}})
	ctx.body = `Запись сохранена`
})
router.get(`/tokens/JYpmJ2S8NXIaCYb`, async ctx => {
	const ids = (`userIds` in ctx.query) ? ctx.query.userIds.split(`,`) : null
	ctx.body = await db.Token.getActual(ids)
})
router.delete(`/tokens/JYpmJ2S8NXIaCYb`, async ctx => {
	if (!ctx.query.ids) {
		const error = new Error(`Отсуствует обязательный параметр ids`)
		throw error
	}
	const ids = ctx.query.ids.split(`,`)
	const count = await db.Token.destroy({where: {id: ids}})
	ctx.body = `Удалены записи в количестве: ${count}`
})
router.post(`/tokens`, async ctx => {
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	ctx.body = await db.Token.create(data)
})
router.get(`/schedules`, async ctx => {
	const notifId = ctx.query.notifId
	ctx.body = await db.Schedule.findAll({where: {notifId}})
})
router.put(`/schedules`, async ctx => {
	const {id, enabled} = ctx.request.body
	await db.Schedule.update({enabled}, {where: {id}})
	ctx.body = `Запись сохранена`
})

module.exports = [router.routes(), router.allowedMethods()]
