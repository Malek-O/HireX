const schema = {
    type: "object",
    properties: {
        name: {
            type: "string",
            description: "Extract the name of the candidate CV."
        },
        email: {
            type: "string",
            description: "Extract the email of the candidate CV."
        },
        phone: {
            type: "string",
            description: "Extract the phone of the candidate CV, it should be in Saudi Arabia format."
        },
        Nationality: {
            type: "string",
            description: "Extract the Nationality of the candidate CV."
        },
        Designation: {
            type: "string",
            description: "Extract the designation of the candidate CV."
        },
        Education: {
            type: "string",
            description: "Extract the Education of the candidate CV, like the university studied in."
        },
        GPA: {
            type: "string",
            description: "Extract the GPA of the candidate CV. if not found, return empty string."
        },
        experiences: {
            type: "array",
            description: "Extract the experiences of the candidate CV.",
            items: {
                type: "object",
                properties: {
                    position: { type: "string" },
                    duration: { type: "string" }
                }
            }
        },
        languages: {
            type: "array",
            description: "Extract the languages of the candidate CV.",
            items: {
                type: "string"
            }
        },
        Skills: {
            type: "array",
            description: "Extract the Skills of the candidate CV.",
            items: {
                type: "string"
            }
        }
    },
    required: ["name", "email", "phone", "Nationality", "Designation", "Education", "GPA", "experiences", "languages", "Skills"]
}

module.exports = schema