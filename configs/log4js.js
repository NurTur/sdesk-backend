const log4js = require(`log4js`)
const isWin = /^win/.test(process.platform)
const win = `./logs/journal.txt`
const linux = `/opt/cbs-service/sdesk-backend/logs/journal.log`
const config = {
	appenders: [{
		type: `console`,
		level: `ALL`
	}, {
		type: `file`,
		filename: isWin ? win : linux,
		level: `ALL`,
		maxLogSize: 204800,
		backups: 10
	}]
}
log4js.configure(config)

module.exports = log4js.getLogger()
