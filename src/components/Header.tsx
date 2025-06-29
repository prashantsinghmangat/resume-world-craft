
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileText, User, Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
  };

  return (
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
            {user && (
              <Link
                to="/resume-builder"
                className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                  isActive("/resume-builder") ? "text-blue-600" : "text-gray-700"
                }`}
              >
                Resume Builder
              </Link>
            )}
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

          {/* Desktop Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link to="/auth">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  Sign In / Sign Up
                </Button>
              </Link>
            )}
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
              {user && (
                <Link
                  to="/resume-builder"
                  className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                    isActive("/resume-builder") ? "text-blue-600" : "text-gray-700"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Resume Builder
                </Link>
              )}
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
                {user ? (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      handleSignOut();
                      setIsMobileMenuOpen(false);
                    }}
                    className="justify-start text-gray-700 hover:text-blue-600"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </Button>
                ) : (
                  <Link to="/auth" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button className="w-full justify-start bg-blue-600 hover:bg-blue-700 text-white">
                      Sign In / Sign Up
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
