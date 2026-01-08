import { Mail, Linkedin, Phone, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-glow opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl animate-float" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8 animate-slide-up">
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border bg-card/50 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Available for opportunities</span>
          </div>
          
          {/* Name and title */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Hi, I'm <span className="text-gradient">Mohanad Zidane</span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground font-light">
              Data Engineer & Integration Consultant
            </p>
          </div>
          
          {/* Summary */}
          <p className="max-w-2xl text-base md:text-lg text-muted-foreground leading-relaxed">
            Passionate about building robust data pipelines and integration solutions. 
            Experienced in ETL development, database management, and enterprise data integration 
            with SAP and OMP systems.
          </p>
          
          {/* Contact buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="gap-2 shadow-glow hover:shadow-none transition-shadow"
              asChild
            >
              <a href="mailto:mohanad.e.zidane@gmail.com">
                <Mail className="w-4 h-4" />
                Get in Touch
              </a>
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="gap-2"
              asChild
            >
              <a 
                href="https://linkedin.com/in/mohanad-zidane" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Linkedin className="w-4 h-4" />
                LinkedIn
              </a>
            </Button>
            
            <Button
              variant="ghost"
              size="lg"
              className="gap-2"
              asChild
            >
              <a href="tel:+201550646973">
                <Phone className="w-4 h-4" />
                +20 155 064 6973
              </a>
            </Button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <button 
          onClick={() => scrollToSection("skills")}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors cursor-pointer"
        >
          <span className="text-sm">Scroll to explore</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
