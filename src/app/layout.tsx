import { Inter } from 'next/font/google';
import './globals.css';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = { title: 'Flows Blog | Admin Panel' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* Applies base black background and white text */}
      <body className={`${inter.className} bg-background text-text`}>
        <Toaster
          position="top-center"
          toastOptions={{
            // Style toasts for the black theme
            style: { background: '#0A0A0A', color: '#FFFFFF', border: '1px solid #1A1A1A' },
          }}
        />
        {children}
      </body>
    </html>
  );
}