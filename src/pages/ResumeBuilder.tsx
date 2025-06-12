import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Eye, Plus, Trash2, Upload } from "lucide-react";
import Header from "@/components/Header";
import { TemplateModern } from "@/components/resume/TemplateModern";
import { ATSAnalyzer } from "@/components/resume/ATSAnalyzer";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

const ResumeBuilder = () => {
  const { toast } = useToast();
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [showPreview, setShowPreview] = useState(true);
  const [resumeData, setResumeData] = useState({
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

  const templates = [
    {
      id: 1,
      name: "Professional Blue",
      description: "Clean corporate design with blue accents",
      preview: "bg-white border-2 border-blue-200",
      color: "blue"
    },
    {
      id: 2,
      name: "Creative Purple",
      description: "Modern gradient design for creative roles",
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200",
      color: "purple"
    },
    {
      id: 3,
      name: "Minimal Gray",
      description: "Simple elegant design that highlights content",
      preview: "bg-gray-50 border-2 border-gray-200",
      color: "gray"
    },
    {
      id: 4,
      name: "Executive Slate",
      description: "Sophisticated design for senior positions",
      preview: "bg-slate-50 border-2 border-slate-300",
      color: "slate"
    },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Please select an image smaller than 5MB",
          variant: "destructive"
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setResumeData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, profileImage: e.target?.result as string }
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const downloadPDF = async () => {
    const success = await generatePDF('resume-preview', `${resumeData.personalInfo.name || 'resume'}.pdf`);
    if (success) {
      toast({
        title: "PDF Generated",
        description: "Your resume has been downloaded successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const addExperience = () => {
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, { title: "", company: "", duration: "", description: "" }]
    }));
  };

  const removeExperience = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addEducation = () => {
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, { degree: "", school: "", year: "" }]
    }));
  };

  const removeEducation = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, ""]
    }));
  };

  const removeSkill = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addProject = () => {
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, { name: "", description: "", technologies: "" }]
    }));
  };

  const removeProject = (index: number) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Advanced Resume Builder
          </h1>
          <p className="text-gray-600">Create your professional resume with ATS optimization and beautiful templates</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Form Section */}
          <div className="xl:col-span-3 space-y-6">
            {/* Template Selection */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Choose Your Template</CardTitle>
                <CardDescription>Select a professional template that matches your industry</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all transform hover:scale-105 ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50 shadow-lg"
                          : "border-gray-200 hover:border-gray-300 hover:shadow-md"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`h-32 rounded-lg ${template.preview} mb-3 relative overflow-hidden`}>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
                      </div>
                      <h3 className="font-semibold text-lg">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Profile Image Upload */}
                <div className="flex items-center space-x-4">
                  <div>
                    <Label htmlFor="profile-image">Profile Photo</Label>
                    <div className="flex items-center space-x-4 mt-2">
                      {resumeData.personalInfo.profileImage && (
                        <img 
                          src={resumeData.personalInfo.profileImage} 
                          alt="Profile" 
                          className="w-16 h-16 rounded-full object-cover border-2 border-gray-300"
                        />
                      )}
                      <div>
                        <Input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('profile-image')?.click()}
                          className="flex items-center space-x-2"
                        >
                          <Upload className="h-4 w-4" />
                          <span>Upload Photo</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={resumeData.personalInfo.name}
                      onChange={(e) =>
                        setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, name: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={resumeData.personalInfo.email}
                      onChange={(e) =>
                        setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, email: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone *</Label>
                    <Input
                      id="phone"
                      placeholder="+1 (555) 123-4567"
                      value={resumeData.personalInfo.phone}
                      onChange={(e) =>
                        setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, phone: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      placeholder="New York, NY"
                      value={resumeData.personalInfo.location}
                      onChange={(e) =>
                        setResumeData(prev => ({
                          ...prev,
                          personalInfo: { ...prev.personalInfo, location: e.target.value }
                        }))
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn Profile</Label>
                  <Input
                    id="linkedin"
                    placeholder="linkedin.com/in/johndoe"
                    value={resumeData.personalInfo.linkedin}
                    onChange={(e) =>
                      setResumeData(prev => ({
                        ...prev,
                        personalInfo: { ...prev.personalInfo, linkedin: e.target.value }
                      }))
                    }
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Professional Summary</CardTitle>
                <CardDescription>Write a compelling summary that highlights your key achievements</CardDescription>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Dynamic software engineer with 5+ years of experience in full-stack development. Proven track record of delivering scalable web applications that increased user engagement by 40%..."
                  rows={4}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                  className="resize-none"
                />
                <p className="text-sm text-gray-500 mt-2">
                  Tip: Include quantifiable achievements and relevant keywords for ATS optimization
                </p>
              </CardContent>
            </Card>

            {/* Experience Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Work Experience
                  <Button onClick={addExperience} size="sm" className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                    {resumeData.experience.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => removeExperience(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <div>
                        <Label>Job Title</Label>
                        <Input
                          placeholder="Software Engineer"
                          value={exp.title}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[index].title = e.target.value;
                            setResumeData(prev => ({ ...prev, experience: newExp }));
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Company</Label>
                        <Input
                          placeholder="Tech Corp"
                          value={exp.company}
                          onChange={(e) => {
                            const newExp = [...resumeData.experience];
                            newExp[index].company = e.target.value;
                            setResumeData(prev => ({ ...prev, experience: newExp }));
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mb-4">
                      <Label>Duration</Label>
                      <Input
                        placeholder="Jan 2020 - Present"
                        value={exp.duration}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].duration = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label>Description & Achievements</Label>
                      <Textarea
                        placeholder="• Developed and maintained web applications using React and Node.js, improving performance by 30%&#10;• Led a team of 5 developers in delivering projects on time&#10;• Implemented CI/CD pipelines that reduced deployment time by 50%"
                        rows={4}
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].description = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                        className="mt-1 resize-none"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        Use bullet points and include quantifiable results (numbers, percentages, etc.)
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Projects Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Projects
                  <Button onClick={addProject} size="sm" className="bg-green-600 hover:bg-green-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Project
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                    {resumeData.projects.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => removeProject(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="space-y-4">
                      <div>
                        <Label>Project Name</Label>
                        <Input
                          placeholder="E-commerce Platform"
                          value={project.name}
                          onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index].name = e.target.value;
                            setResumeData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>Description</Label>
                        <Textarea
                          placeholder="Built a full-stack e-commerce platform that handles 10,000+ daily users..."
                          rows={3}
                          value={project.description}
                          onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index].description = e.target.value;
                            setResumeData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="mt-1 resize-none"
                        />
                      </div>
                      <div>
                        <Label>Technologies Used</Label>
                        <Input
                          placeholder="React, Node.js, MongoDB, AWS"
                          value={project.technologies}
                          onChange={(e) => {
                            const newProjects = [...resumeData.projects];
                            newProjects[index].technologies = e.target.value;
                            setResumeData(prev => ({ ...prev, projects: newProjects }));
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Education Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Education
                  <Button onClick={addEducation} size="sm" className="bg-purple-600 hover:bg-purple-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Education
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.education.map((edu, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50 relative">
                    {resumeData.education.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                        onClick={() => removeEducation(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label>Degree</Label>
                        <Input
                          placeholder="Bachelor of Computer Science"
                          value={edu.degree}
                          onChange={(e) => {
                            const newEdu = [...resumeData.education];
                            newEdu[index].degree = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEdu }));
                          }}
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label>School/University</Label>
                        <Input
                          placeholder="Stanford University"
                          value={edu.school}
                          onChange={(e) => {
                            const newEdu = [...resumeData.education];
                            newEdu[index].school = e.target.value;
                            setResumeData(prev => ({ ...prev, education: newEdu }));
                          }}
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="mt-4">
                      <Label>Year</Label>
                      <Input
                        placeholder="2020"
                        value={edu.year}
                        onChange={(e) => {
                          const newEdu = [...resumeData.education];
                          newEdu[index].year = e.target.value;
                          setResumeData(prev => ({ ...prev, education: newEdu }));
                        }}
                        className="mt-1"
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Skills Section */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Skills
                  <Button onClick={addSkill} size="sm" className="bg-orange-600 hover:bg-orange-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Skill
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {resumeData.skills.map((skill, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input
                        placeholder="JavaScript"
                        value={skill}
                        onChange={(e) => {
                          const newSkills = [...resumeData.skills];
                          newSkills[index] = e.target.value;
                          setResumeData(prev => ({ ...prev, skills: newSkills }));
                        }}
                      />
                      {resumeData.skills.length > 1 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeSkill(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">
                  Add 8-12 relevant skills including both technical and soft skills
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Preview & ATS Section */}
          <div className="xl:col-span-2 space-y-6">
            {/* Preview Controls */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-xl">
                  Resume Preview
                  <div className="space-x-2">
                    <Button 
                      size="sm" 
                      variant={showPreview ? "default" : "outline"}
                      onClick={() => setShowPreview(true)}
                    >
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button 
                      size="sm"
                      onClick={downloadPDF}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {showPreview && (
                  <div className="transform scale-[0.5] origin-top-left w-[200%] h-[200%] overflow-hidden border rounded-lg shadow-lg">
                    <TemplateModern 
                      data={resumeData} 
                      templateId={selectedTemplate}
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* ATS Analysis */}
            <ATSAnalyzer data={resumeData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
