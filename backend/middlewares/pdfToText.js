const fs = require('fs');
const pdfparse = require('pdf-parse')
/** @type {import("express").RequestHandler} */
const pdfToText = async (req, res, next) => {
    if (!req.file) return res.status(400).json({ "message": "File not found" })
    const filename = req.file.filename
    console.log(filename);
    const pdffile = fs.readFileSync(`./uploads/${filename}`)
    const file = await pdfparse(pdffile);
    const text = file.text.replace(/\s+/g, ' ').trim().replace(/(\d)\s*([\/\\])\s*(\d)/g, '$1$2$3')
    req.CVTEXT = text
    next()
}

module.exports = pdfToText