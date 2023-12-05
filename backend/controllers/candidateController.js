const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const fs = require('fs').promises;
const path = require('path');



/** @type {import("express").RequestHandler} */
const handleAddingCandidate = async (req, res) => {

    if (!req?.candidateJSON || !req.file || !req.user) return res.sendStatus(400)

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

        const employer = await prisma.employer.findUnique({ where: { employer_email: req.user } })

        const row = await prisma.candidate.create({
            data: {
                candidate_name: name,
                candidate_email: email,
                candidate_phone: phone,
                candidate_nationality: Nationality,
                candidate_designation: Designation,
                candidate_edu: Education,
                candidate_gpa: GPA,
                empId: employer.employer_id,
                file: { create: { file_name: `${req.file.filename}` } },
                langs: { createMany: { data: langs } },
                skills: { createMany: { data: skill } },
                xp: { createMany: { data: xp[0] ? xp : [] } }
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

    if (!req.params.id | !req.user) return res.sendStatus(400)

    const id = req.params.id
    try {
        const file = await prisma.file.findUnique({ where: { candidate_id: id } })
        const filePath = `./uploads/${file.file_name}`;
        await fs.unlink(filePath);
        console.log('File deleted successfully');
    } catch (err) {
        console.error(`Error deleting file: ${err}`);
        return res.status(400).json({ error: "Error deleting file" })
    }

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


/** @type {import("express").RequestHandler} */

const handleGetAllCandidates = async (req, res) => {

    if (!req.user) return res.sendStatus(400)

    try {
        const employer = await prisma.employer.findUnique({ where: { employer_email: req.user } })
        const candidates = await prisma.candidate.findMany({
            where: { empId: employer.employer_id },
            include: {
                file: { select: { file_name: true } },
                langs: { select: { cl_id: true, cl_name: true } },
                skills: { select: { ck_id: true, ck_name: true } },
                xp: { select: { cxp_id: true, cxp_duration: true, cxp_position: true } }
            }
        })
        return res.status(200).json(candidates)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error?.meta.cause })
    }
}

/** @type {import("express").RequestHandler} */

const handleGetSingleCandidates = async (req, res) => {
    if (!req.params.id || !req.user) return res.sendStatus(400)

    const id = req.params.id

    try {
        const employer = await prisma.employer.findUnique({ where: { employer_email: req.user } })
        const candidate = await prisma.candidate.findUnique({
            where: { candidate_id: id, empId: employer.employer_id },
            include: {
                file: { select: { file_name: true } },
                langs: { select: { cl_id: true, cl_name: true } },
                skills: { select: { ck_id: true, ck_name: true } },
                xp: { select: { cxp_id: true, cxp_duration: true, cxp_position: true } }
            }
        })
        if (!candidate) return res.status(400).json({ message: "Candidate not found" })
        return res.status(200).json(candidate)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error?.meta.cause })
    }
}


/** @type {import("express").RequestHandler} */

const handleCandidateFile = async (req, res) => {


    if (!req.params.candidateId || !req.user) return res.status(400).json({ "message": "File ID not found" })
    try {
        const employer = await prisma.employer.findUnique({ where: { employer_email: req.user } })
        const fileCandidate = await prisma.file.findUnique({
            where: { candidate_id: req.params.candidateId }
        })

        if (!fileCandidate) return res.status(404).json({ message: "File not found" })

        const isFileRelatedToCandidate = await prisma.candidate.findUnique({
            where: { candidate_id: fileCandidate.candidate_id, empId: employer.employer_id }
        })

        if (!isFileRelatedToCandidate) return res.sendStatus(403)

        const pdfPath = path.join(__dirname, '../uploads', fileCandidate.file_name);

        return res.sendFile(pdfPath, err => {
            if (err) {
                res.status(404).send('Pdf not found');
            }
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error?.meta?.cause })
    }
}

/** @type {import("express").RequestHandler} */
const handleStatusChange = async (req, res) => {

    if (!req.params.id || !req.body.status || !req.user) return res.sendStatus(400)
    const { id } = req.params
    const { status } = req.body
    try {
        const employer = await prisma.employer.findUnique({ where: { employer_email: req.user } })
        const updateStatus = await prisma.candidate.update({
            where: { candidate_id: id, empId: employer.employer_id },
            data: { status }
        })
        if (!updateStatus) return res.status(400).json({ message: "Candidate not found" })
        console.log(updateStatus);
        return res.sendStatus(200)
    } catch (error) {
        console.log(error);
        return res.sendStatus(500)
    }

}

module.exports = { handleStatusChange, handleCandidateFile, handleAddingCandidate, handleDeletingCandidate, handleGetAllCandidates, handleGetSingleCandidates }

