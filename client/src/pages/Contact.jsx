import React, { useState } from 'react';
import { FaLinkedin, FaTwitter, FaGithub } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin, FiSend, FiMessageCircle } from 'react-icons/fi';
import DashboardLayout from '../components/layouts/DashboardLayout';
import Input from '../components/Inputs/Input';

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="text-center mb-16">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiMessageCircle className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Get In Touch
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Have questions about CrackBano? We'd love to hear from you and help you succeed in your career journey.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="card-professional p-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <Input
                label="Your Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="Enter your full name"
                required
              />
              <Input
                label="Email Address"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                placeholder="Enter your email"
                required
              />
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Tell us how we can help you..."
                  rows={5}
                  className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-slate-800 placeholder-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-100 transition-all duration-200"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">
                <FiSend className="w-4 h-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div className="card-professional p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <FiMail className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold">Email</h3>
                    <p className="text-slate-600">support@crackbano.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <FiPhone className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold">Phone</h3>
                    <p className="text-slate-600">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center">
                    <FiMapPin className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <h3 className="text-slate-900 font-semibold">Location</h3>
                    <p className="text-slate-600">Pune, India</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-professional p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Follow Us</h2>
              <div className="flex gap-4">
                <a
                  href="https://linkedin.com/in/yakhilesh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
                >
                  <FaLinkedin className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://x.com/_Yakhil"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
                >
                  <FaTwitter className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://github.com/YadavAkhileshh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-xl flex items-center justify-center hover:from-teal-700 hover:to-cyan-700 transition-all duration-300"
                >
                  <FaGithub className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Contact;
