const { OpenAI } = require("openai");
const schema = require("../config/openaiSchema");

/** @type {import("express").RequestHandler} */

const GPTmodel = async (req, res, next) => {
    if (!req.CVTEXT) return res.status(400).json({ "message": "Prompt not found" })

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY
    });

    const prompt = `You have the follwing CV data, please extract the information: ${req.CVTEXT}`

    const chatCompletion = await openai.chat.completions.create({
        messages: [
            { role: 'system', content: "You are a CV parser that extract inforamtion out of CVs as JSON" },
            { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" },
        model: 'gpt-3.5-turbo-1106',
        functions: [
            { name: "get_candidate_data", parameters: schema }
        ],
        function_call: { name: "get_candidate_data" }
    });

    console.log(chatCompletion);
    console.log(chatCompletion.choices[0]);
    console.log(chatCompletion.choices[0].message);
    console.log(JSON.parse(chatCompletion.choices[0].message.function_call.arguments));
    const result = chatCompletion.choices[0].message.function_call.arguments
    req.candidateJSON = result
    next()
}

module.exports = GPTmodel