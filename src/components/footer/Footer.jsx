"use client";

import { useState } from "react";
import { Sparkles, MapPin, Phone, Clock } from "lucide-react";
import "./Footer.css";

/* Newer lucide-react versions removed brand icons, so we use inline SVGs */
const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TwitterIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const Footer = ({ onOpenPortal }) => {
  const [email, setEmail] = useState("");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(
      "🎉 Welcome to the Slice Club! Use code PIZZAHUB20 at checkout for 20% off."
    );
    setEmail("");
  };

  return (
    <footer id="contact" className="ph-footer">
      <div className="ph-footer__container">
        {/* Newsletter Banner */}
        <div className="ph-newsletter">
          <div className="ph-newsletter__grid">
            <div className="ph-newsletter__text">
              <span className="ph-newsletter__eyebrow">
                <Sparkles size={16} /> VIP Slice Club
              </span>
              <h2 className="ph-newsletter__title">
                GET 20% OFF YOUR FIRST PIZZA!
              </h2>
              <p className="ph-newsletter__desc">
                Subscribe for secret menu drops, wood-fired weekend deals, and
                an instant promo code.
              </p>
            </div>

            <div className="ph-newsletter__form-wrap">
              <form className="ph-newsletter__form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  className="ph-newsletter__input"
                />
                <button type="submit" className="ph-newsletter__btn">
                  Claim 20% Off
                </button>
              </form>
              {feedback && <p className="ph-newsletter__feedback">{feedback}</p>}
            </div>
          </div>
        </div>

        {/* 3-Column Footer */}
        <div className="ph-footer__grid">
          {/* Col 1: Branding */}
          <div className="ph-footer__col ph-footer__brand">
            <div className="ph-footer__logo">
              <div className="ph-footer__logo-icon">🍕</div>
              <span className="ph-footer__logo-text">PIZZAHUB</span>
            </div>
            <p className="ph-footer__about">
              Artisanal wood-fired pizzas crafted daily in Dhaka with 48-hour
              sourdough and imported Italian tomatoes.
            </p>
            <div className="ph-footer__socials">
              <a href="#contact" aria-label="Instagram" className="ph-footer__social">
                <InstagramIcon size={16} />
              </a>
              <a href="#contact" aria-label="Facebook" className="ph-footer__social">
                <FacebookIcon size={16} />
              </a>
              <a href="#contact" aria-label="Twitter" className="ph-footer__social">
                <TwitterIcon size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="ph-footer__col">
            <h4 className="ph-footer__heading">Navigation</h4>
            <ul className="ph-footer__list">
              <li>
                <a href="#top" className="ph-footer__link">Home</a>
              </li>
              <li>
                <a href="#menu-section" className="ph-footer__link">Wood-Fired Menu</a>
              </li>
              <li>
                <a href="#about" className="ph-footer__link">Our Secret Dough</a>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPortal}
                  className="ph-footer__link ph-footer__link--btn"
                >
                  Partner / Vendor Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Visit & Contact */}
          <div className="ph-footer__col">
            <h4 className="ph-footer__heading">Visit &amp; Contact</h4>
            <ul className="ph-footer__list ph-footer__list--contact">
              <li className="ph-footer__contact-item ph-footer__contact-item--top">
                <MapPin size={16} className="ph-icon-crimson" />
                <span>House 42, Road 11, Banani, Dhaka 1213, Bangladesh</span>
              </li>
              <li className="ph-footer__contact-item">
                <Phone size={16} className="ph-icon-crimson" />
                <span>+880 1711-009988</span>
              </li>
              <li className="ph-footer__contact-item">
                <Clock size={16} className="ph-icon-tangerine" />
                <span>Daily: 12:00 PM – 11:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="ph-footer__bottom">
          <p>© 2026 PizzaHub Bangladesh. All rights reserved.</p>
          <p>Role-Based Architecture Prototype • Customer / Vendor / Admin Ready</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;