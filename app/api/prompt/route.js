import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import { NextResponse } from 'next/server';


export const GET = async () => {
    try {
        await connectToDB();
        const prompts = await Prompt.find({}).populate("creator");
        return new Response(JSON.stringify(prompts), { status: 200 });
    } catch (error) {
        console.error('Error fetching prompts:', error);
        return new Response(JSON.stringify({ error: 'Error fetching prompts' }), { status: 500 });        
    }
}