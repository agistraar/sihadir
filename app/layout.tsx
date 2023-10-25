import clsx from 'clsx';
import './globals.css';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

const inter = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['italic', 'normal'],
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Si Hadir.',
  description: 'Aplikasi Presensi Program Studi Teknik Informatika',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body
        className={clsx(
          inter.className,
          'scrollbar-thin scrollbar-thumb-gray-500 scrollbar-thumb-rounded-2xl bg-gray-200 text-black'
        )}
      >
        {children}
      </body>
    </html>
  );
}
