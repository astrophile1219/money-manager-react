import React from "react";
import { ArrowRight, Menu, X, Wallet } from "lucide-react";
import { useNavigate } from "react-router-dom";
import demo from "../assets/demo.png";

const LandingPage = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const navigate = useNavigate();

  const openLogin = () => navigate("/login");
  const openSignup = () => navigate("/signup");

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-50 to-white">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <Wallet className="text-purple-600" size={28} />
              <span className="text-xl font-bold text-gray-900">
                Money Manager
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <a className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer">
                Home
              </a>
              <a className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer">
                About us
              </a>
              <a className="text-gray-700 hover:text-purple-600 font-medium transition-colors cursor-pointer">
                Contact us
              </a>
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={openLogin}
                className="text-gray-700 hover:text-purple-600 font-medium px-4 py-2 transition-colors"
              >
                Login
              </button>
              <button
                onClick={openSignup}
                className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-all hover:shadow-lg hover:shadow-purple-200"
              >
                Get Started
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-700"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pb-4 space-y-4 border-t pt-4">
              <a className="block text-gray-700 hover:text-purple-600 font-medium cursor-pointer">
                Home
              </a>
              <a className="block text-gray-700 hover:text-purple-600 font-medium cursor-pointer">
                About us
              </a>
              <a className="block text-gray-700 hover:text-purple-600 font-medium cursor-pointer">
                Contact us
              </a>
              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={openLogin}
                  className="text-gray-700 cursor-pointer hover:text-purple-600 font-medium px-4 py-2 border border-gray-200 rounded-lg"
                >
                  Login
                </button>
                <button
                  onClick={openSignup}
                  className="bg-purple-600 cursor-pointer hover:bg-purple-700 text-white font-semibold px-6 py-2.5 rounded-lg"
                >
                  Get Started
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-6 py-20 md:py-32 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Take Control of Your Finances
          </h1>

          <p className="text-base md:text-xl text-gray-600 mb-12 leading-relaxed max-w-3xl mx-auto">
            Your foundation for secure, intelligent financial management.
            Effortlessly track your income and expenses to achieve your
            financial goals.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <button
              onClick={openSignup}
              className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all text-base md:text-lg shadow-lg shadow-purple-200 hover:shadow-xl cursor-pointer hover:shadow-purple-300 hover:-translate-y-0.5"
            >
              Start Tracking for Free
            </button>

            <button className="bg-white hover:bg-gray-50 text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all text-base md:text-lg border border-gray-200 flex items-center gap-2 hover:border-gray-300 hover:shadow-md">
              Learn More
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Demo Image */}
        <div className="mt-16 flex justify-center">
          <img
            src={demo}
            alt="App Preview"
            className="rounded-2xl shadow-2xl max-w-full md:max-w-4xl"
          />
        </div>
      </main>
    </div>
  );
};

export default LandingPage;
