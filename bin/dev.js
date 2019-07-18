#!/usr/bin/env node
const {
	clearScreen,
	getPort,
	onError,
	onListening
} = require(`./common`)

process.env.NODE_ENV = `development`
const app = require(`../index`)
const http = require(`http`)
const server = http.createServer(app.callback())
const port = getPort(3000)

clearScreen()
console.info(`Development mode port: ${port}`)

server.listen(port)
server.setTimeout(125000)
server.on(`error`, onError(port))
server.on(`listening`, onListening(server.address()))