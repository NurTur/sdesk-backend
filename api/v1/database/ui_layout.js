const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)

const alias = `config`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	userId: {type: Sequelize.INTEGER, field: `user_id`},
	position: {type: Sequelize.STRING}
}
const UILayout = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `ui_layout`
	}
)

module.exports = UILayout
