import { Link } from "wouter";
import { Facebook, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import logoImage from "@assets/JCI_Zarzis1_1768783627865.PNG";

const socialLinks = [
  { name: "Facebook", icon: Facebook, href: "https://www.facebook.com/jci.zarzis" },
  { name: "Instagram", icon: Instagram, href: "https://www.instagram.com/jci_zarzis_" },
  { name: "LinkedIn", icon: Linkedin, href: "https://www.linkedin.com/company/jci-zarzis" },
];

const quickLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Projets", href: "/projets" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-[#130F2D] via-[#1a1640] to-[#130F2D] text-white overflow-hidden" data-testid="footer">
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link 
              href="/"
              className="inline-block group"
              data-testid="link-footer-logo"
            >
              <img 
                src={logoImage} 
                alt="JCI Zarzis" 
                className="h-20 w-auto brightness-0 invert"
              />
            </Link>
            <p className="mt-4 text-white/70 leading-relaxed max-w-md" data-testid="text-footer-description">
              JCI Zarzis est une organisation à but non lucratif de jeunes citoyens actifs âgés de 18 à 40 ans, développant des compétences en leadership et créant un changement positif.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-md bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-primary transition-all duration-300 hover:scale-105"
                  aria-label={social.name}
                  data-testid={`link-social-${social.name.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="text-footer-quicklinks-heading">Liens Rapides</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-primary transition-colors inline-flex items-center gap-2 group"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/[àéè]/g, c => c === 'à' ? 'a' : 'e').replace(" ", "-")}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="text-footer-contact-heading">Contact</h3>
            <ul className="space-y-4 text-white/70">
              <li className="flex items-start gap-3" data-testid="text-footer-email">
                <Mail className="w-5 h-5 text-primary mt-0.5" />
                <a href="mailto:jeunechambrezarzis@gmail.com" className="hover:text-primary transition-colors">
                  jeunechambrezarzis@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3" data-testid="text-footer-address">
                <MapPin className="w-5 h-5 text-primary mt-0.5" />
                <span>Immeuble Majed<br />Rue Farhat Hached<br />4170 Zarzis, Tunisie</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-white/10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <p className="text-white/60 text-sm" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} JCI Zarzis. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  );
}
