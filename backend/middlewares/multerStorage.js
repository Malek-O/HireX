const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //if (!req.user) return
        return cb(null, "./uploads")
    },
    filename: (req, file, cb) => {
        //if (!req.user) return
        return cb(null, `${Date.now()}_${file.originalname}`)
    }
})

module.exports = storage;