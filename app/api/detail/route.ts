
import { Detail } from '@/app/models/DetailResponse';
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function GET(req: Request) {
    if (process.env.NODE_ENV === 'development') {
        const filePath = path.join(process.cwd(), 'app', 'data', 'mock.detail.json');
        try {
            const data = await fs.readFile(filePath, 'utf8');
            const jsonData = JSON.parse(data);
            return NextResponse.json(jsonData);
        } catch (error) {
            return NextResponse.json({ error: 'Failed to load data' + error }, { status: 500 });
        }
    } else {
        const url = new URL(req.url);
        const symbol = url.searchParams.get('symbol');

        if (!symbol) {
            return NextResponse.json({ error: 'Symbol parameter is missing' }, { status: 400 });
        }
        if (!process.env.API_KEY) {
            return NextResponse.json({ error: 'API key is missing in production environment' }, { status: 500 });
        }
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${process.env.API_KEY}`);
            const jsonData: Detail = await res.json();
            return NextResponse.json(jsonData, { status: 200 });
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to load data from API: ' + error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
            }
        }
    }
}