
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface ResumeData {
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
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

interface ATSAnalyzerProps {
  data: ResumeData;
}

export const ATSAnalyzer: React.FC<ATSAnalyzerProps> = ({ data }) => {
  const analyzeResume = () => {
    const issues = [];
    const suggestions = [];
    let score = 100;

    // Check contact information
    if (!data.personalInfo.email) {
      issues.push("Missing email address");
      score -= 10;
    }
    if (!data.personalInfo.phone) {
      issues.push("Missing phone number");
      score -= 10;
    }
    if (!data.personalInfo.location) {
      suggestions.push("Add location for better local job matching");
      score -= 5;
    }

    // Check summary
    if (!data.summary || data.summary.length < 50) {
      issues.push("Professional summary is too short or missing");
      score -= 15;
    }

    // Check experience descriptions
    const hasQuantifiableAchievements = data.experience.some(exp => 
      exp.description && /\d+/.test(exp.description)
    );
    if (!hasQuantifiableAchievements) {
      suggestions.push("Add quantifiable achievements (numbers, percentages, etc.)");
      score -= 10;
    }

    // Check skills section
    if (!data.skills.length || !data.skills[0]) {
      issues.push("Missing skills section");
      score -= 20;
    } else if (data.skills.filter(s => s.trim()).length < 5) {
      suggestions.push("Add more relevant skills (aim for 8-12 skills)");
      score -= 5;
    }

    // Check keywords density
    const allText = [
      data.summary,
      ...data.experience.map(exp => `${exp.title} ${exp.description}`),
      ...data.skills
    ].join(' ').toLowerCase();

    const technicalKeywords = ['javascript', 'python', 'react', 'node', 'sql', 'aws', 'docker', 'git'];
    const foundKeywords = technicalKeywords.filter(keyword => allText.includes(keyword));
    
    if (foundKeywords.length < 3) {
      suggestions.push("Include more industry-relevant keywords");
      score -= 8;
    }

    // Check formatting
    if (data.experience.some(exp => !exp.duration)) {
      suggestions.push("Add duration for all work experiences");
      score -= 5;
    }

    return {
      score: Math.max(0, score),
      issues,
      suggestions,
      foundKeywords
    };
  };

  const analysis = analyzeResume();

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadge = (score: number) => {
    if (score >= 80) return "bg-green-100 text-green-800";
    if (score >= 60) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          ATS Score Analysis
          <Badge className={getScoreBadge(analysis.score)}>
            {analysis.score}/100
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score Display */}
        <div className="text-center p-4 border rounded-lg">
          <div className={`text-3xl font-bold ${getScoreColor(analysis.score)}`}>
            {analysis.score}%
          </div>
          <p className="text-gray-600 mt-1">ATS Compatibility Score</p>
        </div>

        {/* Issues */}
        {analysis.issues.length > 0 && (
          <div>
            <h4 className="font-semibold text-red-700 mb-2 flex items-center">
              <XCircle className="h-4 w-4 mr-2" />
              Critical Issues
            </h4>
            <ul className="space-y-1">
              {analysis.issues.map((issue, index) => (
                <li key={index} className="text-red-600 text-sm flex items-start">
                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {issue}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Suggestions */}
        {analysis.suggestions.length > 0 && (
          <div>
            <h4 className="font-semibold text-yellow-700 mb-2 flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Suggestions for Improvement
            </h4>
            <ul className="space-y-1">
              {analysis.suggestions.map((suggestion, index) => (
                <li key={index} className="text-yellow-700 text-sm flex items-start">
                  <span className="w-2 h-2 bg-yellow-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Keywords Found */}
        {analysis.foundKeywords.length > 0 && (
          <div>
            <h4 className="font-semibold text-green-700 mb-2 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Keywords Found
            </h4>
            <div className="flex flex-wrap gap-2">
              {analysis.foundKeywords.map((keyword, index) => (
                <Badge key={index} variant="outline" className="text-green-700 border-green-300">
                  {keyword}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* ATS Tips */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-900 mb-2">ATS Optimization Tips</h4>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords from the job description</li>
            <li>• Use bullet points for easy scanning</li>
            <li>• Quantify achievements with numbers and percentages</li>
            <li>• Keep formatting simple and consistent</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
