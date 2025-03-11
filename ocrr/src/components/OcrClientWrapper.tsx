'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the OcrUploader component
const OcrUploader = dynamic(() => import('./OcrUploader'), {
  ssr: false,
});

export default function OcrClientWrapper() {
  return <OcrUploader />;
} 