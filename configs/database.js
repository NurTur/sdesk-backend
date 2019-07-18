const Sequelize = require(`sequelize`)
const db = `localhost`
const sequelize = new Sequelize(`sdesk`, `sdesk`, `dXl67G3SrsIKsHGq`, {
	host: db,
	dialect: `mariadb`,
	pool: {
		max: 5,
		min: 0,
		idle: 10000
	},
	logging: false
})
async function test() {
	await sequelize.authenticate()
	console.info(`Connection to database ('${db}') has been established successfully.`)
}
test()
module.exports = sequelize
