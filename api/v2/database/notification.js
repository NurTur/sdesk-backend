const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)

const alias = `notific`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		primaryKey: true
	},
	from: {type: Sequelize.TIME},
	till: {type: Sequelize.TIME},
	enabled: {type: Sequelize.ENUM(`ON`, `OFF`)},
	userId: {type: Sequelize.INTEGER, field: `user_id`}
}
const Notification = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `notification`
	}
)

module.exports = Notification

const _create = Notification.create
const Schedule = require(`./schedule`)

Notification.create = async function(userId) {
	const found = await this.findOne({where: {userId}})
	if (found) return
	const notif = await _create.call(this, {userId})
	await Schedule.create(notif.id)
}
Notification.hasMany(
	Schedule, {foreignKey: `notification_id`}
)
