import React from 'react';
import { FiTarget, FiStar, FiHeart, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import DashboardLayout from '../components/layouts/DashboardLayout';

function AboutUs() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            About CrackBano
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Empowering professionals worldwide with AI-driven interview preparation that transforms careers and builds confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="card-professional p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Mission</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              To revolutionize career preparation by providing intelligent, personalized interview coaching that empowers professionals to achieve their career aspirations with confidence.
            </p>
          </div>

          <div className="card-professional p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Our Vision</h2>
            </div>
            <p className="text-slate-600 text-lg leading-relaxed">
              To become the global leader in AI-powered career development, making professional success accessible to everyone regardless of background or experience level.
            </p>
          </div>
        </div>

        <div className="card-professional p-8 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-600">AI-Powered Coaching</h3>
              <p className="text-slate-600">Advanced artificial intelligence provides personalized feedback and coaching tailored to your specific role and experience level.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-600">Comprehensive Question Banks</h3>
              <p className="text-slate-600">Extensive libraries of interview questions across multiple industries, roles, and difficulty levels.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-600">Performance Analytics</h3>
              <p className="text-slate-600">Detailed insights into your progress, strengths, and areas for improvement with actionable recommendations.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-teal-600">Expert-Curated Content</h3>
              <p className="text-slate-600">Content developed and reviewed by industry professionals and hiring managers from top companies.</p>
            </div>
          </div>
        </div>

        <div className="card-professional p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center">
              <FiHeart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">User-Centric</h3>
              <p className="text-slate-600">Every feature is designed with our users' success and experience at the forefront.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Innovation</h3>
              <p className="text-slate-600">Continuously pushing boundaries with cutting-edge technology and methodologies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-3">Integrity</h3>
              <p className="text-slate-600">Maintaining the highest standards of privacy, security, and ethical practices.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AboutUs;
