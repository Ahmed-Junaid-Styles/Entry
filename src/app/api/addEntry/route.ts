import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Entry = {
  id: number;
  name: string;
  createdAt: string;
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: '"name" is required' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'entries.json');

    // Read current data
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const entries: Entry[] = JSON.parse(fileContents);

    const newEntry: Entry = {
      id: entries.length + 1,
      name: body.name,
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);

    // Write updated entries
    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Entry added', entry: newEntry }, { status: 200 });
  } catch (error) {
    console.error('POST /api/addEntry error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
