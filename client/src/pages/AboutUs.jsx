// src/pages/AboutUs.jsx
import React from 'react';
import { FiTarget, FiStar, FiHeart, FiUsers, FiTrendingUp, FiShield } from 'react-icons/fi';
import DashboardLayout from '../components/layouts/DashboardLayout';

function AboutUs() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
            About CrackBano
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Empowering professionals worldwide with AI-driven interview preparation that transforms careers and builds confidence.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          <div className="card-professional p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FiTarget className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Mission</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              To revolutionize career preparation by providing intelligent, personalized interview coaching that empowers professionals to achieve their career aspirations with confidence and competence.
            </p>
          </div>

          <div className="card-professional p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
                <FiStar className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">Our Vision</h2>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed">
              To become the global leader in AI-powered career development, making professional success accessible to everyone regardless of background or experience level.
            </p>
          </div>
        </div>

        <div className="card-professional p-8 mb-16">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiTrendingUp className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-violet-300">AI-Powered Coaching</h3>
              <p className="text-slate-300">Advanced artificial intelligence provides personalized feedback and coaching tailored to your specific role and experience level.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-violet-300">Comprehensive Question Banks</h3>
              <p className="text-slate-300">Extensive libraries of interview questions across multiple industries, roles, and difficulty levels.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-violet-300">Performance Analytics</h3>
              <p className="text-slate-300">Detailed insights into your progress, strengths, and areas for improvement with actionable recommendations.</p>
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-violet-300">Expert-Curated Content</h3>
              <p className="text-slate-300">Content developed and reviewed by industry professionals and hiring managers from top companies.</p>
            </div>
          </div>
        </div>

        <div className="card-professional p-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl flex items-center justify-center">
              <FiHeart className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUsers className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">User-Centric</h3>
              <p className="text-slate-300">Every feature is designed with our users' success and experience at the forefront.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Innovation</h3>
              <p className="text-slate-300">Continuously pushing boundaries with cutting-edge technology and methodologies.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-violet-500/20 to-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiShield className="w-8 h-8 text-violet-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">Integrity</h3>
              <p className="text-slate-300">Maintaining the highest standards of privacy, security, and ethical practices.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AboutUs;