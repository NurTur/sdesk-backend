#!/usr/bin/env node
const {
	clearScreen,
	getPort,
	onError,
	onListening
} = require(`./common`)

process.env.NODE_ENV = `production`
const app = require(`../index`)
const http = require(`http`)
const server = http.createServer(app.callback())
const port = process.env.npm_package_config_port

console.info(`Production mode`)
console.info(`Listening on ${port}`)

server.listen(port)
server.setTimeout(125000)
server.on(`error`, onError(port))