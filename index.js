require(`sexy-require`)
const Koa = require(`koa`)
const app = new Koa()
const log4js = require(`./configs/log4js`)

app.keys = [`secret`]
app.proxy = true
app.on(`error`, err => log4js.error(err))
app.use(async (ctx, next) => {
	ctx.set({'Access-Control-Allow-Origin': `*`})
	await next()
})
context: {
	const bodyparser = require(`koa-bodyparser`)()
	const logger = require(`koa-logger`)
	const json = require(`koa-json`)
	const userAgent = require(`koa-useragent`)
	const assets = require(`koa-static`)
	const maxage = 1000 * 60 * 60
	app.use(bodyparser)
	app.use(logger())
	app.use(json())
	app.use(userAgent)
	app.use(assets(`../sdesk-desktop/build/public`, {maxage}))
	app.use(assets(`../sdesk-frontend/public`, {maxage}))
}

session: {
	const session = require(`koa-session`)
	const passport = require(`./configs/auth`)
	const configs = {maxAge: null, resave: false}
	app.use(session(configs, app))
	app.use(passport.initialize())
	app.use(passport.session())
}

routers: {
	const router = require(`./api`)
	app.use(router.routes())
	app.use(router.allowedMethods())
}

module.exports = app
