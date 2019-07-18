const _request = require(`request`)

function request(opts) {
	return new Promise((resolve, reject) => {
		if (opts.json) {
			setTimeout(() => {
				resolve({
					statusCode: 202,
					body: `Запрос был принят на обработку.`,
					request: {}
				})
			}, 15000)
		}
		_request(opts, (error, data) => {
			if (error) {
				return reject(error)
			}
			resolve(data)
		})
	})
}

module.exports = request
