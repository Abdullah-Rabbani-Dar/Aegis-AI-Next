import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Voice Agents Landing Page',
  description: 'Transform your business with intelligent AI voice agents that deliver exceptional customer experiences.',
  keywords: 'AI, voice agents, customer service, automation, business solutions',
  authors: [{ name: 'VoiceAI' }],
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}