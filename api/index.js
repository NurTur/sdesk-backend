const fs = require(`fs`)
const dns = require(`$configs/dns`)
const router = require(`koa-router`)()
const v1 = require(`./v1/routers`)
const v2 = require(`./v2/routers`)
const docs = require(`$home/misc/api-docs`)

router.use(`*`, async (ctx, next) => {
	try {
		const allowed = [`auth`, `tokens/JYpmJ2S8NXIaCYb`]
		const reg = new RegExp(allowed.join(`|`))
		if (ctx.isAuthenticated() || ctx.url.match(reg)) {
			await next()
			return
		}
		if (!ctx.url.match(/api/)) {
			const url = `${dns.sso}/action/is-auth?callback_url=${dns.host}`;
			console.log('__________',url,'____________')
			ctx.redirect(url)
			return
		}
		ctx.throw(401)
	}
	catch (err) {
		ctx.set({ErrorSource: `Sdesk`})
		ctx.status = 500
		ctx.body = err.message
	}
})
router.use(`/api`, ...v1)
router.use(`/api/v2`, ...v2)

router.get(`/me`, ctx => {
	ctx.body = ctx.isAuthenticated() ? ctx.state.user : {}
})
router.get(`/auth`, ctx => {
	const decrypt = require(`$misc/decrypt`)
	const token = decrypt(ctx.query.token, `cbs-sso-key-53833`)
	if (!/cbs-auth/.test(token)) {
		ctx.throw(401)
	}
	const dough = token.split(`;`)[1]
	const cookies = decrypt(dough, `cbs-sso-key-80000`).split(`;`)[1]
	const user = JSON.parse(cookies)
	console.log('__________',user,'____________')
	ctx.body = user
	ctx.login(user)
	ctx.redirect(`/`)
})
router.get(`/logout`, ctx => {
	ctx.logout()
	ctx.body = {logout: `ok`}
	ctx.redirect(`${dns.sso}/action/logout?callback_url=${dns.host}`)
})
router.get(`/order-detail`, async ctx => {
	const path = `../sdesk-frontend/public/`
	ctx.type = `html`
	ctx.body = fs.createReadStream(`${path}/desktop/order-details.html`)
})
router.get(`/api/help`, async ctx => {
	const help = `./api/index.apib`
	ctx.type = `html`
	ctx.body = await docs.get(help)
})
router.get(`*`, async ctx => {
	ctx.url.match(/\/api\//) && ctx.throw(404)
	const {isMobile, isTablet} = ctx.userAgent
	const path = isMobile || isTablet
		? `../sdesk-frontend/public/mobile`
		: `../sdesk-desktop/build`
	ctx.type = `html`
	ctx.body = fs.createReadStream(`${path}/index.html`)
	ctx.body = fs.createReadStream(`${path}/index.html`)
})

module.exports = router
