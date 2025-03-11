'use client';

import dynamic from 'next/dynamic';

// Use dynamic import with SSR disabled for the OcrUploader component
const OcrUploader = dynamic(() => import('../components/OcrUploader'), {
  ssr: false,
});

export default function ClientComponent() {
  return <OcrUploader />;
} 