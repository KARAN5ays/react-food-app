import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-5 pb-4 mt-5">
      <div className="container">
        <div className="row">
          {/* Company Info */}
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <h3 className="h5 text-uppercase fw-bold mb-3">Fast and Ready</h3>
            <p className="mb-3">
              Delivering delicious meals to your doorstep with speed and quality. 
              Experience the best food delivery service in town.
            </p>
            <div className="d-flex align-items-center mb-2">
              <FaMapMarkerAlt className="me-2 text-primary" />
              <span>Morang,Biratnagar</span>
            </div>
            <div className="d-flex align-items-center mb-2">
              <FaPhone className="me-2 text-primary" />
              <span>+977 9824344231</span>
            </div>
            <div className="d-flex align-items-center">
              <FaEnvelope className="me-2 text-primary" />
              <span>FastandReady01@gmail.com</span>
            </div>
          </div>
          
          {/* Quick Links */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="h5 text-uppercase fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="text-white text-decoration-none hover-primary">Home</a>
              </li>
              <li className="mb-2">
                <a href="/restaurants" className="text-white text-decoration-none hover-primary">Restaurants</a>
              </li>
              <li className="mb-2">
                <a href="/offers" className="text-white text-decoration-none hover-primary">Special Offers</a>
              </li>
              <li className="mb-2">
                <a href="/about" className="text-white text-decoration-none hover-primary">About Us</a>
              </li>
              <li>
                <a href="/contact" className="text-white text-decoration-none hover-primary">Contact</a>
              </li>
            </ul>
          </div>
          
          {/* Support */}
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h5 className="h5 text-uppercase fw-bold mb-3">Support</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/faq" className="text-white text-decoration-none hover-primary">FAQ</a>
              </li>
              <li className="mb-2">
                <a href="/terms" className="text-white text-decoration-none hover-primary">Terms of Service</a>
              </li>
              <li className="mb-2">
                <a href="/privacy" className="text-white text-decoration-none hover-primary">Privacy Policy</a>
              </li>
              <li className="mb-2">
                <a href="/delivery" className="text-white text-decoration-none hover-primary">Delivery Info</a>
              </li>
              <li>
                <a href="/careers" className="text-white text-decoration-none hover-primary">Careers</a>
              </li>
            </ul>
          </div>
          
          {/* Newsletter */}
          <div className="col-lg-4 col-md-6">
            <h5 className="h5 text-uppercase fw-bold mb-3">Newsletter</h5>
            <p className="mb-3">
              Subscribe to our newsletter for exclusive offers and updates.
            </p>
            <div className="input-group mb-3">
              <input 
                type="email" 
                className="form-control" 
                placeholder="Your email address" 
                aria-label="Your email address"
              />
              <button className="btn btn-primary" type="button">Subscribe</button>
            </div>
            <div className="d-flex align-items-center mb-3">
              <FaClock className="me-2 text-primary" />
              <span>Mon-Fri: 9AM-10PM, Sat-Sun: 10AM-11PM</span>
            </div>
            <div className="d-flex space-x-3">
              <a href="#" className="text-white fs-4 hover-primary">
                <FaFacebook />
              </a>
              <a href="#" className="text-white fs-4 hover-primary">
                <FaTwitter />
              </a>
              <a href="#" className="text-white fs-4 hover-primary">
                <FaInstagram />
              </a>
              <a href="#" className="text-white fs-4 hover-primary">
                <FaLinkedin />
              </a>
              <a href="#" className="text-white fs-4 hover-primary">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>
        
        <hr className="my-4 bg-secondary" />
        
        {/* Copyright */}
        <div className="row">
          <div className="col-md-6">
            <p className="mb-0">
              © 2025 Fast and Ready Food, Inc. All rights reserved.
            </p>
          </div>
          <div className="col-md-6 text-md-end">
            <div className="d-inline-block">
              <a href="#" className="text-white text-decoration-none me-3 hover-primary">Payment Methods</a>
              <a href="#" className="text-white text-decoration-none hover-primary">Refund Policy</a>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .hover-primary:hover {
          color: #0d6efd !important;
          transition: color 0.3s ease;
        }
        .space-x-3 > * + * {
          margin-left: 1rem;
        }
      `}</style>
    </footer>
  );
};

export default Footer;