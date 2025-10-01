import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

type Entry = {
  id: number;
  name: string;
  createdAt: string;
};

const filePath = path.join(process.cwd(), 'src', 'data', 'entries.json');

export async function GET() {
  try {
    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const entries: Entry[] = JSON.parse(fileContents);
    return NextResponse.json(entries);
  } catch (error) {
    console.error('Error reading entries:', error);
    return NextResponse.json({ error: 'Failed to load entries' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body?.name || typeof body.name !== 'string') {
      return NextResponse.json({ error: '"name" is required' }, { status: 400 });
    }

    const fileContents = fs.readFileSync(filePath, 'utf-8');
    const entries: Entry[] = JSON.parse(fileContents);

    const newEntry: Entry = {
      id: entries.length + 1,
      name: body.name,
      createdAt: new Date().toISOString(),
    };

    entries.push(newEntry);

    fs.writeFileSync(filePath, JSON.stringify(entries, null, 2), 'utf-8');

    return NextResponse.json({ message: 'Entry added', entry: newEntry }, { status: 200 });
  } catch (error) {
    console.error('Error adding entry:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
