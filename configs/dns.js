/*const ticketService = `http://ticket-service:5014`
const partsParser = `http://parts-parser:5013`
const actModule = `http://act-module:5008`
const reportModule = `http://report-module:5007`
const sso = `http://sso.tapioca.cbs.kz/`
const tOrdersModule = `http://t-orders-module:5012`
const host = `http://service.tapioca.cbs.kz/`*/

const ticketService = `http://localhost:5014`
const partsParser = `http://parts-parser:5013`
const actModule = `http://act-module:5008`
const reportModule = `http://report-module:5007`

const sso = `http://127.0.0.1:5016`
const tOrdersModule = `http://t-orders-module:5012`

const host = `http://127.0.0.1:5015/`



module.exports = {
	ts: ticketService,
	ps: partsParser,
	am: actModule,
	rm: reportModule,
	tom: tOrdersModule,
	sso,
	host
}
