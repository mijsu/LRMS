import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

interface LayoutProps {
  children: React.ReactNode;
  onSearch?: (query: string) => void;
  searchQuery?: string;
  showSearch?: boolean;
}

export function Layout({ children, onSearch, searchQuery, showSearch = false }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar onSearch={onSearch} searchQuery={searchQuery} showSearch={showSearch} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
