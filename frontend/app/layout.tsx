import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'SAGE / Intent Horizon',
  description: 'A private context layer for Snapdragon-powered AI PCs.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
