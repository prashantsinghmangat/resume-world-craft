
import React from 'react';

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

interface TemplateProps {
  data: ResumeData;
  templateId: number;
}

export const TemplateModern: React.FC<TemplateProps> = ({ data, templateId }) => {
  const getTemplateStyles = () => {
    switch (templateId) {
      case 1:
        return {
          primary: 'text-blue-900',
          accent: 'bg-blue-600',
          section: 'border-blue-200',
          background: 'bg-white'
        };
      case 2:
        return {
          primary: 'text-purple-900',
          accent: 'bg-gradient-to-r from-purple-600 to-pink-600',
          section: 'border-purple-200',
          background: 'bg-gradient-to-br from-purple-50 to-pink-50'
        };
      case 3:
        return {
          primary: 'text-gray-900',
          accent: 'bg-gray-700',
          section: 'border-gray-300',
          background: 'bg-gray-50'
        };
      default:
        return {
          primary: 'text-slate-900',
          accent: 'bg-slate-800',
          section: 'border-slate-300',
          background: 'bg-slate-50'
        };
    }
  };

  const styles = getTemplateStyles();

  return (
    <div className={`${styles.background} p-8 min-h-[1123px] w-[794px] mx-auto shadow-lg`} id="resume-preview">
      {/* Header */}
      <div className="flex items-start gap-6 mb-6">
        {data.personalInfo.profileImage && (
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
            <img 
              src={data.personalInfo.profileImage} 
              alt="Profile" 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className="flex-1">
          <h1 className={`text-3xl font-bold ${styles.primary} mb-2`}>
            {data.personalInfo.name || 'Your Name'}
          </h1>
          <div className="text-gray-600 space-y-1">
            <p>{data.personalInfo.email}</p>
            <p>{data.personalInfo.phone}</p>
            <p>{data.personalInfo.location}</p>
            {data.personalInfo.linkedin && (
              <p className="text-blue-600">{data.personalInfo.linkedin}</p>
            )}
          </div>
        </div>
      </div>

      {/* Summary */}
      {data.summary && (
        <div className="mb-6">
          <div className={`h-1 ${styles.accent} mb-3`}></div>
          <h2 className={`text-xl font-bold ${styles.primary} mb-3`}>Professional Summary</h2>
          <p className="text-gray-700 leading-relaxed">{data.summary}</p>
        </div>
      )}

      {/* Experience */}
      <div className="mb-6">
        <div className={`h-1 ${styles.accent} mb-3`}></div>
        <h2 className={`text-xl font-bold ${styles.primary} mb-4`}>Experience</h2>
        {data.experience.map((exp, index) => (
          <div key={index} className="mb-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold text-gray-900">{exp.title || 'Job Title'}</h3>
                <p className="text-gray-600 font-medium">{exp.company || 'Company Name'}</p>
              </div>
              <span className="text-sm text-gray-500 font-medium">{exp.duration}</span>
            </div>
            {exp.description && (
              <p className="text-gray-700 text-sm leading-relaxed">{exp.description}</p>
            )}
          </div>
        ))}
      </div>

      {/* Projects */}
      {data.projects.length > 0 && data.projects[0].name && (
        <div className="mb-6">
          <div className={`h-1 ${styles.accent} mb-3`}></div>
          <h2 className={`text-xl font-bold ${styles.primary} mb-4`}>Projects</h2>
          {data.projects.map((project, index) => (
            <div key={index} className="mb-4">
              <h3 className="font-semibold text-gray-900 mb-1">{project.name}</h3>
              <p className="text-gray-700 text-sm mb-2">{project.description}</p>
              {project.technologies && (
                <p className="text-gray-600 text-sm">
                  <strong>Technologies:</strong> {project.technologies}
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Education */}
      <div className="mb-6">
        <div className={`h-1 ${styles.accent} mb-3`}></div>
        <h2 className={`text-xl font-bold ${styles.primary} mb-4`}>Education</h2>
        {data.education.map((edu, index) => (
          <div key={index} className="mb-3">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{edu.degree || 'Degree'}</h3>
                <p className="text-gray-600">{edu.school || 'School Name'}</p>
              </div>
              <span className="text-sm text-gray-500 font-medium">{edu.year}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Skills */}
      {data.skills.length > 0 && data.skills[0] && (
        <div className="mb-6">
          <div className={`h-1 ${styles.accent} mb-3`}></div>
          <h2 className={`text-xl font-bold ${styles.primary} mb-4`}>Skills</h2>
          <div className="flex flex-wrap gap-2">
            {data.skills.filter(skill => skill.trim()).map((skill, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
