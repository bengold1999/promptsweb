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
    const { prompt, tag ,title  } = await req.json();
    try {
        await connectToDB();
        const existingPrompt = await Prompt.findById(params.id);
        if (!existingPrompt) return new Response("Prompt not found", { status: 404 });
        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag
        existingPrompt.title = title

        
        await existingPrompt.save();
        return new Response(JSON.stringify(existingPrompt),{status:200})
    } catch (error) {
        return new Response("Failed to update prompt", { status: 500 });

    }
}

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

export const PATCHLIKE = async (req, { params }) => {
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