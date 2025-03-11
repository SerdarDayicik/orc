# OCR Image to Text App

This is a Next.js application that uses Mistral's OCR API to extract text from images.

## Features

- Drag and drop image upload
- Image preview
- Text extraction using Mistral OCR API
- Copy extracted text to clipboard

## Prerequisites

- Node.js 18.17.0 or later
- A Mistral API key (get one from [Mistral AI](https://mistral.ai/))

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd ocrr
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file in the root directory and add your Mistral API key:

```
MISTRAL_API_KEY=your_mistral_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## How to Use

1. Drag and drop an image onto the upload area, or click to select an image from your device.
2. Once the image is uploaded, you'll see a preview of the image.
3. Click the "Extract Text" button to process the image.
4. The extracted text will be displayed below the image.
5. Click the "Copy to Clipboard" button to copy the extracted text.

## Technologies Used

- [Next.js](https://nextjs.org/) - React framework
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [React Dropzone](https://react-dropzone.js.org/) - File upload component
- [Mistral AI](https://mistral.ai/) - OCR API

## License

This project is licensed under the MIT License.
