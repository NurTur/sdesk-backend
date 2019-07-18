const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)

router.get(`/`, async ctx => {
	const url = `api/v1/users`
	const managers = false
	const {cityId, departmentId} = ctx.state.user
	const html = await forward.get(`ts`, url, {cityId, managers, departmentId})
	ctx.status = html.statusCode
	ctx.body = html.body
})

module.exports = [router.routes(), router.allowedMethods()]
