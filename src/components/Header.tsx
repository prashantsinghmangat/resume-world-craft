
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, Menu, X } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = () => {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const handleAuthClick = (mode: "login" | "signup") => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-blue-600" />
              <span className="text-2xl font-bold text-gray-900">ResumeWorld</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Home
              </Link>
              <Link
                to="/resume-builder"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/resume-builder") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Resume Builder
              </Link>
              <Link
                to="/ats-checker"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/ats-checker") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                ATS Checker
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/about") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                About Us
              </Link>
              <Link
                to="/blog"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/blog") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Blog
              </Link>
            </nav>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center space-x-4">
              <Button
                variant="ghost"
                onClick={() => handleAuthClick("login")}
                className="text-gray-700 hover:text-blue-600"
              >
                Login
              </Button>
              <Button
                onClick={() => handleAuthClick("signup")}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                Sign Up
              </Button>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-gray-700 hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <div className="flex flex-col space-y-4">
                <Link
                  to="/"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/resume-builder"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/resume-builder") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume Builder
                </Link>
                <Link
                  to="/ats-checker"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/ats-checker") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ATS Checker
                </Link>
                <Link
                  to="/about"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/about") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/blog"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/blog") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Blog
                </Link>
                <div className="flex flex-col space-y-2 pt-4 border-t">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleAuthClick("login");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start text-gray-700 hover:text-blue-600"
                  >
                    Login
                  </Button>
                  <Button
                    onClick={() => {
                      handleAuthClick("signup");
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Sign Up
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onSwitchMode={(mode) => setAuthMode(mode)}
      />
    </>
  );
};

export default Header;
