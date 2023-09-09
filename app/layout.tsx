import DarkModeToggle from "@/components/DarkModeToggle";
import "../styles/globals.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen bg-slate-100 dark:bg-slate-900 text-black dark:text-white">
          <div className="container mx-auto py-2">
            <div className="inline-flex justify-between items-center w-full  mb-6">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold">
                My Blog
              </h2>
              <DarkModeToggle />
            </div>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
