const Sequelize = require(`sequelize`)
const sequelize = require(`$home/configs/database`)
const Column = require(`./column`)
const Filter = require(`./filter`)

const alias = `ui`
const attributes = {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true
	},
	userId: {type: Sequelize.INTEGER, field: `user_id`},
	columnId: {type: Sequelize.INTEGER, field: `column_id`},
	filterId: {type: Sequelize.INTEGER, field: `filter_id`},
	visible: {type: Sequelize.INTEGER},
	width: {type: Sequelize.INTEGER},
	order: {type: Sequelize.INTEGER, field: `order_`}
}
const UIConfig = sequelize.define(
	alias,
	attributes, {
		timestamps: false,
		tableName: `ui_config`
	}
)
UIConfig.fill = async function(userId) {
	UIConfig.destroy({where: {userId}})
	let count = 1
	const columns = await Column.findAll({where: {name: {$ne: null}}})
	for (let column of columns) {
		await UIConfig.create({
			userId,
			columnId: column.id,
			width: column.width,
			order: count ++
		})
	}
	count = 1
	const filters = await Filter.findAll()
	for (let filter of filters) {
		await UIConfig.create({
			userId,
			filterId: filter.id,
			visible: filter.visible,
			order: count ++
		})
	}
}

module.exports = UIConfig

UIConfig.belongsTo(
	Column, {foreignKey: `columnId`}
)
UIConfig.belongsTo(
	Filter, {foreignKey: `filterId`}
)
