#!/usr/bin/env node

const onError = port => error => {
	if (error.syscall !== `listen`) {
		throw error
	}
	const bind = typeof port === `string`
    ? `Pipe ${port}`
    : `Port ${port}`
	switch (error.code) {
	case `EACCES`:
		console.error(`${bind} requires elevated privileges`)
		process.exit(1)
		break
	case `EADDRINUSE`:
		console.error(`${bind} is already in use`)
		process.exit(1)
		break
	default:
		throw error
	}
}

const onListening = addr => () => {
	const debug = require(`debug`)(`demo:server`)
	const bind = typeof addr === `string`
    ? `pipe ${addr}`
    : `port ${addr.port}`
	console.info(`Listening on ${bind}`)
}

const getPort = def => {
	const custom = parseInt(process.env.PORT, 10)
	return isNaN(custom) || custom <= 0 ? def : custom
}

const clearScreen = () => {
	const isWin = /^win/.test(process.platform)
	isWin && process.stdout.write(`\u001b[2J\u001b[0;0H`)
}

module.exports = {
	clearScreen,
	getPort,
	onError,
	onListening
}