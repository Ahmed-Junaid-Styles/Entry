import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";

const filePath = path.join(process.cwd(), "src", "data", "entries.json");

export async function GET() {
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  const newItem = await req.json();
  const fileContents = await fs.readFile(filePath, "utf8");
  const data = JSON.parse(fileContents);
  console.log(newItem);
  
  data.push(newItem);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return NextResponse.json({ message: "Item added", data });
}

export async function DELETE(req: Request) {
  const id = await req.json(); // assuming each item has an 'id'
  const fileContents = await fs.readFile(filePath, "utf8");
  let data = JSON.parse(fileContents);
  console.log(id);
  
  data = data.filter((item: any) => item.id != id);

  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf8");
  return NextResponse.json({ message: "Item deleted", data });
}
