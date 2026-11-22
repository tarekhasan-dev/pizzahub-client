
"use client";

import React, { useEffect, useRef, useState } from "react";
import "./AboutSection.css";

const FALLBACK_IMG =
  "https://placehold.co/600x400/E6E9DF/1D1B18?text=PizzaHub";

const DEFAULT_ABOUT_CARDS = [
  {
    id: "dough",
    tag: "01 • Fermentation",
    title: "Our Secret Dough",
    description:
      "Cold-fermented for 48 hours using Italian Tipo 00 flour and mountain spring water for a light, digestible crust.",
    image:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=700&q=80",
    alt: "Our Secret Sourdough",
  },
  {
    id: "pairings",
    tag: "02 • Pairings",
    title: "Artisan Sides & Drinks",
    description:
      "Roasted rosemary garlic knots, truffle burrata salads, and house-brewed Sicilian blood orange sodas.",
    image:
      "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=700&q=80",
    alt: "Artisan Sides and Drinks",
  },
  {
    id: "atmosphere",
    tag: "03 • Atmosphere",
    title: "Cozy Dine-In Space",
    description:
      "Warm terracotta lighting, open brick-oven view, and acoustic vinyl playlists in the heart of Gulshan & Banani.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=700&q=80",
    alt: "Cozy Dine-In Space",
  },
];

const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMG;
};

/* Adds is-visible once the element scrolls into view */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);

  const [visible, setVisible] = useState(
    typeof IntersectionObserver === "undefined"
  );

  useEffect(() => {
    const el = ref.current;

    if (!el || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, visible];
}

function AboutCard({ card, index }) {
  const [ref, visible] = useReveal();

  return (
    <article
      ref={ref}
      className={`about-card ${visible ? "is-visible" : ""}`}
      style={{ transitionDelay: visible ? `${index * 120}ms` : "0ms" }}
    >
      <div className="about-card-body">
        <span className="about-chip">{card.tag}</span>
        <h3 className="about-card-title">{card.title}</h3>
        <p className="about-card-text">{card.description}</p>
      </div>

      <div className="about-card-img-wrap">
        <img
          src={card.image}
          alt={card.alt || card.title}
          className="about-card-img"
          onError={onImgError}
        />
      </div>
    </article>
  );
}

export default function AboutSection({ cards = DEFAULT_ABOUT_CARDS }) {
  const items = cards && cards.length > 0 ? cards : DEFAULT_ABOUT_CARDS;
  const [headRef, headVisible] = useReveal();

  return (
    <section id="about" className="about-section">
      <div className="about-container">
        {/* Section heading */}
        <div
          ref={headRef}
          className={`about-header ${headVisible ? "is-visible" : ""}`}
        >
          <span className="about-eyebrow">Our Story &amp; Craft</span>
          <h2 className="about-title">More Than Just A Slice</h2>
          <p className="about-subtitle">
            Inspired by Neapolitan tradition and built for Dhaka&apos;s vibrant
            food culture.
          </p>
        </div>

        {/* 3-card bento grid */}
        <div className="about-grid">
          {items.map((card, index) => (
            <AboutCard key={card.id || index} card={card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
