import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { LuSparkles, LuArrowRight, LuCheck } from 'react-icons/lu';
import { FaRegLightbulb, FaChartLine, FaUserTie, FaRobot } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';
import { useContext } from 'react';
import Modal from '../components/Modal';
import Login from './auth/Login';
import Signup from './auth/Signup';
import ProfileInfoCard from '../components/Cards/ProfileInfoCard';
import { FaGithub, FaLinkedin, FaTwitter, FaFacebook } from 'react-icons/fa';



const features = [
    {
        icon: <FaRobot className="w-8 h-8 text-indigo-400" />,
        title: "AI-Powered Interview Coaching",
        description: "Experience realistic interview scenarios with our advanced AI that provides personalized feedback and adapts to your skill level."
    },
    {
        icon: <FaChartLine className="w-8 h-8 text-blue-400" />,
        title: "Comprehensive Analytics",
        description: "Track your progress with detailed performance metrics, identify strengths and weaknesses, and monitor improvement over time."
    },
    {
        icon: <FaRegLightbulb className="w-8 h-8 text-cyan-400" />,
        title: "Industry-Specific Questions",
        description: "Access thousands of curated questions tailored to your target role, experience level, and specific technology stack."
    }
];

const testimonials = [
    {
        quote: "The AI interviewer helped me land my dream job at Google! The practice was invaluable.",
        author: "Sarah K.",
        role: "Software Engineer"
    },
    {
        quote: "The feedback on my communication skills was spot on. I aced my final interview!",
        author: "Michael T.",
        role: "Product Manager"
    }
];

function LandingPage() {
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [openAuthModel, setOpenAuthModel] = useState(false);
    const [currentPage, setCurrentPage] = useState("login");
    const [isVisible, setIsVisible] = useState(false);


    useEffect(() => {
        setIsVisible(true);
    }, []);

    const handleCTA = () => {
        user ? navigate("/dashboard") : setOpenAuthModel(true);
    };




    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-emerald-600 to-green-600 rounded-lg">
                            <FaUserTie className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">
                            CrackBano
                        </div>
                    </div>
                    {user ? (
                        <ProfileInfoCard />
                    ) : (
                        <button
                            onClick={() => setOpenAuthModel(true)}
                            className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
                        >
                            Get Started Free
                        </button>
                    )}
                </div>
            </nav>

            {/* Hero Section */}
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="container mx-auto px-6 py-12 text-center"
            >
                <div className="max-w-4xl mx-auto">
                <div className="relative inline-flex items-center space-x-2 px-4 py-2 mb-6 rounded-full overflow-hidden">
  {/* Moving line border */}
  <motion.div
    className="absolute inset-0 rounded-full"
    style={{
      background: 'linear-gradient(90deg, transparent, #8B5CF6, transparent)',
      height: '2px',
      width: '100%',
      transformOrigin: 'left center',
    }}
    initial={{ x: '-100%' }}
    animate={{ x: '100%' }}
    transition={{
      duration: 2,
      repeat: Infinity,
      ease: 'linear'
    }}
  />
  
  {/* Content */}
  <div className="relative flex items-center space-x-2 bg-slate-800/50 backdrop-blur-sm px-4 py-1 rounded-full border border-emerald-500/30">
    <LuSparkles className="text-emerald-400" />
    <span className="text-emerald-300 font-medium">
      🤖 Powered by Meta Llama AI
    </span>
  </div>
</div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                        Master Your <span className="bg-gradient-to-r from-emerald-400 to-green-400 bg-clip-text text-transparent">Interview Skills</span> with AI
                    </h1>

                    <p className="text-lg md:text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Transform your interview preparation with personalized AI coaching, real-time feedback, and industry-specific questions designed to help you succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <button
                            onClick={handleCTA}
                            className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-indigo-500/25 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 hover:from-indigo-700 hover:to-blue-700 active:scale-[0.98]"
                        >
                            Start Free Trial
                            <LuArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-slate-600/50 rounded-xl font-semibold text-slate-300 hover:bg-slate-800/50 hover:border-indigo-500/50 hover:text-white transition-all duration-300 backdrop-blur-sm">
                            View Demo
                        </button>
                    </div>

                    <motion.div
                        className="max-w-2xl mx-auto"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <img
                            src={"https://lukaszadam.com/images/free-illustrations/programming.svg"}
                            alt="AI Interview Illustration"
                            className="w-full h-auto max-h-[400px] object-contain opacity-80"
                        />
                    </motion.div>
                </div>
            </motion.section>

            {/* Features Section */}
            <section className="py-20 bg-slate-800/50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Why Choose CrackBano</h2>
                        <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                            Comprehensive interview preparation platform designed by industry experts to maximize your success rate
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="card-professional p-8 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 hover:border-indigo-500/30 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 rounded-2xl flex items-center justify-center mb-6 border border-indigo-500/30 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">{feature.title}</h3>
                                <p className="text-slate-300">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-slate-900/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Get interview-ready in just a few simple steps
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {[1, 2, 3].map((step) => (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: step * 0.1 }}
                                className="text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-indigo-600 to-blue-600 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                                    {step}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-white">Step {step}</h3>
                                <p className="text-slate-300">
                                    {step === 1 && "Sign up for free and complete your professional profile"}
                                    {step === 2 && "Choose your target role, experience level, and focus areas"}
                                    {step === 3 && "Begin personalized interview sessions with AI coaching"}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section className="py-20 bg-slate-800/30">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-white mb-4">Success Stories</h2>
                        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
                            Join thousands of successful candidates who aced their interviews
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-700"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-300 italic mb-6">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-white">{testimonial.author}</p>
                                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="relative py-24 bg-gradient-to-r from-indigo-600 to-blue-600 overflow-hidden"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                {/* Decorative elements */}
                <div className="absolute inset-0 overflow-hidden opacity-10">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-white rounded-full"></div>
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10 container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        Ready to Ace Your Next Interview?
                    </h2>
                    <p className="text-lg md:text-xl text-indigo-100 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join over 10,000+ professionals who have successfully advanced their careers with our AI-powered interview preparation platform
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCTA}
                            className="px-10 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 mx-auto hover:bg-slate-50 active:scale-[0.98]"
                        >
                            Start Your Free Trial
                            <LuArrowRight className="w-5 h-5" />
                        </motion.button>

                    </div>

                </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div className="space-y-4">
                            <div className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
                                CrackBano
                            </div>
                            <p className="text-slate-400">
                                Professional interview preparation platform powered by advanced AI technology. Trusted by thousands of successful candidates worldwide.
                            </p>
                            <div className="flex space-x-4 pt-2">
                                <a
                                    href="https://github.com/yadavakhil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    aria-label="GitHub"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaGithub className="w-5 h-5" />
                                    </div>
                                </a>
                                <a
                                    href="https://linkedin.com/in/yadavakhil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    aria-label="LinkedIn"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaLinkedin className="w-5 h-5" />
                                    </div>
                                </a>
                                <a
                                    href="https://twitter.com/yadavakhil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-slate-400 hover:text-white transition-colors"
                                    aria-label="Twitter"
                                >
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                                        <FaTwitter className="w-5 h-5" />
                                    </div>
                                </a>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Product</h3>
                            <ul className="space-y-3">
                               
                                <li className="pt-2">
                                    <a
                                        href="https://resources.internetfreedom.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-white transition-colors flex items-center"
                                    >
                                        Resources
                                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://links.internetfreedom.in/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-white transition-colors flex items-center"
                                    >
                                        Links
                                        <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Company</h3>
                            <ul className="space-y-3">
                                {['About Us', 'Contact'].map((item) => (
                                    <li key={item}>
                                        <a
                                            href={item === 'About Us' ? '/about' : '/contact'}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {item}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-white font-semibold text-lg mb-4">Legal</h3>
                            <ul className="space-y-3">
                                {[

                                    { name: 'Terms of Service', path: '/terms-of-service' }

                                ].map((item) => (
                                    <li key={item.name}>
                                        <a
                                            href={item.path}
                                            className="text-slate-400 hover:text-white transition-colors"
                                        >
                                            {item.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-slate-700 pt-6 flex flex-col md:flex-row justify-between items-center">
                        <p className="text-slate-400 text-sm mb-4 md:mb-0">
                            &copy; {new Date().getFullYear()} CrackBano. All rights reserved.
                        </p>
                        <div className="flex items-center space-x-4">
  {/* Other links */}
  <a 
    href="https://www.buymeacoffee.com/yadavakhil" 
    target="_blank" 
    rel="noopener noreferrer"
    className="flex items-center space-x-1 bg-indigo-600 hover:bg-indigo-700 text-white text-xs px-2 py-1 rounded transition-colors"
  >
    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
    <span>Buy me a coffee</span>
  </a>
</div>
                    </div>
                </div>
            </footer>

            {/* Auth Modal */}
            <Modal
                isOpen={openAuthModel}
                onClose={() => {
                    setOpenAuthModel(false);
                    setCurrentPage("login");
                }}
                hideHeader
            >
                {currentPage === "login" && <Login setCurrentPage={setCurrentPage} />}
                {currentPage === "signup" && <Signup setCurrentPage={setCurrentPage} />}
            </Modal>
        </div>
    );
}

export default LandingPage;