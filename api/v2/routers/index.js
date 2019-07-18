const router = require(`koa-router`)()
const comments = require(`./comments`)
const customers = require(`./customers`)
const equipmentTypes = require(`./equipment-types`)
const notifications = require(`./notifications`)
const parts = require(`./parts`)
const performers = require(`./performers`)
const reasons = require(`./reasons`)
const references = require(`./references`)
const serviceTypes = require(`./service-types`)
const ticketHistory = require(`./ticket-history`)
const tickets = require(`./tickets`)
const ticketStatuses = require(`./ticket-statuses`)
const ticketTimeout = require(`./ticket-timeout`)
const users = require(`./users`)
const groups = require(`./groups`)
const reports = require(`./reports`)
const docs = require(`$home/misc/api-docs`)

router.use(`/comments`, ...comments)
router.use(`/customers`, ...customers)
router.use(`/equipment-types`, ...equipmentTypes)
router.use(`/notifications`, ...notifications)
router.use(`/parts`, ...parts)
router.use(`/performers`, ...performers)
router.use(`/reasons`, ...reasons)
router.use(`/references`, ...references)
router.use(`/service-types`, ...serviceTypes)
router.use(`/ticket-history`, ...ticketHistory)
router.use(`/ticket-statuses`, ...ticketStatuses)
router.use(`/ticket-timeout`, ...ticketTimeout)
router.use(`/tickets`, ...tickets)
router.use(`/users`, ...users)
router.use(`/groups`, ...groups)
router.use(`/reports`, ...reports)

router.get(`/help`, async ctx => {
	const help = `./api/v2/docs/index.apib`
	ctx.type = `html`
	ctx.body = await docs.get(help)
})
module.exports = [router.routes(), router.allowedMethods()]
