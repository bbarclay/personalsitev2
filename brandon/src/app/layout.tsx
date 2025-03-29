import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { ThemeProvider } from "@/components/theme-provider";
import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Brandon's Site",
  description: "A website with Math and AI sections",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="mathjax-config" strategy="beforeInteractive">
          {`
            window.MathJax = {
              tex: {
                inlineMath: [['\\\\(', '\\\\)']],
                displayMath: [['\\\\[', '\\\\]']]
              },
              svg: {
                fontCache: 'global'
              }
            };
          `}
        </Script>
        <Script 
          id="mathjax-script" 
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-mml-chtml.js"
          strategy="afterInteractive"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav className="bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-md p-4">
            <div className="container mx-auto flex justify-between items-center">
              <a href="/" className="flex items-center space-x-2">
                <Logo width={36} height={36} />
                <span className="text-xl font-bold">Brandon's Site</span>
              </a>
              <div className="flex items-center space-x-4">
                <a href="/" className="hover:underline">Home</a>
                <a href="/math" className="hover:underline">Math</a>
                <a href="/ai" className="hover:underline">AI</a>
                <ThemeToggle />
              </div>
            </div>
          </nav>
          <main className="min-h-screen bg-gray-50 dark:bg-slate-900">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
