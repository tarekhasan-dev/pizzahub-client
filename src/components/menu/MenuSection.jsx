
"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  Plus,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Flame,
  Zap,
  Leaf,
  ChefHat,
} from "lucide-react";

import "./MenuSection.css";

const FALLBACK_IMG =
  "https://placehold.co/600x600/E6E9DF/1D1B18?text=Pizza";

const DEFAULT_PIZZAS = [
  {
    id: 1,
    name: "Truffle Pepperoni Supreme",
    category: "Spicy",
    price: 1250,
    description:
      "San Marzano crushed tomatoes, aged fior di latte mozzarella, crispy beef pepperoni, roasted wild mushrooms, and basil oil.",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Smoky BBQ Chicken Feast",
    category: "Spicy",
    price: 1180,
    description:
      "Char-grilled chicken tikka, caramelized red onions, smoked gouda, tangy house BBQ drizzle, and fresh cilantro.",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Burrata & Basil Margherita",
    category: "Classic",
    price: 990,
    description:
      "Creamy whole-milk Pugliese burrata placed post-bake over crushed plum tomatoes, sweet basil leaves, and olive oil.",
    image:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Four Cheese & Hot Honey",
    category: "Classic",
    price: 1320,
    description:
      "Mozzarella, gorgonzola dolce, aged parmesan, and fontina finished with chili-infused wildflower honey.",
    image:
      "https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Diavola Spicy Salami",
    category: "Spicy",
    price: 1290,
    description:
      "Calabrian chili paste, spicy beef salami, black Gaeta olives, fresh oregano, and melted provolone.",
    image:
      "https://images.unsplash.com/photo-1628840042765-356cda07504e?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Rosemary Garlic Knots & Dip",
    category: "Sides",
    price: 420,
    description:
      "Warm sourdough knots brushed with roasted garlic herb butter, served with warm marinara sauce.",
    image:
      "https://images.unsplash.com/photo-1573140247632-f8fd74997d5c?auto=format&fit=crop&w=900&q=85",
  },
];

const FILTERS = [
  { key: "All", label: "All Items" },
  { key: "Classic", label: "Classic Pizzas" },
  { key: "Spicy", label: "Spicy & Meat" },
  { key: "Sides", label: "Sides & Drinks" },
];

const PILLARS = [
  {
    icon: Flame,
    tone: "crimson",
    title: "Wood-Fired Oven",
    text: "Volcanic stone deck heated with seasoned oak logs at 485°C.",
  },
  {
    icon: Zap,
    tone: "tangerine",
    title: "30-Min Hot Delivery",
    text: "Insulated thermal boxes keep your crust crisp across Dhaka.",
  },
  {
    icon: Leaf,
    tone: "crimson",
    title: "Organic Toppings",
    text: "Farm-fresh basil, heirloom tomatoes, and pure buffalo mozzarella.",
  },
  {
    icon: ChefHat,
    tone: "tangerine",
    title: "Master Pizzaiolos",
    text: "Hand-stretched dough—never rolled—to preserve airy crust bubbles.",
  },
];

const onImgError = (e) => {
  e.currentTarget.onerror = null;
  e.currentTarget.src = FALLBACK_IMG;
};

export default function MenuSection({
  items = DEFAULT_PIZZAS,
  onAddToCart,
}) {
  const menuItems =
    items && items.length > 0 ? items : DEFAULT_PIZZAS;

  const [activeCategory, setActiveCategory] = useState("All");

  // Store the dot index together with its category.
  const [dotState, setDotState] = useState({
    category: "All",
    index: 0,
  });

  const trackRef = useRef(null);

  // Reset the visible dot automatically when the category changes.
  const activeDot =
    dotState.category === activeCategory ? dotState.index : 0;

  const popularItems = useMemo(
    () => menuItems.slice(0, 4),
    [menuItems]
  );

  const filteredItems = useMemo(() => {
    if (activeCategory === "All") return menuItems;

    return menuItems.filter(
      (item) =>
        item.category?.toLowerCase() ===
        activeCategory.toLowerCase()
    );
  }, [menuItems, activeCategory]);

  const handleAdd = (pizza) => {
    onAddToCart?.(pizza);
  };

  /* Carousel helpers */

  const handleScroll = useCallback(() => {
    const track = trackRef.current;

    if (!track) return;

    const firstCard = track.firstElementChild;

    if (!firstCard) return;

    const step =
      firstCard.getBoundingClientRect().width + 20;

    const idx = Math.round(track.scrollLeft / step);

    const safeIndex = Math.min(
      Math.max(idx, 0),
      filteredItems.length - 1
    );

    setDotState({
      category: activeCategory,
      index: safeIndex,
    });
  }, [activeCategory, filteredItems.length]);

  const slideCarousel = (direction) => {
    const track = trackRef.current;

    if (!track) return;

    track.scrollBy({
      left: direction * 300,
      behavior: "smooth",
    });
  };

  const goToSlide = (idx) => {
    const track = trackRef.current;
    const card = track?.children[idx];

    if (!track || !card) return;

    track.scrollTo({
      left: card.offsetLeft - track.offsetLeft,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    // Reset carousel position when the filter changes.
    const track = trackRef.current;

    if (track) {
      track.scrollTo({ left: 0 });
    }
  }, [activeCategory]);

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">
        {/* ============ 1. POPULAR SIGNATURE PIZZAS ============ */}

        <div className="menu-header">
          <div>
            <span className="menu-eyebrow menu-eyebrow--tangerine">
              All-Day Oven Favorites
            </span>

            <h2 className="menu-title">
              Popular Signature Pizzas
            </h2>
          </div>

          <div className="menu-header-right">
            <p className="menu-header-note">
              Baked at 485°C for 90 seconds for that leopard-spotted,
              airy sourdough crust.
            </p>

            <a href="#menu-carousel" className="menu-view-btn">
              <span>View Full Menu</span>
              <ArrowRight size={16} />
            </a>
          </div>
        </div>

        <div className="popular-grid">
          {popularItems.map((pizza) => (
            <article key={pizza.id} className="pizza-card">
              <div className="pizza-img-wrap">
                <div className="pizza-img-ring">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-img"
                    onError={onImgError}
                  />
                </div>

                <span className="pizza-badge">
                  {pizza.category}
                </span>
              </div>

              <div className="pizza-info">
                <h3 className="pizza-name">
                  {pizza.name}
                </h3>

                <p className="pizza-desc">
                  {pizza.description}
                </p>
              </div>

              <div className="pizza-footer">
                <span className="pizza-price">
                  ৳{Number(pizza.price).toLocaleString()}
                </span>

                <button
                  type="button"
                  onClick={() => handleAdd(pizza)}
                  aria-label={`Add ${pizza.name} to cart`}
                  className="pizza-add-btn"
                >
                  <Plus size={20} />
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* ============ 2. CRAFTED WITH OBSESSION BANNER ============ */}

        <div className="craft-banner">
          <svg
            className="craft-art craft-art--left"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="60"
              cy="42"
              r="24"
              stroke="currentColor"
              strokeWidth="2"
            />

            <circle
              cx="60"
              cy="42"
              r="6"
              stroke="currentColor"
              strokeWidth="2"
            />

            <path
              d="M60 66L60 112"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />

            <path
              d="M36 42H84"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />
          </svg>

          <svg
            className="craft-art craft-art--right"
            viewBox="0 0 120 120"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M20 95C40 65 70 45 100 20"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M45 68C35 55 42 40 56 46"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M68 50C78 62 92 55 86 41"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />

            <path
              d="M82 36C72 24 80 12 92 18"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>

          <div className="craft-grid">
            <div className="craft-intro">
              <span className="craft-chip">
                Why Foodies Choose Us
              </span>

              <h2 className="craft-title">
                Crafted With Obsession
              </h2>

              <p className="craft-text">
                Every pie starts with wild yeast starter nurtured
                daily and locally sourced organic produce.
              </p>
            </div>

            <div className="craft-pillars">
              {PILLARS.map(
                ({ icon: Icon, tone, title, text }) => (
                  <div key={title} className="craft-pillar">
                    <div
                      className={`craft-icon craft-icon--${tone}`}
                    >
                      <Icon size={26} />
                    </div>

                    <h3 className="craft-pillar-title">
                      {title}
                    </h3>

                    <p className="craft-pillar-text">
                      {text}
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* ============ 3. WHAT TO TRY TODAY ============ */}

        <div id="menu-carousel" className="try-grid">
          <div className="try-left">
            <span className="menu-eyebrow menu-eyebrow--crimson">
              Explore What&apos;s Baking
            </span>

            <h2 className="menu-title">
              What To Try Today
            </h2>

            <p className="try-text">
              Filter by your craving or swipe through our curated
              wood-fired specials, sides, and artisan beverages.
            </p>

            <div
              className="try-pills"
              role="tablist"
              aria-label="Menu categories"
            >
              {FILTERS.map((f) => (
                <button
                  key={f.key}
                  type="button"
                  role="tab"
                  aria-selected={activeCategory === f.key}
                  onClick={() => setActiveCategory(f.key)}
                  className={`try-pill ${
                    activeCategory === f.key ? "is-active" : ""
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>

            <div className="try-controls">
              <button
                type="button"
                onClick={() => slideCarousel(-1)}
                aria-label="Previous"
                className="try-arrow"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                type="button"
                onClick={() => slideCarousel(1)}
                aria-label="Next"
                className="try-arrow"
              >
                <ChevronRight size={20} />
              </button>

              <div className="try-dots">
                {filteredItems.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${i + 1}`}
                    onClick={() => goToSlide(i)}
                    className={`try-dot ${
                      i === activeDot ? "is-active" : ""
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="try-right">
            <div
              className="try-track"
              ref={trackRef}
              onScroll={handleScroll}
            >
              {filteredItems.map((item) => (
                <div key={item.id} className="try-card">
                  <div>
                    <div className="try-card-img-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="try-card-img"
                        onError={onImgError}
                      />

                      <span className="try-card-price">
                        ৳{Number(item.price).toLocaleString()}
                      </span>
                    </div>

                    <h3 className="try-card-name">
                      {item.name}
                    </h3>

                    <p className="try-card-desc">
                      {item.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleAdd(item)}
                    className="try-card-btn"
                  >
                    <Plus size={16} /> Add to Box
                  </button>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <p className="try-empty">
                  No items in this category yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
