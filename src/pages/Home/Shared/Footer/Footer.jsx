import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-300 text-base-content p-10">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                
                {/* Services */}
                <div>
                    <h6 className="footer-title mb-3 font-semibold">Services</h6>
                    <ul className="space-y-2">
                        <li><a className="link link-hover">Branding</a></li>
                        <li><a className="link link-hover">Design</a></li>
                        <li><a className="link link-hover">Marketing</a></li>
                        <li><a className="link link-hover">Advertisement</a></li>
                    </ul>
                </div>

                {/* Company */}
                <div>
                    <h6 className="footer-title mb-3 font-semibold">Company</h6>
                    <ul className="space-y-2">
                        <li><a className="link link-hover">About us</a></li>
                        <li><a className="link link-hover">Contact</a></li>
                        <li><a className="link link-hover">Jobs</a></li>
                        <li><a className="link link-hover">Press kit</a></li>
                    </ul>
                </div>

                {/* Legal */}
                <div>
                    <h6 className="footer-title mb-3 font-semibold">Legal</h6>
                    <ul className="space-y-2">
                        <li><a className="link link-hover">Terms of use</a></li>
                        <li><a className="link link-hover">Privacy policy</a></li>
                        <li><a className="link link-hover">Cookie policy</a></li>
                    </ul>
                </div>

                {/* Newsletter */}
                <div>
                    <h6 className="footer-title mb-3 font-semibold">Newsletter</h6>
                    <form>
                        <label className="block mb-2">Enter your email address</label>
                        <div className="flex flex-col sm:flex-row gap-2">
                            <input
                                type="text"
                                placeholder="username@site.com"
                                className="input input-bordered flex-1"
                            />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </form>
                </div>

            </div>
        </footer>
    );
};

export default Footer;
