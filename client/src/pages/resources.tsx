import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  BookOpen, 
  FileText, 
  Video, 
  Headphones,
  Download,
  Eye,
  Filter,
  X
} from "lucide-react";
import type { Resource, ResourceType } from "@shared/schema";
import { categoryDisplayNames } from "@shared/schema";

const categoryIcons: Record<ResourceType, React.ElementType> = {
  "ebook": BookOpen,
  "lecture-notes": FileText,
  "research-paper": FileText,
  "multimedia": Video,
};

const categoryColors: Record<ResourceType, string> = {
  "ebook": "bg-blue-500/10 text-blue-600 dark:text-blue-400",
  "lecture-notes": "bg-green-500/10 text-green-600 dark:text-green-400",
  "research-paper": "bg-purple-500/10 text-purple-600 dark:text-purple-400",
  "multimedia": "bg-orange-500/10 text-orange-600 dark:text-orange-400",
};

const categories: { type: ResourceType | "all"; label: string }[] = [
  { type: "all", label: "All Resources" },
  { type: "ebook", label: "E-books" },
  { type: "lecture-notes", label: "Lecture Notes" },
  { type: "research-paper", label: "Research Papers" },
  { type: "multimedia", label: "Multimedia" },
];

function ResourceCard({ resource }: { resource: Resource }) {
  const Icon = categoryIcons[resource.type as ResourceType] || FileText;
  const colorClass = categoryColors[resource.type as ResourceType] || "bg-gray-500/10 text-gray-600";
  
  return (
    <Card className="h-full flex flex-col hover-elevate" data-testid={`card-resource-${resource.id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${colorClass}`}>
            <Icon className="h-5 w-5" />
          </div>
          <Badge variant="secondary" className="shrink-0 text-xs">
            {categoryDisplayNames[resource.type as ResourceType] || resource.type}
          </Badge>
        </div>
        <CardTitle className="text-lg mt-3 line-clamp-2">{resource.title}</CardTitle>
        <CardDescription className="text-sm">
          by {resource.author}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {resource.description}
        </p>
        {resource.fileSize && (
          <p className="text-xs text-muted-foreground mt-2">
            Size: {resource.fileSize}
          </p>
        )}
      </CardContent>
      <CardFooter className="pt-0 gap-2 flex-wrap">
        <Button size="sm" className="flex-1 gap-1" data-testid={`button-view-${resource.id}`}>
          <Eye className="h-4 w-4" />
          View
        </Button>
        <Button size="sm" variant="outline" className="flex-1 gap-1" data-testid={`button-download-${resource.id}`}>
          <Download className="h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
}

function ResourceCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <Skeleton className="h-10 w-10 rounded-lg" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="h-6 w-3/4 mt-3" />
        <Skeleton className="h-4 w-1/2 mt-1" />
      </CardHeader>
      <CardContent className="flex-1 pb-3">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full mt-2" />
        <Skeleton className="h-4 w-2/3 mt-2" />
      </CardContent>
      <CardFooter className="pt-0 gap-2">
        <Skeleton className="h-8 flex-1" />
        <Skeleton className="h-8 flex-1" />
      </CardFooter>
    </Card>
  );
}

export default function ResourcesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<ResourceType | "all">("all");

  const { data: resources = [], isLoading } = useQuery<Resource[]>({
    queryKey: ["/api/resources"],
  });

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      const matchesSearch = 
        searchQuery === "" ||
        resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
        resource.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = 
        selectedCategory === "all" || 
        resource.type === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [resources, searchQuery, selectedCategory]);

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: resources.length };
    resources.forEach((resource) => {
      counts[resource.type] = (counts[resource.type] || 0) + 1;
    });
    return counts;
  }, [resources]);

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
  };

  const hasActiveFilters = searchQuery !== "" || selectedCategory !== "all";

  return (
    <Layout showSearch onSearch={setSearchQuery} searchQuery={searchQuery}>
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" data-testid="text-page-title">
              Browse Resources
            </h1>
            <p className="text-muted-foreground">
              Explore our collection of academic resources
            </p>
          </div>

          <div className="sticky top-16 z-40 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8 py-4 bg-background/95 backdrop-blur border-b mb-6">
            <div className="flex flex-wrap items-center gap-2">
              <div className="flex items-center gap-2 mr-2 text-sm text-muted-foreground">
                <Filter className="h-4 w-4" />
                <span className="hidden sm:inline">Filter:</span>
              </div>
              {categories.map((category) => {
                const count = categoryCounts[category.type] || 0;
                const isActive = selectedCategory === category.type;
                return (
                  <Button
                    key={category.type}
                    size="sm"
                    variant={isActive ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.type)}
                    className="gap-1"
                    data-testid={`button-category-${category.type}`}
                  >
                    {category.label}
                    <span className={`text-xs ${isActive ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                      ({count})
                    </span>
                  </Button>
                );
              })}
              {hasActiveFilters && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={handleClearFilters}
                  className="gap-1 text-muted-foreground"
                  data-testid="button-clear-filters"
                >
                  <X className="h-4 w-4" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {isLoading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <ResourceCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredResources.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground mb-4">
                {hasActiveFilters 
                  ? "Try adjusting your search or filters"
                  : "No resources have been uploaded yet"}
              </p>
              {hasActiveFilters && (
                <Button variant="outline" onClick={handleClearFilters} data-testid="button-clear-filters-empty">
                  Clear Filters
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 text-sm text-muted-foreground" data-testid="text-results-count">
                Showing {filteredResources.length} of {resources.length} resources
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredResources.map((resource) => (
                  <ResourceCard key={resource.id} resource={resource} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
