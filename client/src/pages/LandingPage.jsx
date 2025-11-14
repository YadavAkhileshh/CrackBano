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
        <div className="min-h-screen bg-gradient-to-br from-white via-slate-50 to-slate-100">
            {/* Navigation */}
            <nav className="container mx-auto px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-lg">
                            <FaUserTie className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                            CrackBano
                        </div>
                    </div>
                    {user ? (
                        <ProfileInfoCard />
                    ) : (
                        <button
                            onClick={() => setOpenAuthModel(true)}
                            className="px-8 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 hover:from-teal-700 hover:to-cyan-700 active:scale-[0.98]"
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
                <div className="inline-flex items-center mb-6">
  <div className="flex items-center space-x-2 bg-white px-5 py-2 rounded-full border-2 border-teal-400 shadow-lg shadow-teal-200/50">
    <LuSparkles className="text-teal-600" />
    <span className="text-teal-700 font-semibold">
      Powered by Meta Llama AI
    </span>
  </div>
</div>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                        Master Your <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Interview Skills</span> with AI
                    </h1>

                    <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                        Transform your interview preparation with personalized AI coaching, real-time feedback, and industry-specific questions designed to help you succeed.
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-12">
                        <button
                            onClick={handleCTA}
                            className="px-8 sm:px-10 py-4 sm:py-5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl font-bold text-base sm:text-lg hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 hover:from-teal-700 hover:to-cyan-700 active:scale-[0.98]"
                        >
                            Start Free Trial
                            <LuArrowRight className="w-5 h-5" />
                        </button>
                        <button className="px-8 sm:px-10 py-4 sm:py-5 border-2 border-slate-300 rounded-xl font-semibold text-slate-700 hover:bg-slate-50 hover:border-teal-500 hover:text-teal-600 transition-all duration-300">
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
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Why Choose CrackBano</h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
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
                                className="card-professional p-8 hover:shadow-xl hover:shadow-teal-500/10 transition-all duration-300 hover:border-teal-500/30 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-600/20 to-cyan-600/20 rounded-2xl flex items-center justify-center mb-6 border border-teal-500/30 group-hover:scale-110 transition-transform duration-300">
                                    {feature.icon}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900">{feature.title}</h3>
                                <p className="text-slate-600">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">How It Works</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                                <div className="w-16 h-16 bg-gradient-to-br from-teal-600 to-cyan-600 rounded-full shadow-lg flex items-center justify-center text-2xl font-bold text-white mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                                    {step}
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-slate-900">Step {step}</h3>
                                <p className="text-slate-600">
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
            <section className="py-20 bg-slate-50">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-slate-900 mb-4">Success Stories</h2>
                        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
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
                                className="bg-white p-8 rounded-2xl shadow-lg border border-slate-200"
                            >
                                <div className="flex items-center mb-4">
                                    {[...Array(5)].map((_, i) => (
                                        <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    ))}
                                </div>
                                <p className="text-slate-700 italic mb-6">"{testimonial.quote}"</p>
                                <div>
                                    <p className="font-semibold text-slate-900">{testimonial.author}</p>
                                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="relative py-24 bg-gradient-to-r from-teal-600 to-cyan-600 overflow-hidden"
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
                        Start Your Interview Prep Journey Today
                    </h2>
                    <p className="text-lg md:text-xl text-teal-50 mb-10 max-w-3xl mx-auto leading-relaxed">
                        Join professionals worldwide mastering their interview skills with personalized AI coaching
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCTA}
                            className="px-10 py-4 bg-white text-teal-600 rounded-xl font-bold text-lg hover:shadow-2xl transform transition-all duration-300 flex items-center justify-center gap-3 mx-auto hover:bg-slate-50 active:scale-[0.98]"
                        >
                            Get Started Free
                            <LuArrowRight className="w-5 h-5" />
                        </motion.button>

                    </div>

                </div>
            </motion.section>

            {/* Footer */}
            <footer className="bg-slate-900 text-white pt-16 pb-8">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
                        {/* Brand Section */}
                        <div className="space-y-4 sm:col-span-2 lg:col-span-1">
                            <div className="text-2xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
                                CrackBano
                            </div>
                            <p className="text-slate-400 text-sm leading-relaxed">
                                AI-powered interview preparation platform helping professionals ace their interviews.
                            </p>
                            <div className="flex space-x-3 pt-2">
                                <a
                                    href="https://github.com/YadavAkhileshh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                                    aria-label="GitHub"
                                >
                                    <FaGithub className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/yakhilesh/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                                    aria-label="LinkedIn"
                                >
                                    <FaLinkedin className="w-5 h-5" />
                                </a>
                                <a
                                    href="https://x.com/_Yakhil"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-teal-600 transition-all duration-300 hover:scale-110"
                                    aria-label="Twitter"
                                >
                                    <FaTwitter className="w-5 h-5" />
                                </a>
                            </div>
                        </div>

                        {/* Product Section */}
                        <div>
                            <h3 className="text-white font-semibold text-base mb-4">Product</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a
                                        href="/dashboard"
                                        className="text-slate-400 hover:text-teal-400 transition-colors text-sm"
                                    >
                                        Dashboard
                                    </a>
                                </li>
                                <li>
                                    <a
                                        href="https://linkkshala.vercel.app/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-slate-400 hover:text-teal-400 transition-colors text-sm inline-flex items-center gap-1"
                                    >
                                        Resources
                                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Company Section */}
                        <div>
                            <h3 className="text-white font-semibold text-base mb-4">Company</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/about" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                                        About Us
                                    </a>
                                </li>
                                <li>
                                    <a href="/contact" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                                        Contact
                                    </a>
                                </li>
                            </ul>
                        </div>

                        {/* Legal Section */}
                        <div>
                            <h3 className="text-white font-semibold text-base mb-4">Legal</h3>
                            <ul className="space-y-2">
                                <li>
                                    <a href="/terms-of-service" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                                        Terms of Service
                                    </a>
                                </li>
                                <li>
                                    <a href="/privacy" className="text-slate-400 hover:text-teal-400 transition-colors text-sm">
                                        Privacy Policy
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Bar */}
                    <div className="border-t border-slate-800 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-slate-400 text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} CrackBano. All rights reserved.
                        </p>
                        <a 
                            href="https://www.buymeacoffee.com/yakhilesh" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-teal-500/30"
                        >
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M20.216 6.415l-.132-.666c-.119-.598-.388-1.163-1.001-1.379-.197-.069-.42-.098-.57-.241-.152-.143-.196-.366-.231-.572-.065-.378-.125-.756-.192-1.133-.057-.325-.102-.69-.25-.987-.195-.4-.597-.634-.996-.788a5.723 5.723 0 00-.626-.194c-1-.263-2.05-.36-3.077-.416a25.834 25.834 0 00-3.7.062c-.915.083-1.88.184-2.75.5-.318.116-.646.256-.888.501-.297.302-.393.77-.177 1.146.154.267.415.456.692.58.36.162.737.284 1.123.366 1.075.238 2.189.331 3.287.37 1.218.05 2.437.01 3.65-.118.299-.033.598-.073.896-.119.352-.054.578-.513.474-.834-.124-.383-.457-.531-.834-.473-.466.074-.96.108-1.382.146-1.177.08-2.358.082-3.536.006a22.228 22.228 0 01-1.157-.107c-.086-.01-.18-.025-.258-.036-.243-.036-.484-.08-.724-.13-.111-.027-.111-.185 0-.212h.005c.277-.06.557-.108.838-.147h.002c.131-.009.263-.032.394-.048a25.076 25.076 0 013.426-.12c.674.019 1.347.067 2.017.144l.228.031c.267.04.533.088.798.145.392.085.895.113 1.07.542.055.137.08.288.111.431l.319 1.484a.237.237 0 01-.199.284h-.003c-.037.006-.075.01-.112.015a36.704 36.704 0 01-4.743.295 37.059 37.059 0 01-4.699-.304c-.14-.017-.293-.042-.417-.06-.326-.048-.649-.108-.973-.161-.393-.065-.768-.032-1.123.161-.29.16-.527.404-.675.701-.154.316-.199.66-.267 1-.069.34-.176.707-.135 1.056.087.753.613 1.365 1.37 1.502a39.69 39.69 0 0011.343.376.483.483 0 01.535.53l-.071.697-1.018 9.907c-.041.41-.047.832-.125 1.237-.122.637-.553 1.028-1.182 1.171-.577.131-1.165.2-1.756.205-.656.004-1.31-.025-1.966-.022-.699.004-1.556-.06-2.095-.58-.475-.458-.54-1.174-.605-1.793l-.731-7.013-.322-3.094c-.037-.351-.286-.695-.678-.678-.336.015-.718.3-.678.679l.228 2.185.949 9.112c.147 1.344 1.174 2.068 2.446 2.272.742.12 1.503.144 2.257.156.966.016 1.942.053 2.892-.122 1.408-.258 2.465-1.198 2.616-2.657.34-3.332.683-6.663 1.024-9.995l.215-2.087a.484.484 0 01.39-.426c.402-.078.787-.212 1.074-.518.455-.488.546-1.124.385-1.766zm-1.478.772c-.145.137-.363.201-.578.233-2.416.359-4.866.54-7.308.46-1.748-.06-3.477-.254-5.207-.498-.17-.024-.353-.055-.47-.18-.22-.236-.111-.71-.054-.995.052-.26.152-.609.463-.646.484-.057 1.046.148 1.526.22.577.088 1.156.159 1.737.212 2.48.226 5.002.19 7.472-.14.45-.06.899-.13 1.345-.21.399-.072.84-.206 1.08.206.166.281.188.657.162.974a.544.544 0 01-.169.364zm-6.159 3.9c-.862.37-1.84.788-3.109.788a5.884 5.884 0 01-1.569-.217l.877 9.004c.065.78.717 1.38 1.5 1.38 0 0 1.243.065 1.658.065.447 0 1.786-.065 1.786-.065.783 0 1.434-.6 1.499-1.38l.94-9.95a3.996 3.996 0 00-1.322-.238c-.826 0-1.491.284-2.26.613z"/>
                            </svg>
                            <span>Buy me a coffee</span>
                        </a>
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