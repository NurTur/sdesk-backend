const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const docs = require(`$home/misc/api-docs`)
const ticket = require(`$db-v2/ticket`)
const moment = require(`moment`)

let dbFields

async function getFields(ctx) {
	if (!dbFields) {
		dbFields = await ticket.fields()
	}
	const agent = ctx.userAgent
	const device = agent.isMobile || agent.isTablet ? `mobile` : `desktop`
	return device === `mobile` ? dbFields : ctx.query.fields
}

router.get(`/`, async ctx => {
	const url = `api/v1/tickets`
	const fields = await getFields(ctx)
	const filters = ctx.query.filters || {status: {final: null}}
	const sort = ctx.query.sort || {ticket: {date: `desc`}}
	const limit = ctx.query.limit || [50, 0]
	const userId = ctx.state.user.id
	const count = ctx.query.count
	const query = {fields, filters, sort, limit, count, userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/mine`, async ctx => {
	const url = `api/v1/tickets`
	const fields = await getFields(ctx)
	const filters = {ticket: {performerId: ctx.state.user.id}}
	if (`previousDays` in ctx.query) {
		const days = parseInt(ctx.query.previousDays, 10) || 0
		const date = moment().subtract(days, `days`).format(`YYYY-MM-DD`)
		filters.ticket.date = {$gte: date}
		filters.status = {final: 1}
	}
	else {
		filters.status = {final: null}
	}
	const sort = {ticket: {date: `desc`}}
	const limit = ctx.query.limit || [50, 0]
	const userId = ctx.state.user.id
	const query = {fields, filters,	sort, limit, userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/equipment/:id`, async ctx => {
	const url = `api/v1/tickets`
	const id = ctx.params.id
	const date = moment().subtract(1, `months`).format(`YYYY-MM-DD`)
	const fields = await getFields(ctx)
	const filters = {ticket: {equipmentId: id, date: {$gte: date}}}
	const sort = {ticket: {date: `desc`}}
	const limit = ctx.query.limit || [30, 0]
	const userId = ctx.state.user.id
	const query = {fields, filters,	sort,	limit, userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/base/:id`, async ctx => {
	const url = `api/v1/tickets`
	const id = ctx.params.id
	const fields = {ticket: [`number`, `vendorId`, `serviceTypeId`, `typeId`, `statusId`]}
	const filters = {ticket: {id}}
	const userId = ctx.state.user.id
	const query = {fields, filters, userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = JSON.parse(html.body)[0]
})
router.get(`/:id`, async ctx => {
	const url = `api/v1/tickets`
	const id = ctx.params.id
	const userId = ctx.state.user.id
	const fields = {
		ticket: [
			`archivedFlag`, `billDate`, `billNumber`, `blockNumber`, `cbsWarrantyFlag`,
			`checkedFlag`, `commonFieldString`, `date`, `description`, `detailsHash`,
			`diagPrice`, `failDescription`, `frozenFlag`, `hash`, `id`, `invoiceDate`,
			`number`, `numberFromCustomer`, `onceFlag`, `paidFlag`, `parentId`, `partName`,
			`partNumber`, `reasonDescription`, `repairPrice`, `retryFlag`, `serialNumber`,
			`subcontractorFlag`, `warrantyFlag`, `ownerId`
		],
		city: [], contract: [], customer: [], customerContact: [], customerPerson: [],
		equipSupplier: [], reason: [], seller: [], sellerPerson: [],	serviceType: [],
		vendor: [],	status: [`id`, `name`, {next: []}],	equipment: [], equipmentType: [],
		timeout: [`timeout`, `reasonId`], timeoutReason: []
	}
	const filters = {ticket: {id}}
	const query = {fields, filters, userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = JSON.parse(html.body)[0]
})
router.put(`/status`, async ctx => {
	const url = `api/v1/tickets/status`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/performer`, async ctx => {
	const url = `api/v1/tickets/performer`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.put(`/service-type`, async ctx => {
	const url = `api/v1/tickets/service-type`
	const data = ctx.request.body
	data.userId = ctx.state.user.id
	const html = await forward.put(`ts`, url, data)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/tree/:ticketId`, async ctx => {
	const delay = require(`$misc/delay`)
	const ticketId = ctx.params.ticketId
	const url = `api/v1/tickets/tree/${ticketId}`
	const userId = ctx.state.user.id
	const query = {userId}
	const html = await forward.get(`ts`, url, query)
	ctx.status = html.statusCode
	ctx.body = html.body
})
router.get(`/help`, async ctx => {
	const help = `./api/v2/docs/tickets.apib`
	ctx.type = `html`
	ctx.body = await docs.get(help)
})

module.exports = [router.routes(), router.allowedMethods()]
