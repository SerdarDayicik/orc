import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Get the API key from environment variables
    const apiKey = process.env.MISTRAL_API_KEY;
    
    if (!apiKey) {
      return NextResponse.json({ error: 'API key not configured' }, { status: 500 });
    }

    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    // Make request to Mistral OCR API
    const response = await axios.post(
      'https://api.mistral.ai/v1/ocr',
      {
        model: 'mistral-ocr-latest',
        document: {
          type: 'image_url',
          image_url: `data:${file.type};base64,${base64Image}`
        }
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      }
    );

    // Extract the text from the OCR response
    const extractedText = response.data.pages
      .map((page: any) => page.markdown || '')
      .join('\n\n');

    return NextResponse.json({ text: extractedText }, { status: 200 });
  } catch (error) {
    console.error('OCR error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
} 