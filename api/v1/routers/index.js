const checkOrderUpdate = require(`./check-order-update`)
const comments = require(`./comments`)
const data = require(`./data`)
const dictionaries = require(`./dictionaries`)
const orders = require(`./orders`)
const orderTimeout = require(`./order-timeout`)
const router = require(`koa-router`)()
const setStatus = require(`./set-status`)

router.use(`/check-order-update`, ...checkOrderUpdate)
router.use(`/comments`, ...comments)
router.use(`/data`, ...data)
router.use(`/dictionaries`, ...dictionaries)
router.use(`/order-timeout`, ...orderTimeout)
router.use(`/orders`, ...orders)
router.use(`/set-status`, ...setStatus)

const test = require(`./test`)
router.use(`/test`, ...test)

module.exports = [router.routes(), router.allowedMethods()]
