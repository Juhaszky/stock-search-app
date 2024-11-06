
import { promises as fs } from 'fs';
import { NextResponse } from "next/server";
import path from 'path';

export async function GET() {
    const filePath = path.join(process.cwd(), 'app', 'data', 'mock.json'); // Absolute path to `mock.json`
  
  try {
    const data = await fs.readFile(filePath, 'utf8'); // Read the file
    const jsonData = JSON.parse(data); // Parse the JSON data
    return NextResponse.json(jsonData); // Return the data as JSON
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load data' + error }, { status: 500 });
  }
}