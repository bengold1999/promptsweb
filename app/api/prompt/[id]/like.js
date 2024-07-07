import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const PATCH = async (req, { params }) => {
    const { type } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return new Response("Prompt not found", { status: 404 });
        }

        if (type === 'like') {
            existingPrompt.like += 1;
        } else if (type === 'dislike') {
            existingPrompt.dislike += 1;
        }

        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt), { status: 200 });
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });
    }
};
