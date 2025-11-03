import './globals.css';
import { Providers } from './providers';

export const metadata = {
  title: 'Sui Counter dApp',
  description: 'Full-stack Move + Next.js demo',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}