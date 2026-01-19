import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from "@assets/JCI_Zarzis1_1768783627865.PNG";

const navLinks = [
  { name: "Accueil", href: "/" },
  { name: "À propos", href: "/a-propos" },
  { name: "Projets", href: "/projets" },
  { name: "Événements", href: "/evenements" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between bg-white/95 dark:bg-card/95 backdrop-blur-lg rounded-2xl px-6 py-3 shadow-lg shadow-black/5 border border-border/50">
          {/* Logo */}
          <Link 
            href="/"
            className="shrink-0"
            data-testid="link-logo"
          >
            <img 
              src={logoImage} 
              alt="JCI Zarzis" 
              className="h-11 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    isActive 
                      ? "text-primary" 
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-testid={`link-nav-${link.name.toLowerCase().replace(/[àéè]/g, c => c === 'à' ? 'a' : 'e').replace(" ", "-")}`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block shrink-0">
            <Link href="/contact">
              <Button 
                className="rounded-xl"
                data-testid="button-join-us"
              >
                Rejoignez-nous
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-2"
            >
              <div className="bg-white/95 dark:bg-card/95 backdrop-blur-lg rounded-2xl p-4 shadow-lg border border-border/50 space-y-1">
                {navLinks.map((link) => {
                  const isActive = location === link.href;
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                        isActive 
                          ? "text-primary bg-primary/10" 
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                      data-testid={`link-mobile-nav-${link.name.toLowerCase().replace(/[àéè]/g, c => c === 'à' ? 'a' : 'e').replace(" ", "-")}`}
                    >
                      {link.name}
                    </Link>
                  );
                })}
                <div className="pt-2">
                  <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
                    <Button 
                      className="w-full rounded-xl"
                      data-testid="button-mobile-join-us"
                    >
                      Rejoignez-nous
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
