const router = require(`koa-router`)()
const Reference = require(`$db-v2/reference`)

router.get(`/`, async ctx => {
	
	const hash = ctx.query.hash || ``
	const ref = new Reference()
	const result = await ref.get(hash)
	if (result) {
		ctx.set(`hash`, result.hash)
		ctx.status = 200
		ctx.body = result
		return
	}
	
	ctx.status = 304
})

module.exports = [router.routes(), router.allowedMethods()]
