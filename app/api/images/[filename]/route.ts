// 
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// interface Params {
//   params: {
//     filename: string;
//   };
// }
const uploadsDir = path.join(process.cwd(), 'uploads');

export async function GET(req: Request) {
  // const { filename } = params; // Extract filename from URL params
  const url = new URL(req.url);
  const filename = url.pathname.split('/').pop(); // Extract filename from URL params
  
  if (!filename) {
    return NextResponse.json({ message: 'Filename is required' }, { status: 400 });
  }

  const filePath = path.join(uploadsDir, filename); // Construct the full file path

  try {
    if (!fs.existsSync(filePath)) {
      throw new Error("File not found");
    }
    const data = fs.readFileSync(filePath);
    const fileExtension = path.extname(filename).toLowerCase();
    let contentType = 'application/octet-stream'; // Default

    // Set the appropriate content type based on the file extension
    if (fileExtension === '.jpg' || fileExtension === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (fileExtension === '.png') {
      contentType = 'image/png';
    } else if (fileExtension === '.gif') {
      contentType = 'image/gif';
    }

    // Return the image data with the correct content type
    return new NextResponse(data, {
      headers: { 'Content-Type': contentType },
      status: 200,
    });
  } catch (err) {
    return new NextResponse(JSON.stringify({message:'File not found',err}), { status: 404, headers: { 'Content-Type': 'application/json' } });
  }
}