const db = require(`$db-v1`)

async function getFields() {
	const configs = await db.UIConfig.findAll({
		include: [{model: db.Column, as: `column`}],
		where: {userId: 0}
	})
	const components = configs.map(comp => {
		return {
			model: comp.column.model,
			field: comp.column.field.split(`,`)
		}
	})
	const fields = components.reduce((list, next) => {
		if (!list[next.model]) {
			list[next.model] = []
		}
		list[next.model].push(...next.field)
		return list
	}, {})
	return JSON.stringify(fields)
}

module.exports = {fields: getFields}
