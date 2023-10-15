import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const api = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        if (!api.apiKey) return new NextResponse('OpenAI API key not found', { status: 500 });

        if (!messages) return new NextResponse('Messages are required', { status: 400 });

        const response = await api.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages
        });

        return NextResponse.json(response.choices[0].message);
    } catch (error) {
        console.log('[CONVERSATION_ERROR]', error);
        return new NextResponse('Internal error', { status: 500 })
    }
}