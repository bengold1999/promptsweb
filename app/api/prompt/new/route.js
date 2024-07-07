import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const { userId, prompt, tag, like, dislike, title } = await req.json();
    console.log('Received data:', { userId, prompt, tag, like, dislike, title });

    try {
        await connectToDB();
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag,
            like,
            dislike,
            title
        });

        await newPrompt.save();
        console.log('Saved prompt:', newPrompt);
        return new Response(JSON.stringify(newPrompt), { status: 201 });
    } catch (error) {
        console.log('Error saving prompt:', error);
        return new Response("Failed to create a new prompt", { status: 500 });
    }
};
