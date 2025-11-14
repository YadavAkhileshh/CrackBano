import React from 'react';
import { FiShield, FiLock, FiEye, FiDatabase } from 'react-icons/fi';
import DashboardLayout from '../../components/layouts/DashboardLayout';

function PrivacyPolicy() {
  return (
    <DashboardLayout>
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-slate-600">Last updated: {new Date().toLocaleDateString()}</p>
        </div>

        <div className="card-professional p-8 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              At CrackBano, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered interview preparation platform.
            </p>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiDatabase className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-slate-900">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-slate-600">
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Personal Information</h3>
                <p>We collect information that you provide directly to us, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Name and email address</li>
                  <li>Profile information and preferences</li>
                  <li>Interview session data and responses</li>
                  <li>Communication preferences</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-2">Usage Information</h3>
                <p>We automatically collect certain information about your device and how you interact with our platform, including:</p>
                <ul className="list-disc list-inside ml-4 mt-2 space-y-1">
                  <li>Device information and IP address</li>
                  <li>Browser type and version</li>
                  <li>Usage patterns and preferences</li>
                  <li>Performance metrics</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiEye className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-slate-900">How We Use Your Information</h2>
            </div>
            <p className="text-slate-600 mb-3">We use the information we collect to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
              <li>Provide, maintain, and improve our services</li>
              <li>Personalize your interview preparation experience</li>
              <li>Generate AI-powered interview questions and feedback</li>
              <li>Communicate with you about updates and features</li>
              <li>Analyze usage patterns to enhance platform performance</li>
              <li>Ensure platform security and prevent fraud</li>
            </ul>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-4">
              <FiLock className="w-6 h-6 text-teal-600" />
              <h2 className="text-2xl font-bold text-slate-900">Data Security</h2>
            </div>
            <p className="text-slate-600 leading-relaxed">
              We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. This includes encryption, secure servers, and regular security audits.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-slate-600 mb-3">You have the right to:</p>
            <ul className="list-disc list-inside ml-4 space-y-2 text-slate-600">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your information</li>
              <li>Export your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              We use third-party AI services (Meta Llama, Cerebras) to power our interview preparation features. These services process your interview data according to their own privacy policies. We ensure all third-party providers maintain appropriate data protection standards.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Cookies and Tracking</h2>
            <p className="text-slate-600 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your experience, analyze usage, and personalize content. You can control cookie preferences through your browser settings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-slate-600 leading-relaxed">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 p-4 bg-teal-50 rounded-lg border border-teal-200">
              <p className="text-slate-900 font-medium">Email: privacy@crackbano.com</p>
              <p className="text-slate-600 mt-1">Address: Pune, India</p>
            </div>
          </section>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default PrivacyPolicy;
