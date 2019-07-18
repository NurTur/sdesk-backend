const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)

const alias = `search_field`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	label: {type: Sequelize.STRING},
	field: {type: Sequelize.STRING}
}
const SearchField = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `search_field`
	}
)

module.exports = SearchField
