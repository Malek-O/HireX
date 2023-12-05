const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const jwt = require('jsonwebtoken');

/** @type {import("express").RequestHandler} */
const handleRefresh = async (req, res) => {

    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(401)

    const refreshToken = cookies.jwt

    try {

        const empRow = await prisma.employer.findFirst({ where: { refreshToken: refreshToken } })
        if (!empRow) return res.sendStatus(401)

        jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            (err, decoded) => {
                if (err || empRow.employer_email !== decoded.useremail) return res.sendStatus(403)

                const accessToken = jwt.sign(
                    { "UserInfo": { "useremail": empRow.employer_email } },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '15s' }
                )
                return res.json({ accessToken, useremail: empRow.employer_email })
            }
        )
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

module.exports = { handleRefresh }
