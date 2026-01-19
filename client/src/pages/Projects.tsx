import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowUpRight, Filter, X, MapPin, Calendar, Users } from "lucide-react";
import Layout from "@/components/Layout";
import type { Project } from "@shared/schema";
import { useState } from "react";

const categoryTranslations: Record<string, string> = {
  "Education": "Éducation",
  "Entrepreneurship": "Entrepreneuriat",
  "Environment": "Environnement",
  "Leadership": "Leadership",
  "Technology": "Technologie",
  "Health": "Santé",
};

export default function Projects() {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: projects = [], isLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  const categories = Array.from(new Set(projects.map(p => p.category).filter(Boolean)));
  
  const filteredProjects = filter 
    ? projects.filter(p => p.category === filter)
    : projects;

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Nos Projets
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-projects-heading">
              Notre Impact
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-projects-description">
              Découvrez comment nous faisons la différence à Zarzis à travers des initiatives communautaires et des projets de développement durable.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-background border-b border-border/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 overflow-x-auto pb-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="text-sm font-medium">Filtrer:</span>
            </div>
            <Button
              variant={filter === null ? "default" : "outline"}
              size="sm"
              onClick={() => setFilter(null)}
              className={filter === null ? "bg-gradient-to-r from-primary to-primary/80" : ""}
              data-testid="button-filter-all"
            >
              Tous
            </Button>
            {categories.map((category) => (
              <Button
                key={category}
                variant={filter === category ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(category)}
                className={filter === category ? "bg-gradient-to-r from-primary to-primary/80" : ""}
                data-testid={`button-filter-${category?.toLowerCase()}`}
              >
                {categoryTranslations[category || ""] || category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="animate-pulse" data-testid={`skeleton-project-${i}`}>
                  <div className="bg-muted rounded-md h-48 mb-4" />
                  <div className="bg-muted h-6 w-3/4 rounded mb-2" />
                  <div className="bg-muted h-4 w-full rounded" />
                </div>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card 
                    className="group overflow-hidden h-full border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                    onClick={() => setSelectedProject(project)}
                    data-testid={`card-project-${project.id}`}
                  >
                    {/* Image Container */}
                    <div className="relative h-56 overflow-hidden">
                      <img
                        src={project.imageUrl || `https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        data-testid={`img-project-${project.id}`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <Badge 
                          className={`${
                            project.status === "completed" 
                              ? "bg-green-500/90 text-white" 
                              : "bg-primary text-white"
                          }`}
                          data-testid={`badge-status-${project.id}`}
                        >
                          {project.status === "completed" ? "Terminé" : "En cours"}
                        </Badge>
                      </div>
                      
                      {/* Hover Arrow */}
                      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                        <div className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center">
                          <ArrowUpRight className="w-5 h-5 text-foreground" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-6">
                      {project.category && (
                        <span className="text-sm text-primary font-medium mb-2 block" data-testid={`text-project-category-${project.id}`}>
                          {categoryTranslations[project.category] || project.category}
                        </span>
                      )}
                      <h3 
                        className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors"
                        data-testid={`text-project-title-${project.id}`}
                      >
                        {project.title}
                      </h3>
                      <p 
                        className="text-muted-foreground leading-relaxed line-clamp-2"
                        data-testid={`text-project-description-${project.id}`}
                      >
                        {project.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {filteredProjects.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Aucun projet trouvé dans cette catégorie.</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedProject(null)}
          >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
            
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="relative bg-card rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
              data-testid="modal-project"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                data-testid="button-close-modal"
              >
                <X className="w-5 h-5" />
              </button>
              
              {/* Image */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedProject.imageUrl || `https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80`}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <Badge 
                    className={`${
                      selectedProject.status === "completed" 
                        ? "bg-green-500/90 text-white" 
                        : "bg-primary text-white"
                    }`}
                  >
                    {selectedProject.status === "completed" ? "Terminé" : "En cours"}
                  </Badge>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-6 sm:p-8">
                {selectedProject.category && (
                  <Badge variant="outline" className="mb-3 text-primary border-primary/30">
                    {categoryTranslations[selectedProject.category] || selectedProject.category}
                  </Badge>
                )}
                
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-modal-title">
                  {selectedProject.title}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-modal-description">
                  {selectedProject.description}
                </p>
                
                {/* Project Details */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-primary" />
                    <span>2024</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-primary" />
                    <span>Zarzis, Tunisie</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" />
                    <span>25+ bénévoles</span>
                  </div>
                </div>
                
                {/* CTA */}
                <div className="flex gap-3">
                  {selectedProject.status !== "completed" && (
                    <Link href="/contact">
                      <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-modal-participate">
                        Participer
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" onClick={() => setSelectedProject(null)} data-testid="button-modal-close">
                    Fermer
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Vous Avez une Idée de Projet ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Nous sommes toujours à la recherche de nouvelles initiatives pour améliorer notre communauté. Partagez votre idée avec nous !
            </p>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-propose-project">
                Proposer un Projet
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
