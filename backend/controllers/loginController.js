const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = async (req, res) => {

    const { email, pwd } = req.body
    if (!email || !pwd) return res.status(400).json({ "message": "Username and password are required" })

    try {
        const row = await prisma.employer.findUnique({
            where: { employer_email: email }
        })
        if (!row) return res.status(400).json({ "message": "Username or password are wrong" })

        const match = await bcrypt.compare(pwd, row.employer_pwd);

        if (match) {

            const accessToken = jwt.sign(
                { "UserInfo": { "useremail": row.employer_email } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '15s' }
            )
            const refreshToken = jwt.sign(
                { "useremail": row.employer_email },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1h' }
            )

            await prisma.employer.update({
                data: { refreshToken: refreshToken },
                where: { employer_email: row.employer_email }
            })

            res.cookie('jwt', refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000, secure: true, sameSite: "None" })
            return res.json({ accessToken, useremail: row.employer_email })
        } else {
            return res.status(400).json({ "message": "Username or password are wrong" })
        }
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }

}

module.exports = { handleLogin }