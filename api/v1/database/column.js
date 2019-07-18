const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)

const alias = `column`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {type: Sequelize.STRING},
	model: {type: Sequelize.STRING},
	field: {type: Sequelize.STRING},
	label: {type: Sequelize.STRING},
	width: {type: Sequelize.INTEGER}
}
const Column = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `column`
	}
)

module.exports = Column
