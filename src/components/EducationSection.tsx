import { GraduationCap, Award, BookOpen } from "lucide-react";

const courses = [
  "Informatica Tutorial Beginner to Expert Level",
  "Data Analyst with Databricks - Datacamp",
  "FWD Data Analysis Nanodegree",
  "Database Fundamentals",
  "SQL Fundamentals",
  "Data Manipulation with SQL",
  "Data Visualization with Python",
  "Power BI Fundamentals",
];

const EducationSection = () => {
  return (
    <section id="education" className="py-24 relative">
      <div className="absolute inset-0 bg-glow opacity-20" />
      
      <div className="container relative z-10 px-4 md:px-6">
        <div className="space-y-4 text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold">
            Education & <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Continuous learning and professional development
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Education Card */}
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <GraduationCap className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Bachelor of Production Engineering</h3>
                <p className="text-muted-foreground">Alexandria University</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="w-4 h-4" />
                <span>2016 - 2021</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Integrated principles of manufacturing, quality control, and supply chain analytics 
                to streamline production processes, enhance product quality, and optimize supply chain efficiency.
              </p>
            </div>
          </div>
          
          {/* Courses Card */}
          <div className="p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-xl bg-primary/10 text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-semibold">Professional Courses</h3>
                <p className="text-muted-foreground">Continuous Learning</p>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-2 text-sm rounded-lg bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
