import { type Project, type InsertProject, type Contact, type InsertContact, type Event, type InsertEvent } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getProjects(): Promise<Project[]>;
  getProject(id: string): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: string, project: InsertProject): Promise<Project | undefined>;
  deleteProject(id: string): Promise<void>;
  
  getEvents(): Promise<Event[]>;
  getEvent(id: string): Promise<Event | undefined>;
  createEvent(event: InsertEvent): Promise<Event>;
  updateEvent(id: string, event: InsertEvent): Promise<Event | undefined>;
  deleteEvent(id: string): Promise<void>;
  
  createContact(contact: InsertContact): Promise<Contact>;
  getContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private projects: Map<string, Project>;
  private events: Map<string, Event>;
  private contacts: Map<string, Contact>;

  constructor() {
    this.projects = new Map();
    this.events = new Map();
    this.contacts = new Map();
    
    this.seedProjects();
    this.seedEvents();
  }

  private seedProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "School Renovation",
        description: "Renovating local schools to provide better learning environments for students in Zarzis. The project includes classroom repairs, new furniture, and educational materials.",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Education",
      },
      {
        title: "Startup Bootcamp",
        description: "A comprehensive entrepreneurship program helping young Tunisians launch their own businesses with mentorship, training, and funding opportunities.",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Entrepreneurship",
      },
      {
        title: "Beach Cleanup",
        description: "Environmental conservation initiative to clean and protect the beautiful beaches of Zarzis, promoting sustainability and community engagement.",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Environment",
      },
      {
        title: "Youth Leadership Camp",
        description: "An intensive summer program focused on developing leadership skills, public speaking, and project management for young people aged 18-30.",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1529390079861-591de354faf5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Leadership",
      },
      {
        title: "Digital Skills Training",
        description: "Free workshops teaching digital literacy, coding basics, and online business skills to help bridge the digital divide in our community.",
        status: "ongoing",
        imageUrl: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Technology",
      },
      {
        title: "Community Health Fair",
        description: "Annual health awareness event providing free medical checkups, health education, and wellness resources to the Zarzis community.",
        status: "completed",
        imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        category: "Health",
      },
    ];

    sampleProjects.forEach(project => {
      const id = randomUUID();
      this.projects.set(id, { 
        ...project, 
        id,
        imageUrl: project.imageUrl ?? null,
        category: project.category ?? null,
      });
    });
  }

  private seedEvents() {
    const sampleEvents: InsertEvent[] = [
      {
        title: "Réunion Mensuelle",
        description: "Réunion mensuelle des membres pour discuter des projets en cours et des initiatives futures.",
        date: "2026-01-05",
        time: "18:00",
        location: "Siège JCI Zarzis",
        category: "Réunion",
        imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        highlights: ["15 membres présents", "3 nouveaux projets approuvés", "Budget 2026 validé"],
        attendees: "15",
      },
      {
        title: "Atelier Leadership",
        description: "Formation intensive sur les compétences de leadership et la gestion d'équipe.",
        date: "2026-01-12",
        time: "09:00",
        location: "Centre Culturel de Zarzis",
        category: "Formation",
        imageUrl: "https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        highlights: ["20 participants formés", "Certificats distribués", "Partenariat avec l'université"],
        attendees: "20",
      },
      {
        title: "Journée Portes Ouvertes",
        description: "Venez découvrir JCI Zarzis et nos activités lors de notre journée portes ouvertes.",
        date: "2026-01-18",
        time: "10:00",
        location: "Maison des Jeunes Zarzis",
        category: "Networking",
        imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        highlights: ["50 visiteurs accueillis", "10 nouvelles inscriptions", "Médias présents"],
        attendees: "50",
      },
      {
        title: "Conférence Entrepreneuriat",
        description: "Conférence sur l'entrepreneuriat avec des témoignages d'entrepreneurs locaux réussis.",
        date: "2026-01-25",
        time: "14:00",
        location: "Hôtel Zarzis Beach",
        category: "Conférence",
        attendees: "80",
      },
      {
        title: "Action Environnementale",
        description: "Nettoyage de la plage et sensibilisation à l'environnement.",
        date: "2026-02-01",
        time: "08:00",
        location: "Plage de Sidi Salem",
        category: "Action Sociale",
        attendees: "40",
      },
      {
        title: "Gala Annuel JCI",
        description: "Soirée de gala célébrant nos réalisations de l'année et récompensant nos meilleurs membres.",
        date: "2026-02-15",
        time: "19:00",
        location: "Hôtel Sangho Zarzis",
        category: "Événement",
        attendees: "100",
      },
    ];

    sampleEvents.forEach(event => {
      const id = randomUUID();
      this.events.set(id, { 
        ...event, 
        id,
        category: event.category ?? null,
        imageUrl: event.imageUrl ?? null,
        highlights: event.highlights ?? null,
        attendees: event.attendees ?? null,
      });
    });
  }

  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }

  async getProject(id: string): Promise<Project | undefined> {
    return this.projects.get(id);
  }

  async createProject(insertProject: InsertProject): Promise<Project> {
    const id = randomUUID();
    const project: Project = { 
      ...insertProject, 
      id,
      imageUrl: insertProject.imageUrl ?? null,
      category: insertProject.category ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async updateProject(id: string, insertProject: InsertProject): Promise<Project | undefined> {
    if (!this.projects.has(id)) return undefined;
    const project: Project = { 
      ...insertProject, 
      id,
      imageUrl: insertProject.imageUrl ?? null,
      category: insertProject.category ?? null,
    };
    this.projects.set(id, project);
    return project;
  }

  async deleteProject(id: string): Promise<void> {
    this.projects.delete(id);
  }

  async getEvents(): Promise<Event[]> {
    return Array.from(this.events.values());
  }

  async getEvent(id: string): Promise<Event | undefined> {
    return this.events.get(id);
  }

  async createEvent(insertEvent: InsertEvent): Promise<Event> {
    const id = randomUUID();
    const event: Event = { 
      ...insertEvent, 
      id,
      category: insertEvent.category ?? null,
      imageUrl: insertEvent.imageUrl ?? null,
      highlights: insertEvent.highlights ?? null,
      attendees: insertEvent.attendees ?? null,
    };
    this.events.set(id, event);
    return event;
  }

  async updateEvent(id: string, insertEvent: InsertEvent): Promise<Event | undefined> {
    if (!this.events.has(id)) return undefined;
    const event: Event = { 
      ...insertEvent, 
      id,
      category: insertEvent.category ?? null,
      imageUrl: insertEvent.imageUrl ?? null,
      highlights: insertEvent.highlights ?? null,
      attendees: insertEvent.attendees ?? null,
    };
    this.events.set(id, event);
    return event;
  }

  async deleteEvent(id: string): Promise<void> {
    this.events.delete(id);
  }

  async createContact(insertContact: InsertContact): Promise<Contact> {
    const id = randomUUID();
    const contact: Contact = { 
      ...insertContact, 
      id,
      createdAt: new Date(),
    };
    this.contacts.set(id, contact);
    return contact;
  }

  async getContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }
}

export const storage = new MemStorage();
