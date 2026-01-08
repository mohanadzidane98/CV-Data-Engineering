import { Briefcase, Calendar, MapPin } from "lucide-react";

const experiences = [
  {
    title: "Data Integration Consultant",
    company: "OMP Partners / Orion",
    period: "Oct 2024 - Present",
    highlights: [
      "Led end-to-end data integration initiatives using OMP, enabling seamless data flow between SAP ERP and supply chain planning systems",
      "Designed and implemented integration workflows to support SCM solutions",
      "Monitored, troubleshot, and optimized integrations to ensure data accuracy, reliability, and performance",
    ],
  },
  {
    title: "Data Engineer",
    company: "Innotech Diamond LLC",
    period: "Dec 2023 - Oct 2024",
    highlights: [
      "Provided technical support for Informatica products, creating mappings to streamline data processing",
      "Utilized Informatica PowerCenter to integrate and govern data, improving data accuracy",
      "Managed databases including Oracle, SQL Server, and MySQL, optimizing query performance",
      "Executed data engineering projects for clients like CBE",
      "Delivered data engineering support to over 30 accounts in the MENA region",
    ],
  },
];

const ExperienceSection = () => {
  return (
    <section id="experience" className="py-24 relative">
      <div className="container relative z-10 px-4 md:px-6">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Professional <span className="text-gradient">Experience</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Building enterprise-grade data solutions across the MENA region
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />
            
            {experiences.map((exp, index) => (
              <div
                key={exp.title}
                className={`relative mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:pr-[50%] md:text-right" : "md:pl-[50%] md:text-left"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 rounded-full bg-primary shadow-glow md:-translate-x-1/2 -translate-y-1" />
                
                <div className={`ml-8 md:ml-0 ${index % 2 === 0 ? "md:mr-8" : "md:ml-8"}`}>
                  <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/30 transition-colors">
                    <div className={`flex flex-col gap-2 mb-4 ${index % 2 === 0 ? "md:items-end" : "md:items-start"}`}>
                      <h3 className="text-xl font-semibold text-gradient">{exp.title}</h3>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Briefcase className="w-4 h-4" />
                        <span>{exp.company}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                    </div>
                    
                    <ul className={`space-y-2 text-sm text-muted-foreground ${index % 2 === 0 ? "md:text-right" : "md:text-left"}`}>
                      {exp.highlights.map((highlight, i) => (
                        <li key={i} className="leading-relaxed">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
