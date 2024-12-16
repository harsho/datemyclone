import { OpenAI } from 'openai';
import { Message, StreamingTextResponse } from 'ai';

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY environment variable');
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const customModel = (apiIdentifier: string) => {
  return async (messages: Message[]) => {
    const response = await openai.chat.completions.create({
      model: apiIdentifier,
      messages: messages.map((m) => ({
        content: m.content,
        role: m.role,
      })),
      stream: true,
      temperature: 0.7,
      presence_penalty: 0.5,
      frequency_penalty: 0.5,
    });

    // Convert the response into a friendly text-stream
    return new StreamingTextResponse(response.body);
  };
};
