import { Router } from 'express';
import fetch from 'node-fetch';

// POST /ai/chat -> forwards to OpenRouter
// expects body { model: string, messages: any[], jsonSchema?: any }
export const openrouterRouter = Router();

openrouterRouter.post('/chat', async (req, res) => {
  const { model, messages, jsonSchema } = req.body || {};
  if (!model || !Array.isArray(messages)) {
    res.status(400).json({ error: 'model and messages are required' });
    return;
  }

  const systemPrompt = jsonSchema
    ? `You are PrimaryUI Author. Output ONLY valid JSON that conforms to the provided JSON Schema. Do not include prose. Schema:\n${JSON.stringify(jsonSchema)}`
    : undefined;

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'HTTP-Referer': 'https://primaryui.local',
        'X-Title': 'PrimaryUI Studio',
      },
      body: JSON.stringify({
        model,
        messages: systemPrompt
          ? [{ role: 'system', content: systemPrompt }, ...messages]
          : messages,
      }),
    });

    if (!response.ok) {
      const text = await response.text();
      res.status(response.status).send(text);
      return;
    }

    const data = await response.json();

    // If schema expected, ensure we return only JSON content
    let content = data.choices?.[0]?.message?.content ?? '';
    if (jsonSchema) {
      try {
        content = JSON.parse(content);
      } catch (e) {
        res.status(422).json({ error: 'Model did not return valid JSON' });
        return;
      }
      res.json(content);
    } else {
      res.json({ content });
    }
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default openrouterRouter;
