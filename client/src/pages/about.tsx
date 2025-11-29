import { Layout } from "@/components/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  BookOpen, 
  Users, 
  Globe, 
  Lightbulb,
  GraduationCap,
  Share2,
  CheckCircle2,
  FolderOpen
} from "lucide-react";

const missionPoints = [
  {
    icon: Globe,
    title: "Accessibility",
    description: "Making educational resources available to everyone, everywhere, at any time."
  },
  {
    icon: Share2,
    title: "Knowledge Sharing",
    description: "Facilitating the exchange of knowledge between students and faculty."
  },
  {
    icon: Lightbulb,
    title: "Independent Learning",
    description: "Empowering learners to take control of their educational journey."
  },
];

const benefits = [
  "Access to thousands of curated educational resources",
  "Easy-to-use search and filtering capabilities",
  "Support for multiple resource formats",
  "Community-driven content contributions",
  "Mobile-friendly design for learning on the go",
  "Dark and light mode for comfortable viewing",
];

export default function AboutPage() {
  return (
    <Layout>
      <section className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <GraduationCap className="h-4 w-4" />
              <span>About Us</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6" data-testid="text-page-title">
              About LRMS
            </h1>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Empowering education through accessible digital resources
            </p>
          </div>

          <Card className="mb-12">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
                  <p className="text-muted-foreground leading-relaxed" data-testid="text-mission-statement">
                    The Learning Resource Management System is a digital repository where students and faculty can access academic resources such as e-books, lecture notes, research papers, and multimedia learning materials. It promotes accessibility, knowledge sharing, and independent learning.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {missionPoints.map((point) => (
              <Card key={point.title} className="text-center hover-elevate" data-testid={`card-mission-${point.title.toLowerCase()}`}>
                <CardContent className="pt-8 pb-8">
                  <div className="flex justify-center mb-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <point.icon className="h-7 w-7" />
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="mb-12">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Why LRMS?</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-primary text-primary-foreground">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Explore?</h2>
              <p className="text-primary-foreground/80 mb-6 max-w-lg mx-auto">
                Start browsing our extensive collection of educational resources and enhance your learning experience today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/resources">
                  <Button variant="secondary" size="lg" className="gap-2 w-full sm:w-auto" data-testid="button-browse-resources">
                    <FolderOpen className="h-5 w-5" />
                    Browse Resources
                  </Button>
                </Link>
                <Link href="/upload">
                  <Button variant="outline" size="lg" className="gap-2 w-full sm:w-auto bg-transparent border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10" data-testid="button-upload-resource">
                    <Share2 className="h-5 w-5" />
                    Contribute
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="mt-12 text-center">
            <h3 className="text-lg font-semibold mb-2">Have Questions?</h3>
            <p className="text-muted-foreground">
              Feel free to reach out to us at{" "}
              <a href="mailto:support@lrms.edu" className="text-primary hover:underline" data-testid="link-email">
                support@lrms.edu
              </a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
