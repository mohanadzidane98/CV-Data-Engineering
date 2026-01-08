import { Database, GitBranch, Server, Layers, BarChart3, Settings } from "lucide-react";

const skills = [
  {
    category: "Data Engineering",
    icon: Database,
    items: ["ETL Development", "Data Warehousing", "Data Modeling", "Data Integration"],
  },
  {
    category: "Integration",
    icon: GitBranch,
    items: ["SAP Integration", "OMP Integration", "ERP Systems", "API Development"],
  },
  {
    category: "Databases",
    icon: Server,
    items: ["Oracle", "SQL Server", "MySQL", "PostgreSQL"],
  },
  {
    category: "Tools & Platforms",
    icon: Layers,
    items: ["Informatica PowerCenter", "Databricks", "Power BI", "Python"],
  },
  {
    category: "Analytics",
    icon: BarChart3,
    items: ["Data Visualization", "SQL Analytics", "Business Intelligence", "Reporting"],
  },
  {
    category: "Soft Skills",
    icon: Settings,
    items: ["Team Collaboration", "Problem Solving", "Communication", "Self-motivated"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 relative">
      <div className="absolute inset-0 bg-glow opacity-30" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Skills & <span className="text-gradient">Expertise</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A comprehensive toolkit for building and managing enterprise data solutions
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <div
              key={skill.category}
              className="group p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm hover:border-primary/50 hover:shadow-glow transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <skill.icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-lg">{skill.category}</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {skill.items.map((item) => (
                  <span
                    key={item}
                    className="px-3 py-1 text-sm rounded-full bg-secondary text-secondary-foreground"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
