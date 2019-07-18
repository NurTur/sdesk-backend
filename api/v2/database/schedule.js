const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)
const days = [`SUN`, `MON`, `TUE`, `WED`, `THR`, `FRI`, `SAT`]

const alias = `schedule`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	enabled: {type: Sequelize.ENUM(`ON`, `OFF`)},
	day: {type: Sequelize.ENUM(...days)},
	notifId: {type: Sequelize.INTEGER, field: `notification_id`}
}
const Schedule = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `schedule`
	}
)

module.exports = Schedule

const _create = Schedule.create
Schedule.create = async function(data) {
	if (typeof data === `object`) {
		return await _create.call(this, data)
	}
	for (let day of days) {
		await _create.call(this, {notifId: data,	day})
	}
}
