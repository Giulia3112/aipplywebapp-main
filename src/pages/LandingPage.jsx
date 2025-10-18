import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Zap, ChevronRight, MoveRight, ListFilter, FileText, PenLine, LayoutDashboard, Award, Rocket, ShieldCheck, Crown, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/customSupabaseClient';
import { useToast } from "@/components/ui/use-toast";

const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="p-2 bg-neon-blue rounded-lg">
            <Zap className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">AIpply</span>
    </div>
);

const FeatureCard = ({ icon, title, children }) => (
    <motion.div 
        className="bg-gray-800/50 p-6 rounded-2xl border border-gray-700/50 h-full"
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(45, 95, 255, 0.3)" }}
    >
        <div className="mb-4 text-neon-blue">{icon}</div>
        <h3 className="font-bold text-xl text-white mb-2">{title}</h3>
        <p className="text-gray-400">{children}</p>
    </motion.div>
);

const BenefitListItem = ({ icon, children }) => (
    <motion.li 
        className="flex items-start space-x-4 p-4 rounded-lg transition-colors hover:bg-gray-800/50"
        variants={{
            hidden: { opacity: 0, x: -20 },
            visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
        }}
    >
        <div className="flex-shrink-0 text-neon-blue mt-1">{icon}</div>
        <p className="text-gray-300">{children}</p>
    </motion.li>
);

export default function LandingPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const { toast } = useToast();

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email) {
            toast({
                variant: "destructive",
                title: "Email is required",
                description: "Please enter your email address to join the waitlist.",
            });
            return;
        }
        setLoading(true);
        try {
            const { error } = await supabase
                .from('waitlist')
                .insert([{ email }]);

            if (error) {
                if (error.code === '23505') { // Unique constraint violation
                    toast({
                        title: "You're already on the list!",
                        description: "No need to sign up again. We'll be in touch!",
                    });
                } else {
                    throw error;
                }
            } else {
                toast({
                    title: "Success!",
                    description: "You've been added to our waitlist. We'll notify you!",
                });
                setEmail('');
            }
        } catch (error) {
             toast({
                variant: "destructive",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request. Please try again.",
            });
            console.error('Error submitting to waitlist:', error);
        } finally {
            setLoading(false);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } }
    };

    return (
        <>
            <Helmet>
                <title>AIpply - Automate your applications with AI</title>
                <meta name="description" content="Get ready for AIpply's launch. The future of opportunity search and applications is coming." />
            </Helmet>

            <div className="min-h-screen bg-[#0A0A0A] text-gray-200 overflow-x-hidden">
                <div className={`absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`}></div>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2D5FFF_100%)]"></div>
                
                <header className="absolute top-0 left-0 right-0 p-6 z-10">
                    <nav className="container mx-auto flex justify-between items-center">
                        <Logo />
                        <div className="flex gap-3">
                            <Link 
                                to="/search-demo"
                                className="bg-neon-blue text-white px-6 py-3 rounded-lg text-sm font-bold hover:brightness-125 transition-all shadow-lg shadow-neon-blue/25"
                            >
                                🔍 Try AI Search Now
                            </Link>
                            <button 
                                onClick={() => {
                                    // Try multiple methods to open email
                                    try {
                                        // Method 1: Direct mailto link
                                        window.location.href = 'mailto:contact@aipply.tech';
                                        
                                        // Method 2: Create temporary link and click it
                                        setTimeout(() => {
                                            const link = document.createElement('a');
                                            link.href = 'mailto:contact@aipply.tech';
                                            link.target = '_blank';
                                            link.click();
                                        }, 100);
                                        
                                        // Method 3: Show email address as fallback
                                        setTimeout(() => {
                                            const email = prompt('Email client not found. Please copy this email address:', 'contact@aipply.tech');
                                            if (email) {
                                                navigator.clipboard.writeText('contact@aipply.tech').then(() => {
                                                    alert('Email address copied to clipboard: contact@aipply.tech');
                                                }).catch(() => {
                                                    alert('Email address: contact@aipply.tech');
                                                });
                                            }
                                        }, 2000);
                                    } catch (error) {
                                        console.error('Error opening email:', error);
                                        alert('Email address: contact@aipply.tech');
                                    }
                                }}
                                className="text-gray-300 border border-gray-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-800/50 transition-colors"
                            >
                                Contact
                            </button>
                        </div>
                    </nav>
                </header>

                <main className="container mx-auto px-6 relative z-0">
                    <motion.section 
                        className="text-center pt-48 pb-24"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={itemVariants}>
                            <Badge text="🚀 Live Demo Available" />
                        </motion.div>
                        <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-extrabold text-white my-6 leading-tight">
                            Find opportunities with <span className="text-neon-blue">AI-powered search</span>
                        </motion.h1>
                        <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
                            Test our AI agent that searches 30+ sources for scholarships, fellowships, and accelerator programs. 
                            <span className="text-white font-semibold"> Try it now - no signup required!</span>
                        </motion.p>
                        
                        {/* Primary CTA - Demo */}
                        <motion.div variants={itemVariants} className="mb-8">
                            <Link 
                                to="/search-demo"
                                className="inline-flex items-center bg-neon-blue text-white font-bold px-8 py-4 rounded-xl text-lg hover:brightness-125 transition-all shadow-2xl shadow-neon-blue/25 hover:shadow-neon-blue/40"
                            >
                                🔍 Try AI Search Demo <MoveRight className="h-6 w-6 ml-3" />
                            </Link>
                            <p className="text-sm text-gray-500 mt-3">
                                Free • No registration needed • Real results in seconds
                            </p>
                        </motion.div>

                        {/* Secondary CTA - Waitlist */}
                        <motion.div variants={itemVariants} className="max-w-md mx-auto">
                            <p className="text-gray-400 text-sm mb-4">Want to be notified when AI-assisted applications launch?</p>
                            <form 
                                onSubmit={handleEmailSubmit} 
                                className="flex flex-col sm:flex-row gap-3"
                            >
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Your email for updates"
                                    className="flex-grow bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-neon-blue focus:outline-none transition-all text-sm"
                                />
                                <button type="submit" disabled={loading} className="bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                    {loading ? 'Joining...' : 'Get Updates'} <MoveRight className="h-4 w-4 ml-2" />
                                </button>
                            </form>
                        </motion.div>
                    </motion.section>

                    <motion.section 
                        className="py-24"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-white mb-4">
                            Try Our AI Search Engine
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-center text-gray-400 mb-12 text-lg max-w-2xl mx-auto">
                            Our AI agent searches through 30+ trusted sources to find the perfect opportunities for you. 
                            <span className="text-white font-semibold">Test it now with real data!</span>
                        </motion.p>
                        
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            <motion.div variants={itemVariants}>
                                <FeatureCard icon={<Search size={32} />} title="🔍 AI-Powered Search">
                                    Search 30+ sources including Fulbright, Techstars, Y Combinator, and more. Get real results in seconds.
                                </FeatureCard>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FeatureCard icon={<Zap size={32} />} title="⚡ Instant Results">
                                    No more endless browsing. Our AI finds relevant opportunities based on your keywords, location, and interests.
                                </FeatureCard>
                            </motion.div>
                            <motion.div variants={itemVariants}>
                                <FeatureCard icon={<ShieldCheck size={32} />} title="✅ Trusted Sources">
                                    All opportunities come from verified sources: universities, governments, and established organizations.
                                </FeatureCard>
                            </motion.div>
                        </div>
                        
                        <motion.div variants={itemVariants} className="text-center mt-12">
                            <Link 
                                to="/search-demo"
                                className="inline-flex items-center bg-neon-blue text-white font-bold px-8 py-4 rounded-xl text-lg hover:brightness-125 transition-all shadow-2xl shadow-neon-blue/25 hover:shadow-neon-blue/40"
                            >
                                🚀 Test the AI Search Now <MoveRight className="h-6 w-6 ml-3" />
                            </Link>
                            <p className="text-sm text-gray-500 mt-3">
                                Try searching for "computer science scholarships" or "startup accelerator"
                            </p>
                        </motion.div>
                    </motion.section>

                    <motion.section 
                        className="py-24"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-center text-white mb-12">
                            Coming Soon: AI-Assisted Applications
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-center text-gray-400 mb-12 text-lg max-w-3xl mx-auto">
                            After you find opportunities with our AI search, we're building the next phase: 
                            <span className="text-neon-blue font-semibold"> AI-assisted application writing</span>
                        </motion.p>
                        
                        <div className="max-w-4xl mx-auto">
                            <div className="grid md:grid-cols-2 gap-8">
                                <motion.div variants={itemVariants} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <FileText className="mr-3 text-neon-blue" size={24} />
                                        AI Document Reader
                                    </h3>
                                    <p className="text-gray-400">
                                        Upload opportunity requirements and get instant summaries of eligibility criteria, deadlines, and key information.
                                    </p>
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <PenLine className="mr-3 text-neon-blue" size={24} />
                                        AI Writing Assistant
                                    </h3>
                                    <p className="text-gray-400">
                                        Get personalized essay suggestions, application tips, and draft responses tailored to each opportunity.
                                    </p>
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <LayoutDashboard className="mr-3 text-neon-blue" size={24} />
                                        Application Dashboard
                                    </h3>
                                    <p className="text-gray-400">
                                        Track all your applications, deadlines, and responses in one place with AI-powered insights.
                                    </p>
                                </motion.div>
                                
                                <motion.div variants={itemVariants} className="bg-gray-800/30 p-6 rounded-xl border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                                        <Crown className="mr-3 text-neon-blue" size={24} />
                                        Success Network
                                    </h3>
                                    <p className="text-gray-400">
                                        Connect with successful applicants and become an ambassador for lifetime free access.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                        
                        <motion.div variants={itemVariants} className="text-center mt-12">
                            <div className="bg-gradient-to-r from-neon-blue/10 to-purple-500/10 p-6 rounded-xl border border-neon-blue/20 max-w-2xl mx-auto">
                                <p className="text-gray-300 mb-4">
                                    <span className="text-white font-semibold">Want early access to AI-assisted applications?</span>
                                </p>
                                <p className="text-sm text-gray-400 mb-4">
                                    Join our waitlist to be the first to experience the complete AIpply ecosystem.
                                </p>
                                <form onSubmit={handleEmailSubmit} className="flex gap-3 max-w-md mx-auto">
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Your email"
                                        className="flex-grow bg-gray-800/50 text-white px-4 py-3 rounded-lg border border-gray-700/50 focus:ring-2 focus:ring-neon-blue focus:outline-none transition-all text-sm"
                                    />
                                    <button type="submit" disabled={loading} className="bg-neon-blue text-white font-semibold px-6 py-3 rounded-lg hover:brightness-125 transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed text-sm">
                                        {loading ? 'Joining...' : 'Get Early Access'} <MoveRight className="h-4 w-4 ml-2" />
                                    </button>
                                </form>
                            </div>
                        </motion.div>
                    </motion.section>

                    <motion.section
                        className="py-24 text-center"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.2 }}
                    >
                        <motion.h2 variants={itemVariants} className="text-4xl font-bold text-white mb-6">
                            Ready to find your next opportunity?
                        </motion.h2>
                        <motion.p variants={itemVariants} className="text-lg text-gray-400 max-w-2xl mx-auto mb-8">
                            Start with our AI search demo today. Then join the waitlist for AI-assisted applications coming soon.
                        </motion.p>
                        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Link 
                                to="/search-demo"
                                className="bg-neon-blue text-white font-bold px-8 py-4 rounded-xl text-lg hover:brightness-125 transition-all shadow-2xl shadow-neon-blue/25 hover:shadow-neon-blue/40 flex items-center"
                            >
                                🔍 Try AI Search Demo <MoveRight className="h-6 w-6 ml-2" />
                            </Link>
                            <button 
                                onClick={() => document.querySelector('input[type="email"]').focus()}
                                className="bg-gray-700 text-white font-semibold px-8 py-4 rounded-xl hover:bg-gray-600 transition-colors flex items-center text-lg"
                            >
                                📧 Join Waitlist <MoveRight className="h-6 w-6 ml-2" />
                            </button>
                        </motion.div>
                    </motion.section>
                </main>

                <footer className="bg-gray-900/50 border-t border-gray-800/50 mt-12">
                    <div className="container mx-auto px-6 py-8 text-center text-gray-400">
                        <div className="flex justify-center mb-4">
                           <Logo />
                        </div>
                        <p className="my-4">The future of opportunity applications is coming.</p>
                         <div className="my-4">
                            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                                Privacy Policy
                            </Link>
                        </div>
                        <p>&copy; {new Date().getFullYear()} AIpply. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}

const Badge = ({ text }) => (
    <span className="inline-block bg-neon-blue/20 text-neon-blue text-sm font-semibold px-4 py-1 rounded-full border border-neon-blue/30">
        {text}
    </span>
);