const fs = require(`./fs`)
const aglio = require(`aglio`)

async function get(path) {
	const options = {
		themeTemplate: `triple`,
		themeVariables: `slate`
	}
	const apib = await fs.readFile(path, `utf8`)
	return new Promise((resolve, reject) => {
		aglio.render(apib, options, function(err, html, warn) {
			err && reject(err)
			warn && console.warn(warn)
			resolve(html)
		})
	})
}

module.exports = {get}
