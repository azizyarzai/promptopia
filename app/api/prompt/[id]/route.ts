import Prompt from "@models/prompt";
import { connectToDb } from "@utils/database";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";

// GET
export const GET = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectToDb();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    return new Response(JSON.stringify(prompt), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch prompts", {
      status: 500,
    });
  }
};

// PATCH
export const PATCH = async (req: Request, { params }: { params: Params }) => {
  const { prompt, tag } = await req.json();
  try {
    await connectToDb();
    const post = await Prompt.findById(params.id);
    if (!post) {
      return new Response("Prompt not found", {
        status: 404,
      });
    }

    post.prompt = prompt;
    post.tag = tag;
    await post.save();

    return new Response(JSON.stringify(post), {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to update prompts", {
      status: 500,
    });
  }
};
// DELETE

export const DELETE = async (req: Request, { params }: { params: Params }) => {
  try {
    await connectToDb();
    await Prompt.findByIdAndRemove(params.id);

    return new Response("Prompt deleted successfully", {
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete prompts", {
      status: 500,
    });
  }
};
