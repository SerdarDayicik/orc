import ClientComponent from '@/app/client';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center p-8">
      <header className="w-full max-w-4xl mx-auto mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">OCR Image to Text</h1>
        <p className="text-gray-600">
          Upload an image and extract text using Mistral OCR
        </p>
      </header>
      
      <main className="w-full flex-1">
        <ClientComponent />
      </main>
      
      <footer className="w-full max-w-4xl mx-auto mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        <p>Powered by Next.js and Mistral OCR API</p>
      </footer>
    </div>
  );
}
