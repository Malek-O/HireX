const bcrypt = require('bcrypt');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()


const handleRegister = async (req, res) => {

    const { email, pwd } = req.body

    if (!email || !pwd) return res.status(400).json({ "message": "Username and password are required" })

    try {
        const hashedPwd = await bcrypt.hash(pwd, 10)
        const row = await prisma.employer.create({
            data: {
                employer_email: email,
                employer_pwd: hashedPwd,
            }
        })
        if (row) return res.sendStatus(204)

    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }

}

module.exports = { handleRegister }