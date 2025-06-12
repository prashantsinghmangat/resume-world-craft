
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, FileText, CheckCircle, AlertTriangle, X, Download } from "lucide-react";
import Header from "@/components/Header";

const ATSChecker = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [results, setResults] = useState<any>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setResults(null);
    }
  };

  const analyzeResume = () => {
    if (!file) return;
    
    setIsAnalyzing(true);
    
    // Simulate analysis
    setTimeout(() => {
      setResults({
        overallScore: 78,
        sections: {
          formatting: { score: 85, status: "good" },
          keywords: { score: 72, status: "warning" },
          contact: { score: 95, status: "excellent" },
          experience: { score: 80, status: "good" },
          skills: { score: 65, status: "warning" },
          education: { score: 90, status: "excellent" }
        },
        suggestions: [
          "Add more industry-specific keywords to improve keyword matching",
          "Consider using bullet points for better formatting",
          "Include more quantifiable achievements in your experience section",
          "Add technical skills relevant to your target role"
        ],
        keywords: {
          found: ["JavaScript", "React", "Project Management", "Team Leadership"],
          missing: ["TypeScript", "Agile", "Scrum", "Node.js", "AWS"]
        }
      });
      setIsAnalyzing(false);
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "warning": return "text-yellow-600";
      case "poor": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "excellent": return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "good": return <CheckCircle className="h-5 w-5 text-blue-600" />;
      case "warning": return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "poor": return <X className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Score Checker</h1>
          <p className="text-gray-600">
            Upload your resume to get an instant ATS compatibility score and detailed feedback
          </p>
        </div>

        {/* Upload Section */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Upload Your Resume</CardTitle>
            <CardDescription>
              Supported formats: PDF, DOC, DOCX (Max size: 5MB)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileUpload}
                className="hidden"
                id="resume-upload"
              />
              <label htmlFor="resume-upload" className="cursor-pointer">
                <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <div className="text-lg font-medium text-gray-900 mb-2">
                  Click to upload your resume
                </div>
                <div className="text-sm text-gray-500">
                  or drag and drop your file here
                </div>
              </label>
            </div>

            {file && (
              <div className="mt-4 flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <FileText className="h-8 w-8 text-blue-600" />
                  <div>
                    <div className="font-medium text-gray-900">{file.name}</div>
                    <div className="text-sm text-gray-500">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                  </div>
                </div>
                <Button
                  onClick={analyzeResume}
                  disabled={isAnalyzing}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Resume"}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Analysis Progress */}
        {isAnalyzing && (
          <Card className="mb-8">
            <CardContent className="pt-6">
              <div className="text-center">
                <div className="mb-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                </div>
                <h3 className="text-lg font-semibold mb-2">Analyzing Your Resume</h3>
                <p className="text-gray-600 mb-4">
                  Our AI is checking your resume against ATS best practices...
                </p>
                <Progress value={66} className="w-full max-w-md mx-auto" />
              </div>
            </CardContent>
          </Card>
        )}

        {/* Results Section */}
        {results && (
          <div className="space-y-6">
            {/* Overall Score */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Overall ATS Score
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Download Report
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-6xl font-bold text-blue-600 mb-2">
                    {results.overallScore}%
                  </div>
                  <div className="text-lg text-gray-600 mb-4">
                    Your resume has good ATS compatibility
                  </div>
                  <Progress value={results.overallScore} className="w-full max-w-md mx-auto" />
                </div>
              </CardContent>
            </Card>

            {/* Section Scores */}
            <Card>
              <CardHeader>
                <CardTitle>Section Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(results.sections).map(([section, data]: [string, any]) => (
                    <div key={section} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(data.status)}
                        <div>
                          <div className="font-medium capitalize">{section}</div>
                          <div className={`text-sm ${getStatusColor(data.status)}`}>
                            {data.status}
                          </div>
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-gray-900">
                        {data.score}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Keywords Analysis */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Keywords Found</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.keywords.found.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Missing Keywords</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {results.keywords.missing.map((keyword: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Suggestions */}
            <Card>
              <CardHeader>
                <CardTitle>Improvement Suggestions</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {results.suggestions.map((suggestion: string, index: number) => (
                    <li key={index} className="flex items-start space-x-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ATSChecker;
