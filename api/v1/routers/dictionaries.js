const router = require(`koa-router`)()
const forward = require(`$home/misc/forward`)
const db = require(`$db-v1`)

router.get(`/all-filters`, async ctx => {
	const userId = ctx.state.user.id
	const configs = await db.UIConfig.findAll({
		include: [
			{model: db.Column, as: `column`},
			{model: db.Filter, as: `filter`}
		],
		where: {userId}
	})
	if (configs.length === 0) {
		await db.UIConfig.fill(userId)
		await db.UILayout.create({position: `right`, userId})
	}
	const layout = await db.UILayout.findOne({where: {userId}})
	const seacrhField = await db.SearchField.findAll({})
	const html = await forward.get(`ts`, `api/legacy/dictionaries/all-filters`)
	const refs = JSON.parse(html.body)
	ctx.status = html.statusCode
	ctx.body = {
		layout: layout.position,
		columnsSortableOrder: configs.filter(item => item.column).map(item => {
			return {
				id: item.column.id,
				column_name: item.column.name,
				column_value: item.column.label,
				column_visible: item.visible,
				column_width: item.width
			}
		}),
		filters: {
			customizableFilters: configs.filter(item => item.filter).map(item => {
				let filter = item.filter.refTable
				if (filter !== `warranty`) filter = `${filter}id`
				return {
					filter,
					fieldName: item.filter.name,
					id: item.filter.id,
					items: refs[item.filter.refTable],
					multi: item.filter.multi === 1,
					resetValue: 0,
					value: 0,
					visible: item.visible === 1
				}
			}),
			searchSelect: {
				items: seacrhField.map(item => {
					return {value: item.id, label: item.label}
				})
			}
		}
	}
})

module.exports = [router.routes(), router.allowedMethods()]
