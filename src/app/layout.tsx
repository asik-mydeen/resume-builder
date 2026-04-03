import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'resume-builder', description: 'Interactive resume builder with live preview and PDF export' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="en"><body>{children}</body></html>
}
