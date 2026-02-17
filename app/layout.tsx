// app/layout.tsx
import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Providers } from './providers';
import { ChatButton } from '@/components/chat/ChatButton';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { Popup } from '@/components/lesson/Popup';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'GenAI Learning Platform | Master AI From Zero to Hero',
  description: 'The most comprehensive, adaptive AI learning platform. Click any term to explore deeper. No question goes unanswered.',
  keywords: ['AI', 'Machine Learning', 'GenAI', 'RAG', 'Embeddings', 'Agents', 'Learning'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans">
        <Providers>
          {/* Main Content */}
          {children}

          {/* Global Components */}
          <Popup />
          <ChatButton />
          <ChatWindow />
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
