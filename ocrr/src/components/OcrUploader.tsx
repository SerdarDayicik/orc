'use client';

import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

export default function OcrUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      
      // Create preview
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      
      // Reset previous results
      setExtractedText('');
      setError(null);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp', '.webp']
    },
    maxFiles: 1,
    multiple: false
  });

  const processImage = async () => {
    if (!file) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/ocr', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to process image');
      }

      setExtractedText(data.text);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <div 
        {...getRootProps()} 
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p className="text-blue-500">Drop the image here...</p>
        ) : (
          <div>
            <p className="mb-2">Drag & drop an image here, or click to select</p>
            <p className="text-sm text-gray-500">Supports PNG, JPG, JPEG, GIF, BMP, WEBP</p>
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Preview:</h3>
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <Image 
              src={preview} 
              alt="Preview" 
              fill 
              style={{ objectFit: 'contain' }} 
            />
          </div>
          
          <button
            onClick={processImage}
            disabled={isLoading}
            className={`mt-4 px-4 py-2 rounded-md text-white ${
              isLoading ? 'bg-blue-300' : 'bg-blue-600 hover:bg-blue-700'
            } transition-colors`}
          >
            {isLoading ? 'Processing...' : 'Extract Text'}
          </button>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 text-red-700 rounded-md">
          <p className="font-medium">Error:</p>
          <p>{error}</p>
        </div>
      )}

      {extractedText && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Extracted Text:</h3>
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <pre className="whitespace-pre-wrap">{extractedText}</pre>
          </div>
          <button
            onClick={() => {
              navigator.clipboard.writeText(extractedText);
            }}
            className="mt-2 px-3 py-1 text-sm bg-gray-200 hover:bg-gray-300 rounded-md transition-colors"
          >
            Copy to Clipboard
          </button>
        </div>
      )}
    </div>
  );
} 