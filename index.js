import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(express.json());
app.use(cors());

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("ChatGPT API Online ✔");
});

app.post("/chat", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const model = req.body.model || "gpt-4o-mini";

    if (!prompt) {
      return res.json({ error: "Prompt missing" });
    }

    const completion = await client.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }]
    });

    res.json({
      response: completion.choices[0].message.content
    });

  } catch (err) {
    console.log("CHAT ERROR:", err);
    res.json({ error: "ChatGPT error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log("ChatGPT API Server running on PORT", PORT)
);
