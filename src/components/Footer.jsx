import React from "react";

const Footer = () => {
  return (
    <footer className=" text-dark-gray py-8">
      <div className="container mx-auto px-6 sm:px-12">
        {/* Logo or Title */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold">PrepQuest</h1>
          <p className="text-sm">
            Your ultimate interview preparation companion
          </p>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 text-center sm:text-left">
          {/* Contact List */}
          <div>
            <h3 className="text-sm mb-3">Contact Us</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <strong>Address:</strong> 1234 PrepStreet, City, Country
              </li>
              <li className="text-sm">
                <strong>Phone:</strong> +1 (800) 123-4567
              </li>
              <li className="text-sm">
                <strong>Email:</strong> contact@prepquest.com
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm mb-3">Quick Links</h3>
            <ul className="space-y-2">
              <li className="text-sm">
                <a href="/" className="hover:text-blue-400">
                  Home
                </a>
              </li>
              <li className="text-sm">
                <a href="/dsa" className="hover:text-blue-400">
                  Problems
                </a>
              </li>
              <li className="text-sm">
                <a href="/purchase" className="hover:text-blue-400">
                  Purchase
                </a>
              </li>
              <li className="text-sm">
                <a href="/" className="hover:text-blue-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm mb-3">Follow Us</h3>
            <div className=" text-sm flex justify-center sm:justify-start space-x-4">
              <a
                href="https://twitter.com/prepquest"
                target="_blank"
                className="text-accent-color hover:text-primary-color"
              >
                Twitter
              </a>
              <a
                href="https://facebook.com/prepquest"
                target="_blank"
                className="text-accent-color hover:text-primary-color"
              >
                Facebook
              </a>
              <a
                href="https://linkedin.com/company/prepquest"
                target="_blank"
                className="text-accent-color hover:text-primary-color"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="text-center mt-6">
          <p className="text-sm">© 2025 PrepQuest. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
