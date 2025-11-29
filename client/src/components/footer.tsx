import { Link } from "wouter";
import { BookOpen, Mail, Github, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpen className="h-5 w-5" />
              </div>
              <span className="font-semibold text-lg">LRMS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-xs">
              A centralized hub for accessing e-books, lecture notes, research papers, and multimedia learning resources.
            </p>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/resources" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-browse">
                Browse Resources
              </Link>
              <Link href="/upload" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-upload">
                Upload Resource
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors" data-testid="link-footer-about">
                About LRMS
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Connect</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Email"
                data-testid="link-social-email"
              >
                <Mail className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="GitHub"
                data-testid="link-social-github"
              >
                <Github className="h-4 w-4" />
              </a>
              <a 
                href="#" 
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                aria-label="Twitter"
                data-testid="link-social-twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              Questions? Contact us anytime.
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            {new Date().getFullYear()} Learning Resource Management System. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
