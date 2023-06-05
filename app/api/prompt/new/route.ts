import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";

export const POST = async (req: any) => {
  const { prompt, userId, tag } = await req.json();
  console.log(prompt, userId, tag);
  try {
    await connectToDb();
    const newPrompt = await Prompt.create({
      prompt,
      creator: userId,
      tag,
    });
    return new Response(JSON.stringify(newPrompt), {
      status: 201,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to create prompt", {
      status: 500,
    });
  }
};
