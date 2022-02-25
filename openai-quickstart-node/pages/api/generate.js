import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion("text-davinci-001", {
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
    max_tokens: 50,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop: ["\n"],
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(question) {
  const complete_question = `${question}?`;

  console.log(complete_question);
  return `A: Qual o seu nome?
  Q: Meu nome é Alexa
  A: ${complete_question}`;
}
