import { Mail, Linkedin, Phone, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 relative">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="space-y-4 mb-12">
            <h2 className="text-3xl md:text-4xl font-bold">
              Let's <span className="text-gradient">Connect</span>
            </h2>
            <p className="text-muted-foreground">
              I'm always open to discussing new opportunities, collaborations, or just having a chat about data engineering.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
            <a
              href="mailto:mohanad.e.zidane@gmail.com"
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Mail className="w-6 h-6" />
                </div>
                <span className="font-medium">Email</span>
                <span className="text-sm text-muted-foreground">mohanad.e.zidane@gmail.com</span>
              </div>
            </a>
            
            <a
              href="https://linkedin.com/in/mohanad-zidane"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Linkedin className="w-6 h-6" />
                </div>
                <span className="font-medium">LinkedIn</span>
                <span className="text-sm text-muted-foreground">Mohanad Zidane</span>
              </div>
            </a>
            
            <a
              href="tel:+201550646973"
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-300"
            >
              <div className="flex flex-col items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <Phone className="w-6 h-6" />
                </div>
                <span className="font-medium">Phone</span>
                <span className="text-sm text-muted-foreground">+20 155 064 6973</span>
              </div>
            </a>
          </div>
          
          <Button size="lg" className="gap-2 shadow-glow" asChild>
            <a href="mailto:mohanad.e.zidane@gmail.com">
              <Send className="w-4 h-4" />
              Send me a message
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
