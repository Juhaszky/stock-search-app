import { SearchResponse } from "@/app/models/SearchResponse";
import { NextResponse } from "next/server";
import fs from 'fs';
import path from 'path';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    //DEV
    if (process.env.NODE_ENV === 'development') {
        const filePath = path.join(process.cwd(), 'app', 'data', 'mock.json');

        try {
            const data = await fs.promises.readFile(filePath, 'utf8');
            const jsonData: SearchResponse = JSON.parse(data);

            const filteredResults = jsonData.bestMatches.filter((match) => {
                return match['2. name'].toLowerCase().includes(query) ||
                    match['1. symbol'].toLowerCase().includes(query);
            });

            const sortedResults = filteredResults.sort((a, b) => {
                const scoreA = a['9. matchScore'];
                const scoreB = b['9. matchScore'];
                return scoreB - scoreA;
            });

            return NextResponse.json({ bestMatches: sortedResults });
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to load data from local data: ' + error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
            }
        }
        //PROD
    } else {
        if (!process.env.API_KEY) {
            return NextResponse.json({ error: 'API key is missing in production environment' }, { status: 500 });
        }
        try {
            const res = await fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${query}&apikey=${process.env.API_KEY}`);
            const jsonData: SearchResponse = await res.json();

            const filteredResults = jsonData.bestMatches.filter((match) => {
                return match['2. name'].toLowerCase().includes(query) ||
                    match['1. symbol'].toLowerCase().includes(query);
            });

            const sortedResults = filteredResults.sort((a, b) => {
                const scoreA = a['9. matchScore'];
                const scoreB = b['9. matchScore'];
                return scoreB - scoreA;
            });

            return NextResponse.json({ bestMatches: sortedResults });
        } catch (error) {
            if (error instanceof Error) {
                return NextResponse.json({ error: 'Failed to load data from API: ' + error.message }, { status: 500 });
            } else {
                return NextResponse.json({ error: 'An unknown error occurred' }, { status: 500 });
            }

        }
    }
}
