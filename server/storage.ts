import { type Resource, type InsertResource } from "@shared/schema";
import { db } from "./firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  doc,
  query,
  where,
  orderBy,
  Timestamp,
} from "firebase/firestore";

export interface IStorage {
  getAllResources(): Promise<Resource[]>;
  getResourcesByType(type: string): Promise<Resource[]>;
  getResource(id: string): Promise<Resource | undefined>;
  createResource(resource: InsertResource): Promise<Resource>;
  incrementDownloadCount(id: string): Promise<void>;
  searchResources(query: string, type?: string, sortBy?: string): Promise<Resource[]>;
}

const sampleResources: Array<Omit<Resource, "id" | "createdAt">> = [
  {
    title: "Introduction to Computer Science",
    author: "Dr. John Smith",
    type: "ebook",
    description: "A comprehensive introduction to the fundamentals of computer science, covering algorithms, data structures, and programming concepts.",
    fileName: "intro-cs.pdf",
    fileSize: "2.5 MB",
    fileUrl: null,
    downloadCount: 1234,
    tags: ["computer science", "programming", "algorithms"],
  },
  {
    title: "Advanced Mathematics for Engineers",
    author: "Prof. Maria Garcia",
    type: "ebook",
    description: "Advanced mathematical concepts essential for engineering students, including calculus, linear algebra, and differential equations.",
    fileName: "adv-math.pdf",
    fileSize: "4.2 MB",
    fileUrl: null,
    downloadCount: 856,
    tags: ["mathematics", "engineering", "calculus"],
  },
  {
    title: "Data Structures and Algorithms",
    author: "Dr. Alan Chen",
    type: "lecture-notes",
    description: "Comprehensive lecture notes covering fundamental data structures including arrays, linked lists, trees, graphs, and common algorithms.",
    fileName: "dsa-notes.pdf",
    fileSize: "1.8 MB",
    fileUrl: null,
    downloadCount: 2341,
    tags: ["data structures", "algorithms", "programming"],
  },
  {
    title: "Operating Systems Concepts",
    author: "Dr. Sarah Williams",
    type: "lecture-notes",
    description: "Detailed notes on operating system concepts including process management, memory management, and file systems.",
    fileName: "os-notes.pdf",
    fileSize: "3.1 MB",
    fileUrl: null,
    downloadCount: 1567,
    tags: ["operating systems", "computer science"],
  },
  {
    title: "Machine Learning in Healthcare",
    author: "Dr. Emily Johnson",
    type: "research-paper",
    description: "A groundbreaking research paper exploring the applications of machine learning algorithms in healthcare diagnostics and treatment planning.",
    fileName: "ml-healthcare.pdf",
    fileSize: "892 KB",
    fileUrl: null,
    downloadCount: 432,
    tags: ["machine learning", "healthcare", "AI"],
  },
  {
    title: "Quantum Computing Fundamentals",
    author: "Prof. Robert Zhang",
    type: "research-paper",
    description: "An exploration of quantum computing principles, qubits, quantum gates, and their potential applications in cryptography.",
    fileName: "quantum-computing.pdf",
    fileSize: "1.2 MB",
    fileUrl: null,
    downloadCount: 678,
    tags: ["quantum computing", "physics", "cryptography"],
  },
  {
    title: "Web Development Masterclass",
    author: "Sarah Tech Academy",
    type: "multimedia",
    description: "A comprehensive video course covering HTML, CSS, JavaScript, React, and modern web development practices.",
    fileName: "webdev-course.mp4",
    fileSize: "2.1 GB",
    fileUrl: null,
    downloadCount: 3456,
    tags: ["web development", "javascript", "react"],
  },
  {
    title: "Database Design Principles",
    author: "Prof. Michael Brown",
    type: "multimedia",
    description: "Audio lectures explaining relational database design, normalization, SQL queries, and database optimization techniques.",
    fileName: "db-lectures.mp3",
    fileSize: "456 MB",
    fileUrl: null,
    downloadCount: 892,
    tags: ["database", "SQL", "design"],
  },
  {
    title: "Artificial Intelligence: A Modern Approach",
    author: "Stuart Russell & Peter Norvig",
    type: "ebook",
    description: "The definitive guide to artificial intelligence, covering search algorithms, knowledge representation, machine learning, and more.",
    fileName: "ai-modern-approach.pdf",
    fileSize: "8.5 MB",
    fileUrl: null,
    downloadCount: 4521,
    tags: ["artificial intelligence", "machine learning", "algorithms"],
  },
  {
    title: "Software Engineering Best Practices",
    author: "Dr. Lisa Anderson",
    type: "lecture-notes",
    description: "Lecture notes covering software development methodologies, testing, version control, and project management techniques.",
    fileName: "se-practices.pdf",
    fileSize: "2.3 MB",
    fileUrl: null,
    downloadCount: 1892,
    tags: ["software engineering", "testing", "agile"],
  },
  {
    title: "Climate Change Impact Analysis",
    author: "Environmental Research Group",
    type: "research-paper",
    description: "A comprehensive study analyzing the environmental and economic impacts of climate change on global ecosystems.",
    fileName: "climate-analysis.pdf",
    fileSize: "1.5 MB",
    fileUrl: null,
    downloadCount: 567,
    tags: ["climate change", "environment", "research"],
  },
  {
    title: "Python Programming for Data Science",
    author: "Code Academy Pro",
    type: "multimedia",
    description: "Video tutorial series teaching Python programming with focus on data analysis, pandas, numpy, and visualization libraries.",
    fileName: "python-ds.mp4",
    fileSize: "1.8 GB",
    fileUrl: null,
    downloadCount: 2789,
    tags: ["python", "data science", "programming"],
  },
];

export class FirestoreStorage implements IStorage {
  private collectionName = "resources";

  async getAllResources(): Promise<Resource[]> {
    const q = query(
      collection(db, this.collectionName),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
    })) as Resource[];
  }

  async getResourcesByType(type: string): Promise<Resource[]> {
    const q = query(
      collection(db, this.collectionName),
      where("type", "==", type),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate(),
    })) as Resource[];
  }

  async getResource(id: string): Promise<Resource | undefined> {
    const docRef = doc(db, this.collectionName, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return undefined;
    }

    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: (data.createdAt as Timestamp).toDate(),
    } as Resource;
  }

  async createResource(insertResource: InsertResource): Promise<Resource> {
    const docRef = await addDoc(collection(db, this.collectionName), {
      ...insertResource,
      downloadCount: insertResource.downloadCount ?? 0,
      createdAt: Timestamp.now(),
    });

    const docSnap = await getDoc(docRef);
    const data = docSnap.data();

    return {
      id: docSnap.id,
      ...data,
      createdAt: (data?.createdAt as Timestamp).toDate(),
    } as Resource;
  }

  async incrementDownloadCount(id: string): Promise<void> {
    const docRef = doc(db, this.collectionName, id);
    await updateDoc(docRef, {
      downloadCount: (await getDoc(docRef)).data()?.downloadCount + 1 || 1,
    });
  }

  async searchResources(
    queryText: string,
    type?: string,
    sortBy?: string
  ): Promise<Resource[]> {
    let q;

    if (type && type !== "all") {
      q = query(
        collection(db, this.collectionName),
        where("type", "==", type),
        orderBy("createdAt", "desc")
      );
    } else {
      q = query(
        collection(db, this.collectionName),
        orderBy("createdAt", "desc")
      );
    }

    let snapshot = await getDocs(q);
    let results = snapshot.docs
      .map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp).toDate(),
      }))
      .filter(
        (resource) =>
          !queryText ||
          resource.title.toLowerCase().includes(queryText.toLowerCase()) ||
          resource.author.toLowerCase().includes(queryText.toLowerCase()) ||
          resource.description
            .toLowerCase()
            .includes(queryText.toLowerCase())
      ) as Resource[];

    switch (sortBy) {
      case "downloads":
        results.sort((a, b) => (b.downloadCount || 0) - (a.downloadCount || 0));
        break;
      case "title":
        results.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "author":
        results.sort((a, b) => a.author.localeCompare(b.author));
        break;
      case "newest":
      default:
        results.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }

    return results;
  }

  async seedSampleResources(): Promise<void> {
    const q = query(collection(db, this.collectionName));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      for (const resource of sampleResources) {
        await addDoc(collection(db, this.collectionName), {
          ...resource,
          downloadCount: resource.downloadCount || 0,
          createdAt: Timestamp.now(),
        });
      }
      console.log("Seeded sample resources to Firestore");
    }
  }
}

export const storage = new FirestoreStorage();
