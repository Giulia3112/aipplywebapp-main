import React from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Zap } from 'lucide-react';

const Logo = () => (
    <div className="flex items-center space-x-2">
        <div className="p-2 bg-neon-blue rounded-lg">
            <Zap className="h-6 w-6 text-white" />
        </div>
        <span className="text-2xl font-bold text-white">AIpply</span>
    </div>
);

export default function PrivacyPolicyPage() {
    return (
        <>
            <Helmet>
                <title>Privacy Policy - AIpply</title>
                <meta name="description" content="Privacy Policy for AIpply. Learn how we handle your data with care and in compliance with LGPD." />
            </Helmet>

            <div className="min-h-screen bg-[#0A0A0A] text-gray-200">
                <div className={`absolute inset-0 h-full w-full bg-transparent bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]`}></div>
                <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#2D5FFF_100%)]"></div>

                <header className="absolute top-0 left-0 right-0 p-6 z-10">
                    <nav className="container mx-auto flex justify-between items-center">
                        <Link to="/"><Logo /></Link>
                        <a 
                            href="mailto:alvaresgiulia@gmail.com" 
                            className="text-neon-blue border border-neon-blue/50 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-neon-blue/10 transition-colors"
                        >
                            Get in touch
                        </a>
                    </nav>
                </header>

                <main className="container mx-auto px-6 relative z-0 pt-32 pb-16">
                    <div className="max-w-4xl mx-auto bg-gray-900/50 p-8 md:p-12 rounded-2xl border border-gray-700/50">
                        <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">Privacy Policy - AIpply</h1>
                        <p className="text-gray-400 mb-8">Last updated: August 8, 2025</p>

                        <div className="prose prose-invert prose-lg max-w-none text-gray-300 space-y-6">
                            <h2 className="text-2xl font-bold text-white">1. Commitment to Privacy</h2>
                            <p>Your privacy is a priority for AIpply. This Privacy Policy aims to clarify which data we collect, how it is used, stored, and protected, always in accordance with the Brazilian General Data Protection Law (LGPD) – Law No. 13.709/2018.</p>

                            <h2 className="text-2xl font-bold text-white">2. Data We Collect</h2>
                            <p>We collect only the personal data strictly necessary to enable the app’s functionality and provide a personalized and secure experience. This includes:</p>
                            <ul>
                                <li>Full name;</li>
                                <li>Email address;</li>
                                <li>Login information;</li>
                                <li>Profile picture (optional);</li>
                                <li>Application history and user preferences (for personalization);</li>
                                <li>Documents and files voluntarily uploaded by the user.</li>
                            </ul>

                            <h2 className="text-2xl font-bold text-white">3. Purpose of Data Use</h2>
                            <p>All collected data is used exclusively for:</p>
                             <ul>
                                <li>Authentication and identity verification;</li>
                                <li>Account and user history management;</li>
                                <li>Personalizing the app experience, such as tailored recommendations and opportunity suggestions;</li>
                                <li>Continuous improvement of the service based on user interactions.</li>
                            </ul>
                            <p>We do not use your data for commercial or advertising purposes, nor do we share it with third parties for such purposes.</p>

                            <h2 className="text-2xl font-bold text-white">4. Data Sharing</h2>
                            <p>AIpply does not sell, rent, or share users’ personal data with third parties, except when strictly necessary for the app's operation (e.g., hosting and authentication services), and always in compliance with this Policy and applicable laws.</p>

                            <h2 className="text-2xl font-bold text-white">5. Data Security</h2>
                            <p>We adopt appropriate technical and administrative measures to protect your data against unauthorized access, destruction, loss, alteration, or any form of improper or unlawful processing. We use encryption, secure authentication, and safe development practices.</p>

                            <h2 className="text-2xl font-bold text-white">6. Data Storage</h2>
                            <p>Your data is stored in secure and controlled environments, preferably on servers located in Brazil or in countries that provide a level of data protection compatible with the LGPD.</p>

                            <h2 className="text-2xl font-bold text-white">7. User Rights</h2>
                            <p>Under the LGPD, you have the right to:</p>
                            <ul>
                                <li>Access your personal data;</li>
                                <li>Correct incomplete, inaccurate, or outdated data;</li>
                                <li>Request the deletion of your data, when applicable;</li>
                                <li>Revoke your consent at any time;</li>
                                <li>Request the portability of your data.</li>
                            </ul>
                            <p>To exercise your rights, contact us at: <a href="mailto:contato@aipply.tech" className="text-neon-blue hover:underline">contato@aipply.tech</a></p>

                            <h2 className="text-2xl font-bold text-white">8. Data Retention and Deletion</h2>
                            <p>We will retain your data only for as long as necessary to fulfill the purposes described in this Policy or as required by legal obligations. You may request the deletion of your account and personal data at any time.</p>

                            <h2 className="text-2xl font-bold text-white">9. Changes to This Policy</h2>
                            <p>We may update this Privacy Policy from time to time. You will be notified of any material changes via the app or email. We recommend that you review this document regularly.</p>

                            <h2 className="text-2xl font-bold text-white">10. Contact</h2>
                            <p>If you have any questions about this Privacy Policy or how your data is processed, please contact us:</p>
                            <p>
                                📧 <a href="mailto:contato@aipply.tech" className="text-neon-blue hover:underline">contato@aipply.tech</a><br/>
                                🌐 <a href="https://www.aipply.tech" target="_blank" rel="noopener noreferrer" className="text-neon-blue hover:underline">www.aipply.tech</a>
                            </p>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}