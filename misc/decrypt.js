const crypto = require(`crypto`)

module.exports = function(text, key) {
	const decipher = crypto.createDecipher(`aes-256-ctr`, key)
	try {
		let dec = decipher.update(text, `hex`, `utf8`)
		dec += decipher.final(`utf8`)
		return dec
	}
	catch (ex) {
		return false
	}
}
