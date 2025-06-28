export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const userMessage = req.body.message;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "زيريوس لا يرد حاليًا.";

    res.status(200).json({ reply });
  } catch (error) {
    res.status(500).json({ error: "خطأ في الاتصال بالخدمة." });
  }
}
