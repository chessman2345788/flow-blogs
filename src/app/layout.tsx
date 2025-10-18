import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'Flows Blog | Admin Panel' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-background text-text`}>
        <Toaster
          position="top-center"
          toastOptions={{
          
            style: { background: '#FFFFFF', color: '#111827', border: '1px solid #E5E7EB' },
          }}
        />
        {children}
      </body>
    </html>
  );
}