import { Link } from "wouter";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Upload, 
  Info, 
  FileText, 
  Video, 
  Headphones,
  GraduationCap,
  Users,
  FolderOpen,
  TrendingUp
} from "lucide-react";

const ctaCards = [
  {
    title: "Browse Resources",
    description: "Explore our collection of e-books, lecture notes, research papers, and multimedia materials.",
    icon: FolderOpen,
    href: "/resources",
    variant: "default" as const,
  },
  {
    title: "Upload Resource",
    description: "Share your knowledge by uploading educational materials for others to benefit from.",
    icon: Upload,
    href: "/upload",
    variant: "outline" as const,
  },
  {
    title: "About LRMS",
    description: "Learn more about our mission to make education accessible to everyone.",
    icon: Info,
    href: "/about",
    variant: "outline" as const,
  },
];

const stats = [
  { label: "E-books", count: "500+", icon: BookOpen },
  { label: "Research Papers", count: "200+", icon: FileText },
  { label: "Lecture Notes", count: "150+", icon: GraduationCap },
  { label: "Videos & Audio", count: "50+", icon: Video },
];

const features = [
  {
    icon: BookOpen,
    title: "Comprehensive Library",
    description: "Access thousands of curated educational resources across various subjects and disciplines."
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Faculty and students contribute resources, creating a growing knowledge base."
  },
  {
    icon: TrendingUp,
    title: "Always Updated",
    description: "New materials are added regularly to keep content fresh and relevant."
  },
];

export default function HomePage() {
  return (
    <Layout>
      <section className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>Your Academic Resource Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6" data-testid="text-hero-title">
              Learning Resource{" "}
              <span className="text-primary">Management System</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto" data-testid="text-hero-description">
              A centralized hub for accessing e-books, lecture notes, research papers, and multimedia resources. Empowering students and faculty with knowledge.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/resources">
                <Button size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-browse-resources">
                  <FolderOpen className="h-5 w-5" />
                  Browse Resources
                </Button>
              </Link>
              <Link href="/upload">
                <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto" data-testid="button-upload-resource">
                  <Upload className="h-5 w-5" />
                  Upload Resource
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <Card key={stat.label} className="text-center hover-elevate" data-testid={`card-stat-${stat.label.toLowerCase().replace(" ", "-")}`}>
                <CardContent className="pt-6 pb-6">
                  <div className="flex justify-center mb-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <stat.icon className="h-6 w-6" />
                    </div>
                  </div>
                  <p className="text-2xl sm:text-3xl font-bold text-primary">{stat.count}</p>
                  <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Get Started</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose how you'd like to engage with our learning platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {ctaCards.map((card) => (
              <Link key={card.title} href={card.href}>
                <Card className="h-full hover-elevate cursor-pointer group" data-testid={`card-cta-${card.title.toLowerCase().replace(" ", "-")}`}>
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                      <card.icon className="h-6 w-6" />
                    </div>
                    <CardTitle className="text-xl">{card.title}</CardTitle>
                    <CardDescription className="text-base">
                      {card.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose LRMS?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Designed to make learning accessible and collaborative
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature) => (
              <div key={feature.title} className="text-center" data-testid={`feature-${feature.title.toLowerCase().replace(" ", "-")}`}>
                <div className="flex justify-center mb-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <feature.icon className="h-7 w-7" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Start Learning?</h2>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join thousands of students and faculty who use LRMS to access quality educational resources.
          </p>
          <Link href="/resources">
            <Button size="lg" className="gap-2" data-testid="button-explore-library">
              <BookOpen className="h-5 w-5" />
              Explore the Library
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
