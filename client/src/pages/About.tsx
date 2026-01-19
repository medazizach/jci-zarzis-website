import { motion } from "framer-motion";
import { Users, Target, Globe, Award, Heart, Lightbulb, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import Layout from "@/components/Layout";

const values = [
  {
    id: "leadership",
    icon: Users,
    title: "Leadership",
    description: "Former les leaders de demain à travers des expériences pratiques, des ateliers et des programmes de mentorat qui renforcent la confiance et les compétences.",
  },
  {
    id: "impact",
    icon: Target,
    title: "Impact",
    description: "Des projets durables pour Zarzis. Nous nous concentrons sur des initiatives de développement communautaire créant un changement positif durable.",
  },
  {
    id: "network",
    icon: Globe,
    title: "Réseau",
    description: "Connexion avec des acteurs du changement dans le monde entier. Rejoignez une communauté mondiale de jeunes professionnels faisant la différence.",
  },
  {
    id: "excellence",
    icon: Award,
    title: "Excellence",
    description: "Nous visons l'excellence dans tout ce que nous faisons, en nous engageant à fournir des résultats de haute qualité dans nos projets et programmes.",
  },
  {
    id: "service",
    icon: Heart,
    title: "Service",
    description: "Le service aux autres est au cœur de notre mission. Nous croyons en le pouvoir du bénévolat pour transformer les communautés.",
  },
  {
    id: "innovation",
    icon: Lightbulb,
    title: "Innovation",
    description: "Nous encourageons la pensée créative et les solutions innovantes pour relever les défis de notre communauté.",
  },
];

const milestones = [
  { year: "2014", event: "Fondation de JCI Zarzis" },
  { year: "2016", event: "Premier projet majeur - Rénovation scolaire" },
  { year: "2018", event: "Lancement du programme de mentorat" },
  { year: "2020", event: "Expansion des initiatives environnementales" },
  { year: "2022", event: "50+ membres actifs atteints" },
  { year: "2024", event: "Nouveau siège et programmes élargis" },
];

export default function About() {
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
              À Propos
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-about-heading">
              Qui Sommes-Nous
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed" data-testid="text-about-description">
              JCI Zarzis est un chapitre local de Junior Chamber International, une organisation mondiale à but non lucratif de jeunes citoyens actifs âgés de 18 à 40 ans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-mission-heading">
                Notre Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                Offrir des opportunités de développement qui permettent aux jeunes de créer un changement positif. Nous croyons que les jeunes ont le pouvoir de transformer leurs communautés et le monde.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                À travers nos programmes de leadership, nos projets communautaires et notre réseau international, nous aidons nos membres à développer les compétences dont ils ont besoin pour devenir les leaders de demain.
              </p>
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-about-join">
                  Rejoignez-nous
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-square rounded-md overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                  alt="Équipe JCI Zarzis"
                  className="w-full h-full object-cover"
                  data-testid="img-about-team"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-48 h-48 bg-gradient-to-br from-primary to-primary/70 rounded-md flex items-center justify-center p-6 text-white">
                <div className="text-center">
                  <div className="text-4xl font-bold">10+</div>
                  <div className="text-sm opacity-90">Années d'impact</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
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
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-values-section-heading">
              Ce Qui Nous Guide
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Nos valeurs fondamentales définissent qui nous sommes et comment nous travaillons ensemble pour créer un impact positif.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card 
                  className="group p-6 h-full bg-gradient-to-br from-card to-card/50 border border-border/50 hover:border-primary/30 transition-all duration-500"
                  data-testid={`card-value-${value.id}`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-foreground mb-2" data-testid={`text-value-title-${value.id}`}>
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed" data-testid={`text-value-desc-${value.id}`}>
                    {value.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30">
              Notre Histoire
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-timeline-heading">
              Notre Parcours
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-white font-bold text-sm">
                    {milestone.year.slice(2)}
                  </div>
                  {index !== milestones.length - 1 && (
                    <div className="w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent mt-2" />
                  )}
                </div>
                <div className="flex-1 pb-8">
                  <div className="text-sm text-primary font-medium mb-1">{milestone.year}</div>
                  <div className="text-lg font-semibold text-foreground" data-testid={`text-milestone-${milestone.year}`}>
                    {milestone.event}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Global Network */}
      <section className="py-20 bg-gradient-to-br from-[#130F2D] via-[#1a1640] to-[#130F2D] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <Badge variant="outline" className="mb-4 text-primary border-primary/30 bg-white/5">
              Réseau Mondial
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 tracking-tight" data-testid="text-network-heading">
              Partie d'une Communauté Mondiale
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { value: "200K+", label: "Membres" },
                { value: "100+", label: "Pays" },
                { value: "5000+", label: "Communautés" },
                { value: "75+", label: "Années" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent mb-2">
                    {stat.value}
                  </div>
                  <div className="text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
