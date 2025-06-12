
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, Clock, User } from "lucide-react";
import Header from "@/components/Header";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "10 ATS Resume Tips That Actually Work in 2024",
      excerpt: "Learn the latest strategies to optimize your resume for Applicant Tracking Systems and increase your chances of landing interviews.",
      author: "Sarah Johnson",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "ATS Tips",
      featured: true,
      image: "bg-gradient-to-br from-blue-400 to-blue-600"
    },
    {
      id: 2,
      title: "How to Choose the Right Resume Template for Your Industry",
      excerpt: "Different industries have different expectations. Discover which resume template works best for your field and career level.",
      author: "Emily Davis",
      date: "March 12, 2024",
      readTime: "6 min read",
      category: "Templates",
      featured: false,
      image: "bg-gradient-to-br from-green-400 to-green-600"
    },
    {
      id: 3,
      title: "The Complete Guide to Resume Keywords",
      excerpt: "Master the art of keyword optimization to ensure your resume gets past ATS filters and into the hands of hiring managers.",
      author: "Michael Chen",
      date: "March 10, 2024",
      readTime: "10 min read",
      category: "Keywords",
      featured: true,
      image: "bg-gradient-to-br from-purple-400 to-purple-600"
    },
    {
      id: 4,
      title: "Common Resume Mistakes That Cost You Interviews",
      excerpt: "Avoid these critical resume mistakes that could be preventing you from landing your dream job interviews.",
      author: "David Wilson",
      date: "March 8, 2024",
      readTime: "7 min read",
      category: "Career Tips",
      featured: false,
      image: "bg-gradient-to-br from-red-400 to-red-600"
    },
    {
      id: 5,
      title: "Tailoring Your Resume for Remote Work Positions",
      excerpt: "Remote work requires a different approach. Learn how to highlight your remote work skills and experience effectively.",
      author: "Sarah Johnson",
      date: "March 5, 2024",
      readTime: "9 min read",
      category: "Remote Work",
      featured: false,
      image: "bg-gradient-to-br from-yellow-400 to-orange-500"
    },
    {
      id: 6,
      title: "How to Write Achievement-Focused Resume Bullets",
      excerpt: "Transform boring job descriptions into compelling achievement statements that demonstrate your value to potential employers.",
      author: "Emily Davis",
      date: "March 3, 2024",
      readTime: "5 min read",
      category: "Writing Tips",
      featured: false,
      image: "bg-gradient-to-br from-indigo-400 to-indigo-600"
    }
  ];

  const categories = ["All", "ATS Tips", "Templates", "Keywords", "Career Tips", "Remote Work", "Writing Tips"];

  const featuredPosts = blogPosts.filter(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Career Insights & Tips
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, industry insights, and actionable tips to accelerate your career success
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category, index) => (
            <Badge
              key={index}
              variant={index === 0 ? "default" : "secondary"}
              className={`cursor-pointer px-4 py-2 ${
                index === 0 
                  ? "bg-blue-600 hover:bg-blue-700" 
                  : "bg-gray-200 hover:bg-gray-300 text-gray-700"
              }`}
            >
              {category}
            </Badge>
          ))}
        </div>

        {/* Featured Posts */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Articles</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featuredPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`h-48 ${post.image}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-xl hover:text-blue-600 transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* All Posts */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={`h-40 ${post.image}`}></div>
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="text-xs">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg hover:text-blue-600 transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center">
                      <User className="h-3 w-3 mr-1" />
                      {post.author}
                    </div>
                    <div className="flex items-center">
                      <CalendarDays className="h-3 w-3 mr-1" />
                      {post.date}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 md:p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
          <p className="text-xl mb-6 max-w-2xl mx-auto">
            Get the latest career tips, resume advice, and job market insights delivered to your inbox weekly.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
