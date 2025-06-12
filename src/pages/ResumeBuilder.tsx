
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Eye, Plus, Trash2 } from "lucide-react";
import Header from "@/components/Header";

const ResumeBuilder = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(1);
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
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
  });

  const templates = [
    {
      id: 1,
      name: "Professional",
      description: "Clean and modern design perfect for corporate roles",
      preview: "bg-white border-2 border-blue-200",
    },
    {
      id: 2,
      name: "Creative",
      description: "Stand out with this creative design for design roles",
      preview: "bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200",
    },
    {
      id: 3,
      name: "Minimal",
      description: "Simple and elegant design that highlights your content",
      preview: "bg-gray-50 border-2 border-gray-200",
    },
    {
      id: 4,
      name: "Executive",
      description: "Sophisticated design for senior-level positions",
      preview: "bg-slate-50 border-2 border-slate-300",
    },
  ];

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Resume Builder</h1>
          <p className="text-gray-600">Create your professional resume with our easy-to-use builder</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Template Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Choose a Template</CardTitle>
                <CardDescription>Select a template that matches your industry and style</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedTemplate === template.id
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setSelectedTemplate(template.id)}
                    >
                      <div className={`h-24 rounded ${template.preview} mb-3`}></div>
                      <h3 className="font-semibold">{template.name}</h3>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Personal Information */}
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
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
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
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
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="linkedin">LinkedIn</Label>
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
                  />
                </div>
              </CardContent>
            </Card>

            {/* Professional Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Professional Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Write a brief summary of your professional background and key achievements..."
                  rows={4}
                  value={resumeData.summary}
                  onChange={(e) => setResumeData(prev => ({ ...prev, summary: e.target.value }))}
                />
              </CardContent>
            </Card>

            {/* Experience */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Work Experience
                  <Button onClick={addExperience} size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {resumeData.experience.map((exp, index) => (
                  <div key={index} className="border rounded-lg p-4 relative">
                    {resumeData.experience.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute top-2 right-2"
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
                      />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        placeholder="Describe your responsibilities and achievements..."
                        rows={3}
                        value={exp.description}
                        onChange={(e) => {
                          const newExp = [...resumeData.experience];
                          newExp[index].description = e.target.value;
                          setResumeData(prev => ({ ...prev, experience: newExp }));
                        }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Resume Preview
                  <div className="space-x-2">
                    <Button size="sm" variant="outline">
                      <Eye className="h-4 w-4 mr-2" />
                      Preview
                    </Button>
                    <Button size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-white border rounded-lg p-6 shadow-sm">
                  <div className="text-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {resumeData.personalInfo.name || "Your Name"}
                    </h2>
                    <div className="text-sm text-gray-600 space-y-1">
                      <p>{resumeData.personalInfo.email}</p>
                      <p>{resumeData.personalInfo.phone}</p>
                      <p>{resumeData.personalInfo.location}</p>
                    </div>
                  </div>

                  {resumeData.summary && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold mb-2 text-gray-900">Summary</h3>
                      <p className="text-sm text-gray-700">{resumeData.summary}</p>
                    </div>
                  )}

                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 text-gray-900">Experience</h3>
                    {resumeData.experience.map((exp, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex justify-between items-start mb-1">
                          <div>
                            <h4 className="font-medium text-gray-900">{exp.title || "Job Title"}</h4>
                            <p className="text-sm text-gray-600">{exp.company || "Company Name"}</p>
                          </div>
                          <span className="text-xs text-gray-500">{exp.duration}</span>
                        </div>
                        {exp.description && (
                          <p className="text-xs text-gray-700 mt-2">{exp.description}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
