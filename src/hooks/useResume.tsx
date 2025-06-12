
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    profileImage?: string;
  };
  summary: string;
  experience: Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
  projects: Array<{
    name: string;
    description: string;
    technologies: string;
  }>;
}

export const useResume = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      profileImage: "",
    },
    summary: "",
    experience: [
      {
        title: "",
        company: "",
        duration: "",
        description: "",
      },
    ],
    education: [
      {
        degree: "",
        school: "",
        year: "",
      },
    ],
    skills: [""],
    projects: [
      {
        name: "",
        description: "",
        technologies: "",
      },
    ],
  });
  
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resumeId, setResumeId] = useState<string | null>(null);

  // Load resume data when user logs in
  useEffect(() => {
    if (user) {
      loadResumeData();
    }
  }, [user]);

  // Auto-save resume data when it changes
  useEffect(() => {
    if (user && resumeId) {
      const timeoutId = setTimeout(() => {
        saveResumeData();
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timeoutId);
    }
  }, [resumeData, selectedTemplate, user, resumeId]);

  const loadResumeData = async () => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('resumes')
        .select('*')
        .eq('user_id', user.id)
        .order('updated_at', { ascending: false })
        .limit(1);

      if (error) {
        console.error('Error loading resume:', error);
        return;
      }

      if (data && data.length > 0) {
        const resume = data[0];
        setResumeId(resume.id);
        setSelectedTemplate(resume.template_id);
        
        // Populate the form with saved data
        setResumeData({
          personalInfo: resume.personal_info || resumeData.personalInfo,
          summary: resume.summary || "",
          experience: resume.experience || resumeData.experience,
          education: resume.education || resumeData.education,
          skills: resume.skills || resumeData.skills,
          projects: resume.projects || resumeData.projects,
        });

        toast({
          title: "Resume Loaded",
          description: "Your saved resume has been loaded successfully.",
        });
      }
    } catch (error) {
      console.error('Error loading resume:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveResumeData = async () => {
    if (!user) return;

    try {
      const resumePayload = {
        user_id: user.id,
        personal_info: resumeData.personalInfo,
        summary: resumeData.summary,
        experience: resumeData.experience,
        education: resumeData.education,
        skills: resumeData.skills,
        projects: resumeData.projects,
        template_id: selectedTemplate,
        is_default: true,
      };

      if (resumeId) {
        // Update existing resume
        const { error } = await supabase
          .from('resumes')
          .update(resumePayload)
          .eq('id', resumeId);

        if (error) {
          console.error('Error updating resume:', error);
          return;
        }
      } else {
        // Create new resume
        const { data, error } = await supabase
          .from('resumes')
          .insert([resumePayload])
          .select()
          .single();

        if (error) {
          console.error('Error creating resume:', error);
          return;
        }

        if (data) {
          setResumeId(data.id);
        }
      }
    } catch (error) {
      console.error('Error saving resume:', error);
    }
  };

  const manualSave = async () => {
    await saveResumeData();
    toast({
      title: "Resume Saved",
      description: "Your resume has been saved successfully.",
    });
  };

  return {
    resumeData,
    setResumeData,
    selectedTemplate,
    setSelectedTemplate,
    loading,
    saveResumeData: manualSave,
  };
};
