import { Inter } from 'next/font/google';
import './globals.css'; // Import the updated global styles
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'Flows Blog | Admin Panel' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Remove bg-background and text-text - handled by globals.css now */}
      <body className={`${inter.className}`}>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { background: '#0A0A0A', color: '#FFFFFF', border: '1px solid #1A1A1A' },
          }}
        />
        {children}
      </body>
    </html>
  );
}