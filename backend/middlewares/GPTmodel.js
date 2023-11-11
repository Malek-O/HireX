const OpenAI = require("openai")

/** @type {import("express").RequestHandler} */
const GPTmodel = async (req, res, next) => {
    if (!req.CVTEXT) return res.status(400).json({ "message": "Prompt not found" })

    const openai = new OpenAI({
        apiKey: process.env.OPENAI_KEY
    });

    const prompt = `You have the follwing CV data, please extract follwing and return it as json like bellow only dont add extra properties :
{
    "name": "",
    "email": "",
    "phone": "",
    "Nationality":"",
    "Designation":"",
    "Education":"",
    "GPA":"",
    "experiences": [{
    "position": "",
    "duration": ""
    }],
    "languages": [],
    "Skills": []
}

${req.CVTEXT}
`
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'gpt-3.5-turbo-1106',
    });

    console.log(chatCompletion);
    console.log(chatCompletion.choices[0]);
    console.log(chatCompletion.choices[0].message);
    console.log(JSON.parse(chatCompletion.choices[0].message.content));
    const result = chatCompletion.choices[0].message.content
    req.candidateJSON = result
    next()
}

module.exports = GPTmodel