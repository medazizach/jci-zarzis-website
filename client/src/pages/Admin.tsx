import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Plus, Pencil, Trash2, LogOut, FolderKanban, CalendarDays, X, Loader2, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import type { Project, Event, InsertProject, InsertEvent } from "@shared/schema";

type TabType = "projects" | "events";

const projectCategories = ["Education", "Entrepreneurship", "Environment", "Leadership", "Technology", "Health"];
const eventCategories = ["Réunion", "Formation", "Conférence", "Networking", "Action Sociale", "Événement"];

export default function Admin() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { data: authStatus, isLoading: authLoading, refetch: refetchAuth } = useQuery<{ isAuthenticated: boolean }>({
    queryKey: ["/api/admin/status"],
  });

  const isAuthenticated = authStatus?.isAuthenticated ?? false;

  const [projectForm, setProjectForm] = useState<InsertProject>({
    title: "",
    description: "",
    status: "ongoing",
    imageUrl: "",
    category: "",
  });

  const [eventForm, setEventForm] = useState<InsertEvent>({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    category: "",
    imageUrl: "",
    highlights: [],
    attendees: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      if (response.ok) {
        await refetchAuth();
        toast({ title: "Succès", description: "Connexion réussie" });
      } else {
        toast({ title: "Erreur", description: "Mot de passe incorrect", variant: "destructive" });
      }
    } catch {
      toast({ title: "Erreur", description: "Erreur de connexion", variant: "destructive" });
    } finally {
      setIsLoggingIn(false);
      setPassword("");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/logout", { method: "POST" });
    await refetchAuth();
    toast({ title: "Déconnexion", description: "Vous êtes déconnecté" });
  };

  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
    enabled: isAuthenticated,
  });

  const { data: events = [], isLoading: eventsLoading } = useQuery<Event[]>({
    queryKey: ["/api/events"],
    enabled: isAuthenticated,
  });

  const createProjectMutation = useMutation({
    mutationFn: (data: InsertProject) => apiRequest("POST", "/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setShowProjectForm(false);
      resetProjectForm();
      toast({ title: "Succès", description: "Projet créé avec succès" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la création", variant: "destructive" }),
  });

  const updateProjectMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertProject }) => apiRequest("PUT", `/api/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      setShowProjectForm(false);
      setEditingProject(null);
      resetProjectForm();
      toast({ title: "Succès", description: "Projet modifié avec succès" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la modification", variant: "destructive" }),
  });

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({ title: "Succès", description: "Projet supprimé" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la suppression", variant: "destructive" }),
  });

  const createEventMutation = useMutation({
    mutationFn: (data: InsertEvent) => apiRequest("POST", "/api/events", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setShowEventForm(false);
      resetEventForm();
      toast({ title: "Succès", description: "Événement créé avec succès" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la création", variant: "destructive" }),
  });

  const updateEventMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: InsertEvent }) => apiRequest("PUT", `/api/events/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      setShowEventForm(false);
      setEditingEvent(null);
      resetEventForm();
      toast({ title: "Succès", description: "Événement modifié avec succès" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la modification", variant: "destructive" }),
  });

  const deleteEventMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/events/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/events"] });
      toast({ title: "Succès", description: "Événement supprimé" });
    },
    onError: () => toast({ title: "Erreur", description: "Échec de la suppression", variant: "destructive" }),
  });

  const resetProjectForm = () => {
    setProjectForm({ title: "", description: "", status: "ongoing", imageUrl: "", category: "" });
  };

  const resetEventForm = () => {
    setEventForm({ title: "", description: "", date: "", time: "", location: "", category: "", imageUrl: "", highlights: [], attendees: "" });
  };

  const handleEditProject = (project: Project) => {
    setEditingProject(project);
    setProjectForm({
      title: project.title,
      description: project.description,
      status: project.status,
      imageUrl: project.imageUrl || "",
      category: project.category || "",
    });
    setShowProjectForm(true);
  };

  const handleEditEvent = (event: Event) => {
    setEditingEvent(event);
    setEventForm({
      title: event.title,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      category: event.category || "",
      imageUrl: event.imageUrl || "",
      highlights: event.highlights || [],
      attendees: event.attendees || "",
    });
    setShowEventForm(true);
  };

  const handleProjectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProject) {
      updateProjectMutation.mutate({ id: editingProject.id, data: projectForm });
    } else {
      createProjectMutation.mutate(projectForm);
    }
  };

  const handleEventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      updateEventMutation.mutate({ id: editingEvent.id, data: eventForm });
    } else {
      createEventMutation.mutate(eventForm);
    }
  };

  if (authLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return (
      <Layout>
        <section className="min-h-screen flex items-center justify-center py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md px-4"
          >
            <Card className="p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-2xl font-bold text-foreground" data-testid="text-login-title">Administration</h1>
                <p className="text-muted-foreground mt-2">Entrez le mot de passe pour accéder au tableau de bord</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mot de passe"
                    required
                    data-testid="input-password"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-primary to-primary/80"
                  disabled={isLoggingIn}
                  data-testid="button-login"
                >
                  {isLoggingIn && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  Se connecter
                </Button>
              </form>
            </Card>
          </motion.div>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <section className="pt-24 pb-8 bg-gradient-to-br from-primary/5 via-background to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <Badge variant="outline" className="mb-2 text-primary border-primary/30">Administration</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold text-foreground" data-testid="text-admin-title">
                Tableau de Bord
              </h1>
            </div>
            <Button variant="outline" onClick={handleLogout} data-testid="button-logout">
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </div>
      </section>

      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 mb-8">
            <Button
              variant={activeTab === "projects" ? "default" : "outline"}
              onClick={() => setActiveTab("projects")}
              className={activeTab === "projects" ? "bg-gradient-to-r from-primary to-primary/80" : ""}
              data-testid="button-tab-projects"
            >
              <FolderKanban className="w-4 h-4 mr-2" />
              Projets ({projects.length})
            </Button>
            <Button
              variant={activeTab === "events" ? "default" : "outline"}
              onClick={() => setActiveTab("events")}
              className={activeTab === "events" ? "bg-gradient-to-r from-primary to-primary/80" : ""}
              data-testid="button-tab-events"
            >
              <CalendarDays className="w-4 h-4 mr-2" />
              Événements ({events.length})
            </Button>
          </div>

          {activeTab === "projects" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion des Projets</h2>
                <Button
                  onClick={() => { setEditingProject(null); resetProjectForm(); setShowProjectForm(true); }}
                  className="bg-gradient-to-r from-primary to-primary/80"
                  data-testid="button-add-project"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau Projet
                </Button>
              </div>

              {projectsLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid gap-4">
                  {projects.map((project) => (
                    <Card key={project.id} className="p-4" data-testid={`card-admin-project-${project.id}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {project.imageUrl && (
                          <img src={project.imageUrl} alt={project.title} className="w-full sm:w-32 h-24 object-cover rounded-md" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-lg">{project.title}</h3>
                              <div className="flex gap-2 mt-1">
                                <Badge className={project.status === "completed" ? "bg-green-500/90" : "bg-primary"}>
                                  {project.status === "completed" ? "Terminé" : "En cours"}
                                </Badge>
                                {project.category && <Badge variant="outline">{project.category}</Badge>}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" onClick={() => handleEditProject(project)} data-testid={`button-edit-project-${project.id}`}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="outline" className="text-destructive" onClick={() => deleteProjectMutation.mutate(project.id)} data-testid={`button-delete-project-${project.id}`}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{project.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === "events" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Gestion des Événements</h2>
                <Button
                  onClick={() => { setEditingEvent(null); resetEventForm(); setShowEventForm(true); }}
                  className="bg-gradient-to-r from-primary to-primary/80"
                  data-testid="button-add-event"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Nouvel Événement
                </Button>
              </div>

              {eventsLoading ? (
                <div className="flex justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>
              ) : (
                <div className="grid gap-4">
                  {events.map((event) => (
                    <Card key={event.id} className="p-4" data-testid={`card-admin-event-${event.id}`}>
                      <div className="flex flex-col sm:flex-row gap-4">
                        {event.imageUrl && (
                          <img src={event.imageUrl} alt={event.title} className="w-full sm:w-32 h-24 object-cover rounded-md" />
                        )}
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h3 className="font-bold text-lg">{event.title}</h3>
                              <div className="flex gap-2 mt-1 flex-wrap">
                                <Badge variant="outline">{event.date}</Badge>
                                <Badge variant="outline">{event.time}</Badge>
                                {event.category && <Badge className="bg-primary">{event.category}</Badge>}
                              </div>
                              <p className="text-muted-foreground text-sm mt-1">{event.location}</p>
                            </div>
                            <div className="flex gap-2">
                              <Button size="icon" variant="outline" onClick={() => handleEditEvent(event)} data-testid={`button-edit-event-${event.id}`}>
                                <Pencil className="w-4 h-4" />
                              </Button>
                              <Button size="icon" variant="outline" className="text-destructive" onClick={() => deleteEventMutation.mutate(event.id)} data-testid={`button-delete-event-${event.id}`}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">{event.description}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>

      {showProjectForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => { setShowProjectForm(false); setEditingProject(null); }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card rounded-md shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-project-form"
          >
            <button onClick={() => { setShowProjectForm(false); setEditingProject(null); }} className="absolute top-4 right-4" data-testid="button-close-project-form">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{editingProject ? "Modifier le Projet" : "Nouveau Projet"}</h2>
            <form onSubmit={handleProjectSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titre *</label>
                <Input value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} required data-testid="input-project-title" />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} required data-testid="input-project-description" />
              </div>
              <div>
                <label className="text-sm font-medium">Statut *</label>
                <Select value={projectForm.status} onValueChange={(value) => setProjectForm({ ...projectForm, status: value })}>
                  <SelectTrigger data-testid="select-project-status"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ongoing">En cours</SelectItem>
                    <SelectItem value="completed">Terminé</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Catégorie</label>
                <Select value={projectForm.category || ""} onValueChange={(value) => setProjectForm({ ...projectForm, category: value })}>
                  <SelectTrigger data-testid="select-project-category"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {projectCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">URL Image</label>
                <Input value={projectForm.imageUrl || ""} onChange={(e) => setProjectForm({ ...projectForm, imageUrl: e.target.value })} placeholder="https://..." data-testid="input-project-image" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/80" disabled={createProjectMutation.isPending || updateProjectMutation.isPending} data-testid="button-submit-project">
                  {(createProjectMutation.isPending || updateProjectMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingProject ? "Modifier" : "Créer"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowProjectForm(false); setEditingProject(null); }}>Annuler</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}

      {showEventForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => { setShowEventForm(false); setEditingEvent(null); }}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative bg-card rounded-md shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto p-6"
            onClick={(e) => e.stopPropagation()}
            data-testid="modal-event-form"
          >
            <button onClick={() => { setShowEventForm(false); setEditingEvent(null); }} className="absolute top-4 right-4" data-testid="button-close-event-form">
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-xl font-bold mb-4">{editingEvent ? "Modifier l'Événement" : "Nouvel Événement"}</h2>
            <form onSubmit={handleEventSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium">Titre *</label>
                <Input value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} required data-testid="input-event-title" />
              </div>
              <div>
                <label className="text-sm font-medium">Description *</label>
                <Textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} required data-testid="input-event-description" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Date *</label>
                  <Input type="date" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} required data-testid="input-event-date" />
                </div>
                <div>
                  <label className="text-sm font-medium">Heure *</label>
                  <Input value={eventForm.time} onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })} placeholder="14:00" required data-testid="input-event-time" />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium">Lieu *</label>
                <Input value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} required data-testid="input-event-location" />
              </div>
              <div>
                <label className="text-sm font-medium">Catégorie</label>
                <Select value={eventForm.category || ""} onValueChange={(value) => setEventForm({ ...eventForm, category: value })}>
                  <SelectTrigger data-testid="select-event-category"><SelectValue placeholder="Sélectionner" /></SelectTrigger>
                  <SelectContent>
                    {eventCategories.map((cat) => <SelectItem key={cat} value={cat}>{cat}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Nombre de participants</label>
                <Input value={eventForm.attendees || ""} onChange={(e) => setEventForm({ ...eventForm, attendees: e.target.value })} placeholder="50" data-testid="input-event-attendees" />
              </div>
              <div>
                <label className="text-sm font-medium">URL Image</label>
                <Input value={eventForm.imageUrl || ""} onChange={(e) => setEventForm({ ...eventForm, imageUrl: e.target.value })} placeholder="https://..." data-testid="input-event-image" />
              </div>
              <div className="flex gap-3 pt-4">
                <Button type="submit" className="flex-1 bg-gradient-to-r from-primary to-primary/80" disabled={createEventMutation.isPending || updateEventMutation.isPending} data-testid="button-submit-event">
                  {(createEventMutation.isPending || updateEventMutation.isPending) && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                  {editingEvent ? "Modifier" : "Créer"}
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowEventForm(false); setEditingEvent(null); }}>Annuler</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </Layout>
  );
}
