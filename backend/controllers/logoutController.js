const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

const handleLogout = async (req, res) => {

    const cookies = req?.cookies
    if (!cookies?.jwt) return res.status(400).json({ message: "Already logged out" })
    const refreshToken = cookies.jwt;

    try {
        const row = await prisma.employer.findFirst({
            where: { refreshToken: refreshToken }
        })
        await prisma.employer.update({
            data: { refreshToken: '' },
            where: { employer_id: row.employer_id }
        })
        res.clearCookie('jwt', { httpOnly: true, sameSite: "None" }) // secure: true - only serves on https
        return res.sendStatus(204)
    } catch (error) {
        console.log(error);
        res.clearCookie('jwt', { httpOnly: true, sameSite: "None" })
        return res.status(500).json({ message: "Something went wrong logging out" }) // Foribbiden
    }
}

module.exports = { handleLogout }