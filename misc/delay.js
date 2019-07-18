function delay(ms) {
	return new Promise(done => setTimeout(() => {
		done(true)
	}, ms))
}

module.exports = delay
