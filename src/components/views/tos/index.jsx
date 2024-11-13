import React from 'react';
import './tos.css';

const TermsOfService = () => {
    return (
        <div className="terms-container">
            <h1 className="terms-header">Terms of Service and User Agreement</h1>
            <p className="terms-date">Last Updated: [Date]</p>

            <section className="terms-section">
                <h2>1. Introduction</h2>
                <p>
                    Welcome to our book-sharing library! By using this platform, you agree to the following terms and conditions. Please read these carefully.
                </p>
            </section>

            <section className="terms-section">
                <h2>2. Eligibility</h2>
                <p>
                    To use this platform, you must be at least 18 years old. By signing up, you confirm that you meet this age requirement.
                </p>
            </section>

            <section className="terms-section">
                <h2>3. User Responsibilities</h2>
                <p>
                    You are responsible for the books you lend or borrow. Please treat all borrowed materials with care, and return them as agreed with the owner.
                </p>
            </section>

            <section className="terms-section">
                <h2>4. Liability and Disputes</h2>
                <p>
                    Our platform is not liable for damages, losses, or disputes arising from book exchanges. Users are encouraged to resolve issues directly.
                </p>
            </section>

            <section className="terms-section">
                <h2>5. Amendments</h2>
                <p>
                    We may update these terms from time to time. Notice of changes will be posted on our site, and continued use of the platform indicates acceptance of updates.
                </p>
            </section>

            <p className="terms-footer">
                Thank you for joining our community! We hope you enjoy connecting with other book lovers and finding new reads.
            </p>
        </div>
    );
};

export default TermsOfService;
