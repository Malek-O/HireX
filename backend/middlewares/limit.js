const rateLimit = require('express-rate-limit');

/** @type {import("express").RequestHandler} */
const loginLimiter = rateLimit({
    max: 5,
    windowMs: 10 * 60 * 1000,
    headers: true
})

module.exports = { loginLimiter }