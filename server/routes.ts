import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertResourceSchema } from "@shared/schema";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/resources", async (req, res) => {
    try {
      const { type, q, sortBy } = req.query;
      
      if (q || sortBy) {
        const resources = await storage.searchResources(
          (q as string) || "",
          type as string,
          sortBy as string
        );
        return res.json(resources);
      }
      
      let resources;
      if (type && typeof type === "string") {
        resources = await storage.getResourcesByType(type);
      } else {
        resources = await storage.getAllResources();
      }
      
      res.json(resources);
    } catch (error) {
      console.error("Error fetching resources:", error);
      res.status(500).json({ message: "Failed to fetch resources" });
    }
  });

  app.get("/api/resources/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const resource = await storage.getResource(id);
      
      if (!resource) {
        return res.status(404).json({ message: "Resource not found" });
      }
      
      res.json(resource);
    } catch (error) {
      console.error("Error fetching resource:", error);
      res.status(500).json({ message: "Failed to fetch resource" });
    }
  });

  app.post("/api/resources", async (req, res) => {
    try {
      const validationResult = insertResourceSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({ 
          message: "Invalid resource data",
          errors: validationResult.error.flatten().fieldErrors
        });
      }
      
      const resource = await storage.createResource(validationResult.data);
      res.status(201).json(resource);
    } catch (error) {
      console.error("Error creating resource:", error);
      res.status(500).json({ message: "Failed to create resource" });
    }
  });

  app.post("/api/resources/:id/download", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.incrementDownloadCount(id);
      res.json({ message: "Download count incremented" });
    } catch (error) {
      console.error("Error incrementing download count:", error);
      res.status(500).json({ message: "Failed to increment download count" });
    }
  });

  return httpServer;
}
