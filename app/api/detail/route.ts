
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'app', 'data', 'mock.detail.json');

    try {
        const data = await fs.readFile(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return NextResponse.json(jsonData);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to load data' + error }, { status: 500 });
    }
}