const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)

const alias = `filter`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	name: {type: Sequelize.STRING},
	refTable: {type: Sequelize.STRING, field: `ref_table`},
	multi: {type: Sequelize.INTEGER},
	visible: {type: Sequelize.INTEGER}
}
const Filter = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `filter`
	}
)

module.exports = Filter
