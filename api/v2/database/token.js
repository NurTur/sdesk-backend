const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)
const format = require(`date-fns`).format

const alias = `token`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	value: {type: Sequelize.STRING},
	userId: {type: Sequelize.INTEGER, field: `user_id`},
	date: {type: Sequelize.DATE}
}
const Token = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `token`
	}
)

module.exports = Token

const _create = Token.create
const Notification = require(`./notification`)
const Schedule = require(`./schedule`)

Token.create = async function(data) {
	const where = {value: data.value}
	const token = await this.findOne({where})
	if (token && token.id) {
		await token.save()
		return `Запись обновлена`
	}
	await _create.call(this, data)
	await Notification.create(data.userId)
	return `Запись добавлена`
}
Token.getActual = function(ids) {
	const local = new Date()
	const offset = local.getTimezoneOffset()
	const gmt = new Date(local.valueOf() + offset * 60000)
	const time = format(gmt, `HH:mm:ss`)
	const schedules = {
		model: Schedule,
		attributes: [],
		require: true
	}
	const notify = {
		model: Notification,
		attributes: [],
		require: true,
		include: [schedules]
	}
	const where = {
		'$notifics.from$': {$lte: time},
		'$notifics.till$': {$gte: time},
		'$notifics.enabled$': `ON`,
		'$notifics.schedules.day$': local.getDay(),
		'$notifics.schedules.enabled$': `ON`
	}
	if (ids) {
		where.userId = ids
	}
	return this.findAll({
		include: [notify],
		where
	})
}
Token.hasMany(
	Notification, {
		sourceKey: `user_id`,
		foreignKey: `user_id`
	}
)
