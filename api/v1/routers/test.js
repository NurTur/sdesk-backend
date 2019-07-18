const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const db = require(`$db-v1`)

router.get(`/`, async ctx => {
	console.log(ctx.headers)
	ctx.status = 200
	ctx.body = `OK`
})

module.exports = [router.routes(), router.allowedMethods()]
