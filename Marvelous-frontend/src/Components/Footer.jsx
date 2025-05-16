import React from 'react';
import { FaInstagram, FaTwitter, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 pb-20">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-start md:items-start space-y-6 md:space-y-0">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-40 ml-10">
            <div>
              <h3 className="font-bold mb-2">Company</h3>
              <ul>
                <li><a href="#" className="text-gray-400 hover:text-white">About</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Jobs</a></li> */}
                <li><a href="#" className="text-gray-400 hover:text-white">For the Record</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Communities</h3>
              <ul>
                {/* <li><a href="#" className="text-gray-400 hover:text-white">For Artists</a></li> */}
                <li><a href="#" className="text-gray-400 hover:text-white">Developers</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Advertising</a></li> */}
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Investors</a></li> */}
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Vendors</a></li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Useful Links</h3>
              <ul>
                <li><a href="#" className="text-gray-400 hover:text-white">Support</a></li>
                {/* <li><a href="#" className="text-gray-400 hover:text-white">Free Mobile App</a></li> */}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-2">Marvelous Plans</h3>
              <ul>
                <li><a href="#" className="text-gray-400 hover:text-white">Premium Individual</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Premium Duo</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Premium Family</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Premium Student</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Marvelous Free</a></li>
              </ul>
            </div>
          </div>

          <div className="flex space-x-4 mr-10">
            <a href="https://www.instagram.com/harshusah2/" className="text-gray-400 hover:text-white"><FaInstagram size={20} /></a>
            <a href="https://x.com/Marvel" className="text-gray-400 hover:text-white"><FaTwitter size={20} /></a>
            <a href="https://www.facebook.com/Marvel/" className="text-gray-400 hover:text-white"><FaFacebook size={20} /></a>
          </div>
        </div>

        <div className="border-t border-gray-700 my-6"></div>

        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <ul className="flex flex-wrap justify-center space-x-4 mb-4 md:mb-0">
            <li><a href="#" className="hover:text-white">Legal</a></li>
            <li><a href="#" className="hover:text-white">Safety & Privacy Center</a></li>
            <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white">Cookies</a></li>
            {/* <li><a href="#" className="hover:text-white">About Ads</a></li> */}
            <li><a href="#" className="hover:text-white">Accessibility</a></li>
          </ul>

          <div className="text-gray-500">
            © 2024 Marvelous
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
