import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { Layout } from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { 
  Upload, 
  FileUp, 
  CheckCircle2, 
  BookOpen,
  FileText,
  Video,
  Loader2
} from "lucide-react";
import { resourceTypes, categoryDisplayNames } from "@shared/schema";

const uploadFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters").max(200, "Title must be less than 200 characters"),
  author: z.string().min(2, "Author name must be at least 2 characters").max(100, "Author name must be less than 100 characters"),
  type: z.enum(resourceTypes, { required_error: "Please select a resource type" }),
  description: z.string().min(10, "Description must be at least 10 characters").max(1000, "Description must be less than 1000 characters"),
  fileName: z.string().optional(),
  fileSize: z.string().optional(),
});

type UploadFormValues = z.infer<typeof uploadFormSchema>;

const resourceTypeInfo = [
  { type: "ebook", icon: BookOpen, description: "PDF, EPUB, or other e-book formats" },
  { type: "lecture-notes", icon: FileText, description: "Lecture slides, notes, or handouts" },
  { type: "research-paper", icon: FileText, description: "Academic papers and publications" },
  { type: "multimedia", icon: Video, description: "Videos, audio files, or presentations" },
];

export default function UploadPage() {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const form = useForm<UploadFormValues>({
    resolver: zodResolver(uploadFormSchema),
    defaultValues: {
      title: "",
      author: "",
      type: undefined,
      description: "",
      fileName: undefined,
      fileSize: undefined,
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (data: UploadFormValues) => {
      const response = await apiRequest("POST", "/api/resources", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/resources"] });
      setUploadSuccess(true);
      toast({
        title: "Upload Successful!",
        description: "Your resource has been added to the library.",
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message || "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      form.setValue("fileName", file.name);
      form.setValue("fileSize", formatFileSize(file.size));
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const onSubmit = (data: UploadFormValues) => {
    const cleanedData = {
      title: data.title,
      author: data.author,
      type: data.type,
      description: data.description,
      ...(data.fileName && data.fileName.trim() !== "" ? { fileName: data.fileName } : {}),
      ...(data.fileSize && data.fileSize.trim() !== "" ? { fileSize: data.fileSize } : {}),
    };
    uploadMutation.mutate(cleanedData as UploadFormValues);
  };

  const handleUploadAnother = () => {
    setUploadSuccess(false);
    setSelectedFile(null);
    form.reset();
  };

  if (uploadSuccess) {
    return (
      <Layout>
        <div className="py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="flex justify-center mb-6">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                    <CheckCircle2 className="h-10 w-10 text-green-600 dark:text-green-400" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold mb-2" data-testid="text-upload-success">
                  Upload Successful!
                </h2>
                <p className="text-muted-foreground mb-8">
                  Your resource has been added to the LRMS library and is now available for others to access.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={handleUploadAnother} variant="outline" data-testid="button-upload-another">
                    Upload Another Resource
                  </Button>
                  <Button asChild data-testid="button-view-resources">
                    <a href="/resources">View Resources</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl">
          <div className="mb-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2" data-testid="text-page-title">
              Upload Resource
            </h1>
            <p className="text-muted-foreground">
              Share your knowledge with the LRMS community
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Resource Details
              </CardTitle>
              <CardDescription>
                Fill in the information about the resource you're uploading
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter resource title" 
                            {...field} 
                            data-testid="input-title"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="author"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Author</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="Enter author name" 
                            {...field}
                            data-testid="input-author"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Resource Type</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-type">
                              <SelectValue placeholder="Select a resource type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {resourceTypes.map((type) => {
                              const info = resourceTypeInfo.find((r) => r.type === type);
                              const Icon = info?.icon || FileText;
                              return (
                                <SelectItem key={type} value={type} data-testid={`option-type-${type}`}>
                                  <div className="flex items-center gap-2">
                                    <Icon className="h-4 w-4" />
                                    <span>{categoryDisplayNames[type]}</span>
                                  </div>
                                </SelectItem>
                              );
                            })}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide a brief description of the resource"
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="textarea-description"
                          />
                        </FormControl>
                        <FormDescription>
                          Describe the content and purpose of this resource
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-2">
                    <Label htmlFor="file">File Upload</Label>
                    <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                      <input
                        type="file"
                        id="file"
                        onChange={handleFileChange}
                        className="hidden"
                        data-testid="input-file"
                      />
                      <label 
                        htmlFor="file" 
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                          <FileUp className="h-6 w-6 text-muted-foreground" />
                        </div>
                        {selectedFile ? (
                          <div>
                            <p className="font-medium">{selectedFile.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {formatFileSize(selectedFile.size)}
                            </p>
                          </div>
                        ) : (
                          <div>
                            <p className="font-medium">Click to upload a file</p>
                            <p className="text-sm text-muted-foreground">
                              PDF, EPUB, MP4, MP3, or PPTX
                            </p>
                          </div>
                        )}
                      </label>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      File upload is simulated for this demo
                    </p>
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full gap-2" 
                    size="lg"
                    disabled={uploadMutation.isPending}
                    data-testid="button-submit-upload"
                  >
                    {uploadMutation.isPending ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <Upload className="h-5 w-5" />
                        Upload Resource
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
}
