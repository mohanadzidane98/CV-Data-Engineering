-- Create enum for user roles
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles (prevents recursive RLS)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- RLS policy for user_roles: users can view their own roles
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Create site_content table to store editable content
CREATE TABLE public.site_content (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    section_key TEXT NOT NULL UNIQUE,
    content JSONB NOT NULL DEFAULT '{}',
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Enable RLS on site_content
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Everyone can read site content (public portfolio)
CREATE POLICY "Anyone can read site content"
ON public.site_content
FOR SELECT
USING (true);

-- Only admins can update site content
CREATE POLICY "Admins can update site content"
ON public.site_content
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can insert site content
CREATE POLICY "Admins can insert site content"
ON public.site_content
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete site content
CREATE POLICY "Admins can delete site content"
ON public.site_content
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Trigger to update updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_site_content_updated_at
BEFORE UPDATE ON public.site_content
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert default content for all sections
INSERT INTO public.site_content (section_key, content) VALUES
('hero', '{
  "name": "Mohanad Zidane",
  "title": "Data Engineer",
  "description": "Experienced Data Engineer with 5+ years of expertise in designing, building, and optimizing large-scale data pipelines and cloud-based data platforms. Proven track record of delivering end-to-end data solutions that drive business insights and operational efficiency.",
  "email": "mohanad.a.zidane@gmail.com",
  "phone": "+20 1024330933",
  "linkedin": "https://linkedin.com/in/mohanadzidane",
  "github": "https://github.com/mohanadzidane"
}'::jsonb),
('skills', '{
  "categories": [
    {
      "title": "Data Engineering",
      "skills": ["Apache Spark", "Apache Kafka", "Apache Airflow", "dbt", "Fivetran", "ETL/ELT Pipelines"]
    },
    {
      "title": "Cloud Platforms",
      "skills": ["AWS (Redshift, Glue, S3, Lambda, EMR)", "Azure (Data Factory, Synapse, Databricks)", "GCP (BigQuery, Dataflow, Pub/Sub)"]
    },
    {
      "title": "Programming",
      "skills": ["Python", "SQL", "Scala", "PySpark", "Bash"]
    },
    {
      "title": "Databases",
      "skills": ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Snowflake", "Delta Lake"]
    },
    {
      "title": "Tools & DevOps",
      "skills": ["Docker", "Kubernetes", "Terraform", "Git", "CI/CD", "Jenkins"]
    },
    {
      "title": "Data Visualization",
      "skills": ["Tableau", "Power BI", "Looker", "Metabase"]
    }
  ]
}'::jsonb),
('experience', '{
  "jobs": [
    {
      "title": "Senior Data Engineer",
      "company": "Vodafone Egypt",
      "location": "Cairo, Egypt",
      "period": "2022 - Present",
      "achievements": [
        "Led the design and implementation of a real-time data streaming platform using Apache Kafka and Spark Streaming, processing 10M+ events daily",
        "Architected and deployed a cloud-native data lakehouse on Azure using Delta Lake, reducing query times by 60%",
        "Developed automated data quality frameworks using Great Expectations, achieving 99.9% data accuracy",
        "Mentored team of 4 junior engineers and established best practices for data engineering workflows"
      ]
    },
    {
      "title": "Data Engineer",
      "company": "Orange Egypt",
      "location": "Cairo, Egypt",
      "period": "2020 - 2022",
      "achievements": [
        "Built and maintained 50+ ETL pipelines using Apache Airflow, processing 500GB+ daily",
        "Migrated legacy data warehouse to Snowflake, resulting in 40% cost reduction",
        "Implemented CI/CD pipelines for data infrastructure using Jenkins and Terraform",
        "Collaborated with data scientists to productionize ML models for customer churn prediction"
      ]
    },
    {
      "title": "Junior Data Engineer",
      "company": "Telecom Egypt",
      "location": "Cairo, Egypt",
      "period": "2019 - 2020",
      "achievements": [
        "Developed Python-based data extraction scripts for various data sources",
        "Created automated reporting dashboards using Power BI and SQL Server",
        "Assisted in database optimization and query performance tuning"
      ]
    }
  ]
}'::jsonb),
('education', '{
  "degrees": [
    {
      "degree": "Bachelor of Science in Computer Science",
      "institution": "Cairo University",
      "location": "Cairo, Egypt",
      "period": "2015 - 2019",
      "details": "Graduated with Honors | GPA: 3.7/4.0"
    }
  ],
  "certifications": [
    "AWS Certified Data Analytics - Specialty",
    "Google Cloud Professional Data Engineer",
    "Databricks Certified Data Engineer Associate",
    "Apache Spark Developer Certification"
  ]
}'::jsonb);