
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function GET(req: Request) {
    const url = new URL(req.url);
    const query = url.searchParams.get('query')?.toLowerCase() || '';
    const filePath = path.join(process.cwd(), 'app', 'data', 'mock.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        const filteredResults = jsonData.bestMatches.filter((match: { name: string; symbol: string }) => {
            return match.name.toLowerCase().includes(query) || match.symbol.toLowerCase().includes(query);
        });

        const sortedResults = filteredResults.sort((a: { matchScore: string }, b: { matchScore: string }) => {
            return parseFloat(b.matchScore) - parseFloat(a.matchScore);
        });
        return NextResponse.json({ bestMatches: sortedResults });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load data' + error }, { status: 500 });
    }
}