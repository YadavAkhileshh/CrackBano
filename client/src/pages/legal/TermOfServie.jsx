// src/pages/legal/TermOfServie.jsx
import React from 'react';
import { FiFileText, FiShield, FiUsers, FiAlertCircle } from 'react-icons/fi';
import DashboardLayout from '../../components/layouts/DashboardLayout';

function TermsOfService() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiFileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-4">Terms of Service</h1>
          <p className="text-slate-300 text-lg">Last updated: {new Date().toLocaleDateString()}</p>
        </div>
        
        <div className="card-professional p-8">
          <div className="space-y-8">
            <section className="border-b border-slate-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FiShield className="w-5 h-5 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">1. Acceptance of Terms</h2>
              </div>
              <p className="text-slate-300 leading-relaxed">
                By accessing or using CrackBano, you agree to be bound by these Terms of Service and our Privacy Policy. If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FiUsers className="w-5 h-5 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">2. Service Description</h2>
              </div>
              <p className="text-slate-300 leading-relaxed mb-4">
                CrackBano provides AI-powered interview preparation services including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-slate-300">
                <li>Personalized interview question generation</li>
                <li>AI-driven feedback and coaching</li>
                <li>Performance analytics and progress tracking</li>
                <li>Industry-specific preparation materials</li>
              </ul>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <div className="flex items-center gap-3 mb-4">
                <FiAlertCircle className="w-5 h-5 text-violet-400" />
                <h2 className="text-2xl font-bold text-white">3. User Responsibilities</h2>
              </div>
              <div className="space-y-4 text-slate-300">
                <p>By using our service, you agree to:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Be at least 16 years old or have parental consent</li>
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security and confidentiality of your account credentials</li>
                  <li>Use the service only for lawful purposes</li>
                  <li>Not attempt to reverse engineer or compromise our systems</li>
                  <li>Respect intellectual property rights</li>
                </ul>
              </div>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <h2 className="text-2xl font-bold text-white mb-4">4. Privacy and Data Protection</h2>
              <p className="text-slate-300 leading-relaxed">
                We take your privacy seriously. Our collection, use, and protection of your personal information is governed by our Privacy Policy. We implement industry-standard security measures to protect your data.
              </p>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <h2 className="text-2xl font-bold text-white mb-4">5. Intellectual Property</h2>
              <p className="text-slate-300 leading-relaxed">
                All content, features, and functionality of CrackBano are owned by us and are protected by copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written permission.
              </p>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <h2 className="text-2xl font-bold text-white mb-4">6. Service Availability</h2>
              <p className="text-slate-300 leading-relaxed">
                We strive to maintain high service availability but cannot guarantee uninterrupted access. We reserve the right to modify, suspend, or discontinue any part of our service with reasonable notice.
              </p>
            </section>

            <section className="border-b border-slate-700 pb-6">
              <h2 className="text-2xl font-bold text-white mb-4">7. Limitation of Liability</h2>
              <p className="text-slate-300 leading-relaxed">
                CrackBano is provided "as is" without warranties. We are not liable for any indirect, incidental, or consequential damages arising from your use of our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">8. Contact Information</h2>
              <p className="text-slate-300 leading-relaxed">
                If you have questions about these Terms of Service, please contact us at support@interviewacepro.com
              </p>
            </section>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TermsOfService;