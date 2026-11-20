import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'lib', 'site-data.json');

export async function GET() {
  const fileData = fs.readFileSync(dataFilePath, 'utf8');
  return NextResponse.json(JSON.parse(fileData));
}

export async function POST(req) {
  const body = await req.json();
  fs.writeFileSync(dataFilePath, JSON.stringify(body, null, 2), 'utf8');
  return NextResponse.json({ success: true });
}