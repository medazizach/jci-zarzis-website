import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Users, Target, Globe, Sparkles, ChevronRight, X, MapPin, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const values = [
  {
    id: "leadership",
    icon: Users,
    title: "Leadership",
    description: "Former les leaders de demain à travers des expériences pratiques et du mentorat.",
  },
  {
    id: "impact",
    icon: Target,
    title: "Impact",
    description: "Des projets durables pour Zarzis créant un changement positif durable.",
  },
  {
    id: "network",
    icon: Globe,
    title: "Réseau",
    description: "Connexion avec des acteurs du changement dans plus de 100 pays.",
  },
];

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Animated gradient background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#130F2D] via-[#1a1640] to-[#0d0a1f]" />
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-primary/10 to-transparent rounded-full blur-2xl" />
        </div>

        {/* Grid pattern overlay */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 mb-8"
              data-testid="badge-hero-jci"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-white/90">Jeune Chambre Internationale Zarzis</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight mb-6"
              data-testid="text-hero-headline"
            >
              Développer les Leaders
              <span className="block bg-gradient-to-r from-primary via-primary/80 to-primary bg-clip-text text-transparent">
                pour un Monde en Évolution
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto mb-10 leading-relaxed"
              data-testid="text-hero-subheadline"
            >
              Bienvenue à JCI Zarzis. Nous sommes de jeunes citoyens actifs créant un changement positif dans notre communauté à travers le leadership, l'innovation et la collaboration.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link href="/projets">
                <Button
                  size="lg"
                  className="w-full sm:w-auto text-base px-8 bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-shadow"
                  data-testid="button-hero-projects"
                >
                  Nos Projets
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto text-base px-8 bg-white/5 backdrop-blur-sm border-white/20 text-white hover:bg-white/10"
                  data-testid="button-hero-member"
                >
                  Devenir Membre
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="grid grid-cols-3 gap-8 mt-20 pt-12 border-t border-white/10"
            >
              {[
                { value: "50+", label: "Membres Actifs", id: "members" },
                { value: "20+", label: "Projets", id: "projects" },
                { value: "10+", label: "Années", id: "years" },
              ].map((stat) => (
                <div key={stat.id} className="text-center" data-testid={`stat-${stat.id}`}>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent mb-1" data-testid={`text-stat-${stat.id}-value`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/50" data-testid={`text-stat-${stat.id}-label`}>
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          data-testid="indicator-scroll"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-1"
          >
            <div className="w-1.5 h-3 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-background relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Nos Valeurs
            </Badge>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-values-heading">
              Ce Qui Nous Anime
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group p-8 h-full bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5"
                  data-testid={`card-value-${value.id}`}
                >
                  <div className="mb-6">
                    <div className="w-14 h-14 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center group-hover:from-primary/30 group-hover:to-primary/10 transition-all duration-300">
                      <value.icon className="w-7 h-7 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-3" data-testid={`text-value-title-${value.id}`}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed" data-testid={`text-value-description-${value.id}`}>
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12"
          >
            <div>
              <Badge variant="outline" className="mb-4 text-primary border-primary/30">
                Projets Récents
              </Badge>
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight" data-testid="text-featured-projects-heading">
                Notre Impact
              </h2>
            </div>
            <Link href="/projets">
              <Button variant="outline" className="group" data-testid="button-view-all-projects">
                Voir tous les projets
                <ChevronRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.slice(0, 3).map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group overflow-hidden h-full border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl hover:shadow-primary/5 cursor-pointer"
                  data-testid={`card-project-${project.id}`}
                  onClick={() => setSelectedProject(project)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.imageUrl || `https://images.unsplash.com/photo-1559027615-cd4628902d4a?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      data-testid={`img-project-${project.id}`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
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
                  </div>
                  <div className="p-6">
                    {project.category && (
                      <span className="text-sm text-primary font-medium mb-2 block" data-testid={`text-project-category-${project.id}`}>
                        {project.category}
                      </span>
                    )}
                    <h3 
                      className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors"
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
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/10 via-background to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Prêt à Faire la Différence ?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Rejoignez notre communauté de jeunes leaders et participez à créer un impact positif à Zarzis.
            </p>
            <Link href="/contact">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80 shadow-lg shadow-primary/25" data-testid="button-cta-join">
                Rejoignez JCI Zarzis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </motion.div>
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
              data-testid="modal-project-home"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/70 transition-colors"
                data-testid="button-close-modal-home"
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
                
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4" data-testid="text-modal-title-home">
                  {selectedProject.title}
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6" data-testid="text-modal-description-home">
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
                      <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-modal-participate-home">
                        Participer
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" onClick={() => setSelectedProject(null)} data-testid="button-modal-close-home">
                    Fermer
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
