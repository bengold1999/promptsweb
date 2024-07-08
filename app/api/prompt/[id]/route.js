import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from "next/server";
import mongoose from 'mongoose';


export const GET = async (req,{params}) => {
    try {
        await connectToDB();
        const prompts = await Prompt.findById(params.id).populate("creator");
        if (!prompts) return new Response("Prompt not found", { status: 404 })
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.log(error);
        
    }
}

export const PATCH = async (req, { params }) => {
    const { userId, type, prompt, tag, title } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);

        if (!existingPrompt) {
            return NextResponse.json({ message: "Prompt not found" }, { status: 404 });
        }

        if (type) {
            // Handle likes and dislikes
            if (type === 'like') {
                if (!existingPrompt.likes.includes(userId)) {
                    existingPrompt.likes.push(userId);
                    existingPrompt.dislikes = existingPrompt.dislikes.filter(id => id.toString() !== userId);
                }
            } else if (type === 'dislike') {
                if (!existingPrompt.dislikes.includes(userId)) {
                    existingPrompt.dislikes.push(userId);
                    existingPrompt.likes = existingPrompt.likes.filter(id => id.toString() !== userId);
                }
            }
        } else if (prompt || tag || title || which) {
            // Handle content update
            if (prompt) existingPrompt.prompt = prompt;
            if (tag) existingPrompt.tag = tag;
            if (title) existingPrompt.title = title;
            if (which) existingPrompt.which = which;
        }

        await existingPrompt.save();
        return NextResponse.json(existingPrompt, { status: 200 });
    } catch (error) {
        console.error("Error updating prompt:", error);
        return NextResponse.json({ message: "Failed to update prompt" }, { status: 500 });
    }
};

export const DELETE = async (req, { params }) => {
    try {
        await connectToDB();
        const { id } = params;
        console.log('delete id:', id);
        if (!id) {
            return NextResponse.json({ message: "Prompt ID is required" }, { status: 400 });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ message: "Invalid Prompt ID" }, { status: 400 });
        }

        const deletedPrompt = await Prompt.findByIdAndDelete(id);

        if (!deletedPrompt) {
            return NextResponse.json({ message: "Prompt not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Prompt deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting prompt:", error);
        return NextResponse.json({ message: "Failed to delete prompt" }, { status: 500 });
    }
}
