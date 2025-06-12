
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Target, Award, Heart } from "lucide-react";
import Header from "@/components/Header";

const AboutUs = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering job seekers to land their dream careers through ATS-optimized resumes."
    },
    {
      icon: Users,
      title: "User-Centric",
      description: "Every feature is designed with our users' success and career growth in mind."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We strive for the highest quality in our templates, tools, and user experience."
    },
    {
      icon: Heart,
      title: "Passion",
      description: "We're passionate about helping people achieve their career goals and dreams."
    }
  ];

  const team = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      bio: "Former HR executive with 15+ years of experience in talent acquisition and resume optimization.",
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      name: "Michael Chen",
      role: "CTO",
      bio: "Tech leader specializing in AI and machine learning applications for career development.",
      image: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      name: "Emily Davis",
      role: "Head of Design",
      bio: "Design expert with a focus on creating beautiful, functional, and ATS-friendly templates.",
      image: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      name: "David Wilson",
      role: "Career Advisor",
      bio: "Certified career coach helping thousands of professionals advance their careers.",
      image: "bg-gradient-to-br from-orange-400 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About ResumeWorld
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We're on a mission to democratize career success by providing cutting-edge resume building 
            tools and ATS optimization technology that helps job seekers land their dream jobs.
          </p>
        </div>

        {/* Story Section */}
        <div className="mb-16">
          <Card className="border-0 shadow-lg">
            <CardContent className="p-8 md:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <p>
                      ResumeWorld was born from a simple yet powerful observation: talented individuals 
                      were being overlooked not because they lacked skills, but because their resumes 
                      weren't optimized for Applicant Tracking Systems (ATS).
                    </p>
                    <p>
                      Founded in 2020 by a team of HR professionals, engineers, and career coaches, 
                      we set out to bridge this gap. We believed that everyone deserves a fair chance 
                      to showcase their talents, regardless of their resume formatting knowledge.
                    </p>
                    <p>
                      Today, we've helped over 50,000 job seekers create ATS-optimized resumes and 
                      land positions at top companies worldwide. Our platform combines industry 
                      expertise with cutting-edge technology to deliver results that matter.
                    </p>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-8 text-center">
                  <div className="grid grid-cols-1 gap-6">
                    <div>
                      <div className="text-4xl font-bold text-blue-600">50,000+</div>
                      <div className="text-gray-600">Resumes Created</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-blue-600">95%</div>
                      <div className="text-gray-600">ATS Success Rate</div>
                    </div>
                    <div>
                      <div className="text-4xl font-bold text-blue-600">30,000+</div>
                      <div className="text-gray-600">Job Offers</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-xl text-gray-600">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
                    <value.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600">
              The passionate individuals behind ResumeWorld
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className={`w-24 h-24 rounded-full ${member.image} mx-auto mb-4`}></div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                  <p className="text-sm text-gray-600 leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl leading-relaxed max-w-4xl mx-auto">
            To empower every job seeker with the tools, knowledge, and confidence they need to 
            create compelling resumes that get noticed by both ATS systems and human recruiters, 
            ultimately helping them land their dream careers.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
