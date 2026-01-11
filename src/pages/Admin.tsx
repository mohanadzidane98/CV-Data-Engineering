import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Json } from "@/integrations/supabase/types";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, Save, Loader2 } from "lucide-react";

interface HeroContent {
  name: string;
  title: string;
  description: string;
  email: string;
  phone: string;
  linkedin: string;
  github: string;
}

interface SkillCategory {
  title: string;
  skills: string[];
}

interface Job {
  title: string;
  company: string;
  location: string;
  period: string;
  achievements: string[];
}

interface Degree {
  degree: string;
  institution: string;
  location: string;
  period: string;
  details: string;
}

const Admin = () => {
  const { user, isAdmin, isLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<"hero" | "skills" | "experience" | "education">("hero");
  
  // Content states
  const [hero, setHero] = useState<HeroContent>({
    name: "",
    title: "",
    description: "",
    email: "",
    phone: "",
    linkedin: "",
    github: ""
  });
  
  const [skills, setSkills] = useState<SkillCategory[]>([]);
  const [experience, setExperience] = useState<Job[]>([]);
  const [education, setEducation] = useState<{ degrees: Degree[]; certifications: string[] }>({
    degrees: [],
    certifications: []
  });

  useEffect(() => {
    if (!isLoading && (!user || !isAdmin)) {
      navigate("/auth");
    }
  }, [user, isAdmin, isLoading, navigate]);

  useEffect(() => {
    if (isAdmin) {
      loadContent();
    }
  }, [isAdmin]);

  const loadContent = async () => {
    const { data, error } = await supabase
      .from("site_content")
      .select("section_key, content");

    if (error) {
      console.error("Error loading content:", error);
      return;
    }

    data?.forEach((item) => {
      const content = item.content as Record<string, unknown>;
      switch (item.section_key) {
        case "hero":
          setHero(content as unknown as HeroContent);
          break;
        case "skills":
          setSkills((content as { categories: SkillCategory[] }).categories || []);
          break;
        case "experience":
          setExperience((content as { jobs: Job[] }).jobs || []);
          break;
        case "education":
          setEducation(content as { degrees: Degree[]; certifications: string[] });
          break;
      }
    });
  };

  const saveContent = async (sectionKey: string, content: object) => {
    setIsSaving(true);
    
    const { error } = await supabase
      .from("site_content" as const)
      .update({ content: content as unknown as Json, updated_by: user?.id })
      .eq("section_key", sectionKey);

    setIsSaving(false);

    if (error) {
      toast({
        title: "Error saving",
        description: error.message,
        variant: "destructive",
      });
    } else {
      toast({ title: "Saved!", description: `${sectionKey} section updated successfully.` });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  const tabs = [
    { id: "hero", label: "Hero" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute inset-0 bg-glow opacity-20" />
      
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-20">
          <div className="container px-4 md:px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/")}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Site
              </button>
              <h1 className="text-xl font-semibold">
                <span className="text-gradient">Admin Panel</span>
              </h1>
            </div>
          </div>
        </header>

        <div className="container px-4 md:px-6 py-8">
          {/* Tabs */}
          <div className="flex gap-2 mb-8 flex-wrap">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Hero Editor */}
          {activeTab === "hero" && (
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-6">Edit Hero Section</h2>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Name</Label>
                  <Input
                    value={hero.name}
                    onChange={(e) => setHero({ ...hero, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input
                    value={hero.title}
                    onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label>Description</Label>
                  <Textarea
                    value={hero.description}
                    onChange={(e) => setHero({ ...hero, description: e.target.value })}
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Email</Label>
                  <Input
                    value={hero.email}
                    onChange={(e) => setHero({ ...hero, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Phone</Label>
                  <Input
                    value={hero.phone}
                    onChange={(e) => setHero({ ...hero, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>LinkedIn URL</Label>
                  <Input
                    value={hero.linkedin}
                    onChange={(e) => setHero({ ...hero, linkedin: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>GitHub URL</Label>
                  <Input
                    value={hero.github}
                    onChange={(e) => setHero({ ...hero, github: e.target.value })}
                  />
                </div>
              </div>
              <Button
                onClick={() => saveContent("hero", hero)}
                className="mt-6 gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Hero
              </Button>
            </div>
          )}

          {/* Skills Editor */}
          {activeTab === "skills" && (
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-6">Edit Skills</h2>
              <div className="space-y-6">
                {skills.map((category, catIndex) => (
                  <div key={catIndex} className="p-4 rounded-lg border border-border bg-background/50">
                    <div className="space-y-2 mb-4">
                      <Label>Category Title</Label>
                      <Input
                        value={category.title}
                        onChange={(e) => {
                          const newSkills = [...skills];
                          newSkills[catIndex].title = e.target.value;
                          setSkills(newSkills);
                        }}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Skills (comma-separated)</Label>
                      <Input
                        value={category.skills.join(", ")}
                        onChange={(e) => {
                          const newSkills = [...skills];
                          newSkills[catIndex].skills = e.target.value.split(",").map(s => s.trim()).filter(Boolean);
                          setSkills(newSkills);
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => saveContent("skills", { categories: skills })}
                className="mt-6 gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Skills
              </Button>
            </div>
          )}

          {/* Experience Editor */}
          {activeTab === "experience" && (
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-6">Edit Experience</h2>
              <div className="space-y-6">
                {experience.map((job, jobIndex) => (
                  <div key={jobIndex} className="p-4 rounded-lg border border-border bg-background/50">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Job Title</Label>
                        <Input
                          value={job.title}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[jobIndex].title = e.target.value;
                            setExperience(newExp);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company</Label>
                        <Input
                          value={job.company}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[jobIndex].company = e.target.value;
                            setExperience(newExp);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={job.location}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[jobIndex].location = e.target.value;
                            setExperience(newExp);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Period</Label>
                        <Input
                          value={job.period}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[jobIndex].period = e.target.value;
                            setExperience(newExp);
                          }}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Achievements (one per line)</Label>
                        <Textarea
                          value={job.achievements.join("\n")}
                          onChange={(e) => {
                            const newExp = [...experience];
                            newExp[jobIndex].achievements = e.target.value.split("\n").filter(Boolean);
                            setExperience(newExp);
                          }}
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                onClick={() => saveContent("experience", { jobs: experience })}
                className="mt-6 gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Experience
              </Button>
            </div>
          )}

          {/* Education Editor */}
          {activeTab === "education" && (
            <div className="p-6 rounded-xl border border-border bg-card/50 backdrop-blur-sm">
              <h2 className="text-lg font-semibold mb-6">Edit Education</h2>
              
              <div className="space-y-6">
                <h3 className="font-medium">Degrees</h3>
                {education.degrees.map((deg, degIndex) => (
                  <div key={degIndex} className="p-4 rounded-lg border border-border bg-background/50">
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Degree</Label>
                        <Input
                          value={deg.degree}
                          onChange={(e) => {
                            const newEdu = { ...education };
                            newEdu.degrees[degIndex].degree = e.target.value;
                            setEducation(newEdu);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Institution</Label>
                        <Input
                          value={deg.institution}
                          onChange={(e) => {
                            const newEdu = { ...education };
                            newEdu.degrees[degIndex].institution = e.target.value;
                            setEducation(newEdu);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Location</Label>
                        <Input
                          value={deg.location}
                          onChange={(e) => {
                            const newEdu = { ...education };
                            newEdu.degrees[degIndex].location = e.target.value;
                            setEducation(newEdu);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Period</Label>
                        <Input
                          value={deg.period}
                          onChange={(e) => {
                            const newEdu = { ...education };
                            newEdu.degrees[degIndex].period = e.target.value;
                            setEducation(newEdu);
                          }}
                        />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <Label>Details</Label>
                        <Input
                          value={deg.details}
                          onChange={(e) => {
                            const newEdu = { ...education };
                            newEdu.degrees[degIndex].details = e.target.value;
                            setEducation(newEdu);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
                
                <h3 className="font-medium mt-6">Certifications (one per line)</h3>
                <Textarea
                  value={education.certifications.join("\n")}
                  onChange={(e) => {
                    setEducation({
                      ...education,
                      certifications: e.target.value.split("\n").filter(Boolean)
                    });
                  }}
                  rows={4}
                />
              </div>
              
              <Button
                onClick={() => saveContent("education", education)}
                className="mt-6 gap-2"
                disabled={isSaving}
              >
                {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                Save Education
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
