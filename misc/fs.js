const fs = require(`fs`)

function readFile(...args) {
	return new Promise((resolve, reject) => {
		fs.readFile(...args, (error, data) => {
			if (error) {
				return reject(error)
			}
			resolve(data)
		})
	})
}

module.exports = {readFile}
