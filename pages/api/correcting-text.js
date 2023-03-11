// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});


export default async function handler(req, res) {
  const input = req.body.input;
  let content = "";

  if (!input)
    res.status(400).json({ error: "Invalid input. Try again." });
  if (input === "")
    res.status(400).json({ error: "Invalid input. Try again." });

  const openai = new OpenAIApi(configuration);

  const moderation = await openai.createModeration({ input });

  if (moderation.data.results[0].flagged)
    res.status(400).json({ error: "Invalid input. Try again." });

  if (process.env.LANGUAGE === "EN")
    content = "Analysis, in grammatical form, the text below. And whether has errors, explain each one them. The response should be in HTML format. \n\n'''\n";
  else if (process.env.LANGUAGE === "PTBR")
    content = "Avalie, de forma gramatical, o texto abaixo. E se houver erros, explique cada um deles. A resposta deve está em formato HTML. \n\n'''\n";

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{
      role: "user",
      content: content + input + "\n'''"
    }]
  });

  res.status(200).json({ output: response.data.choices[0].message.content });
}
