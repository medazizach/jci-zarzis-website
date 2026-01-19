import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Send, CheckCircle, Clock, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Layout from "@/components/Layout";

const contactFormSchema = insertContactSchema.extend({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Veuillez entrer une adresse email valide"),
  message: z.string().min(10, "Le message doit contenir au moins 10 caractères"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "#" },
  { name: "Instagram", icon: Instagram, href: "#" },
  { name: "LinkedIn", icon: Linkedin, href: "#" },
];

export default function Contact() {
  const { toast } = useToast();
  const [submitted, setSubmitted] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const submitMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      setSubmitted(true);
      form.reset();
      toast({
        title: "Message envoyé !",
        description: "Nous vous répondrons dans les plus brefs délais.",
      });
    },
    onError: () => {
      toast({
        title: "Erreur",
        description: "Échec de l'envoi du message. Veuillez réessayer.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ContactFormData) => {
    submitMutation.mutate(data);
  };

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 overflow-hidden">
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
              Contact
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-6 tracking-tight" data-testid="text-contact-heading">
              Contactez-Nous
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8" data-testid="text-contact-description">
              Des questions ou envie de rejoindre JCI Zarzis ? Nous serions ravis de vous entendre. Envoyez-nous un message et nous vous répondrons dès que possible.
            </p>
            
            {/* Social Links - Top */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-foreground">Suivez-nous :</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.href}
                    className="w-10 h-10 rounded-md bg-primary/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 text-primary"
                    aria-label={social.name}
                    data-testid={`link-hero-social-${social.name.toLowerCase()}`}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 max-w-6xl mx-auto">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 space-y-6"
            >
              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-contact-email">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1" data-testid="text-contact-email-label">Email</h3>
                    <p className="text-muted-foreground text-sm" data-testid="text-contact-email-value">contact@jcizarzis.org</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-contact-phone">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1" data-testid="text-contact-phone-label">Téléphone</h3>
                    <p className="text-muted-foreground text-sm" data-testid="text-contact-phone-value">+216 75 XXX XXX</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-contact-location">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1" data-testid="text-contact-location-label">Adresse</h3>
                    <p className="text-muted-foreground text-sm" data-testid="text-contact-location-value">Zarzis, Médenine<br />Tunisie</p>
                  </div>
                </div>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-contact-hours">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-md bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Horaires</h3>
                    <p className="text-muted-foreground text-sm">Lun - Ven: 9h00 - 17h00<br />Sam: 10h00 - 14h00</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <Card className="p-8 bg-gradient-to-br from-card to-card/50 border border-border/50" data-testid="card-contact-form">
                {submitted ? (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-900/10 flex items-center justify-center mb-6">
                      <CheckCircle className="w-10 h-10 text-green-600 dark:text-green-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2" data-testid="text-success-title">Merci !</h3>
                    <p className="text-muted-foreground mb-6" data-testid="text-success-message">Votre message a été envoyé avec succès. Nous vous répondrons bientôt.</p>
                    <Button
                      variant="outline"
                      onClick={() => setSubmitted(false)}
                      data-testid="button-send-another"
                    >
                      Envoyer un autre message
                    </Button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold text-foreground mb-6">Envoyez-nous un Message</h2>
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                          <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Nom</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="Votre nom"
                                    {...field}
                                    data-testid="input-contact-name"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                  <Input
                                    type="email"
                                    placeholder="votre@email.com"
                                    {...field}
                                    data-testid="input-contact-email"
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <FormField
                          control={form.control}
                          name="message"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Message</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Dites-nous comment nous pouvons vous aider..."
                                  rows={6}
                                  {...field}
                                  data-testid="input-contact-message"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button 
                          type="submit" 
                          className="w-full sm:w-auto bg-gradient-to-r from-primary to-primary/80"
                          disabled={submitMutation.isPending}
                          data-testid="button-submit-contact"
                        >
                          {submitMutation.isPending ? (
                            "Envoi en cours..."
                          ) : (
                            <>
                              Envoyer le Message
                              <Send className="ml-2 w-4 h-4" />
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  </>
                )}
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6 tracking-tight">
              Où Nous Trouver
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Notre siège est situé au cœur de Zarzis. N'hésitez pas à nous rendre visite !
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="overflow-hidden border border-border/50">
              <div className="aspect-video bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <MapPin className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">JCI Zarzis</h3>
                  <p className="text-muted-foreground">Zarzis, Médenine, Tunisie</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-20 bg-gradient-to-br from-[#130F2D] via-[#1a1640] to-[#130F2D] text-white relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 tracking-tight">
              Prêt à Rejoindre Notre Équipe ?
            </h2>
            <p className="text-xl text-white/70 mb-8 leading-relaxed">
              Devenez membre de JCI Zarzis et participez à créer un impact positif dans notre communauté. Nous accueillons les jeunes de 18 à 40 ans motivés par le changement.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-primary/80" data-testid="button-become-member">
                Devenir Membre
              </Button>
              <Button size="lg" variant="outline" className="bg-white/5 border-white/20 text-white hover:bg-white/10" data-testid="button-learn-more">
                En Savoir Plus
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
