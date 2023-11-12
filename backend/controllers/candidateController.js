const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()



/** @type {import("express").RequestHandler} */
const handleAddingCandidate = async (req, res) => {

    if (!req?.candidateJSON || !req.file) return res.sendStatus(400)

    const data = JSON.parse(req.candidateJSON)

    const { name, email, phone, Nationality, Designation, Education, GPA, experiences = [], languages = [], Skills = [] } = data

    const xp = experiences?.map((item) => {
        if (item.position || item.duration) {
            return { cxp_position: item?.position, cxp_duration: item?.duration };
        }
    });

    const langs = languages.map((item) => {
        return { cl_name: item }
    })
    const skill = Skills.map((item) => {
        return { ck_name: item }
    })


    try {
        const row = await prisma.candidate.create({
            data: {
                candidate_name: name,
                candidate_email: email,
                candidate_phone: phone,
                candidate_nationality: Nationality,
                candidate_designation: Designation,
                candidate_edu: Education,
                candidate_gpa: GPA,
                empId: "2238bf49-f2b5-4ff1-be33-e618353a7810",
                file: {
                    create: {
                        file_name: `${req.file.filename}`
                    }
                },
                langs: {
                    createMany: {
                        data: langs
                    }
                },
                skills: {
                    createMany: {
                        data: skill
                    }
                },
                xp: {
                    createMany: {
                        data: xp[0] ? xp : []
                    }
                }
            },
        })
        console.log(row);
        return res.json({ message: row })
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }
}

/** @type {import("express").RequestHandler} */
const handleDeletingCandidate = async (req, res) => {

    if (!req.params.id) return res.sendStatus(400)

    const id = req.params.id
    try {
        const deleteSkills = prisma.candidate_skills.deleteMany({ where: { candidate_id: id } })
        const deleteXp = prisma.candidate_xp.deleteMany({ where: { candidate_id: id } })
        const deleteLangs = prisma.candidate_language.deleteMany({ where: { candidate_id: id } })
        const deleteFile = prisma.file.delete({ where: { candidate_id: id } })
        const deleteCandidate = prisma.candidate.delete({ where: { candidate_id: id } })
        const transaction = await prisma.$transaction([deleteSkills, deleteXp, deleteLangs, deleteFile, deleteCandidate])
        console.log(transaction);
        return res.status(200).json({ message: "Candidate deleted" })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error?.meta.cause })
    }
}

module.exports = { handleAddingCandidate, handleDeletingCandidate }

