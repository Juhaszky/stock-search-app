import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Stock Search App",
  description: "Application that allows users to search for stock quotes and display their data using the Alphavantage public data source",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased dark`}>
        <div className="flex flex-col md:flex-row h-screen">
          <nav className="w-full md:w-64 bg-zinc-700 text-white p-6 md:fixed top-0 left-0 md:h-full md:flex flex-col hidden md:block">
            <h2 className="text-2xl font-bold mb-6 text-purple-500">Stock Search App</h2>
            <ul>
              <li className="mb-4">
                <Link href="/" className="hover:text-purple-500">Search Stocks</Link>
              </li>
              <li className="mb-4">
                <Link href="/favorites" className="hover:text-purple-500">Your Favorites</Link>
              </li>
            </ul>
          </nav>
          <main className="flex-1 p-6 bg-slate-50 dark:bg-zinc-800 md:ml-64">
            <div className="flex flex-row justify-between md:hidden mb-4">
              <Link href="/" className="block font-bold border border-white p-2 rounded-lg text-white mb-2">Search Stocks</Link>
              <Link href="/favorites" className="block font-bold border border-white p-2 rounded-lg text-white mb-2">Your Favorites</Link>
            </div>
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
