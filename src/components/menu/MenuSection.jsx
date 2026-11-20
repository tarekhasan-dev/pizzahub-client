
"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Plus,
  ChevronLeft,
  ChevronRight,
  ShoppingCart,
  ArrowRight,
} from "lucide-react";
import "./MenuSection.css";

const DEFAULT_PIZZAS = [
  {
    id: "truffle-pepperoni",
    name: "Truffle Pepperoni Supreme",
    category: "Signature",
    description:
      "San Marzano crushed tomatoes, aged fior di latte mozzarella, crispy beef pepperoni, and roasted wild mushrooms.",
    price: 1250,
    image: "/images/hero-pizza.jpg",
  },
  {
    id: "cheese-feast",
    name: "Cheese Feast",
    category: "Classic",
    description:
      "Rich blend of mozzarella, aged provolone, and parmesan over a 48-hr fermented wood-fired crust.",
    price: 980,
    image: "/images/pizza-2.jpg",
  },
  {
    id: "chefs-special",
    name: "Chef's Special Pizza",
    category: "Chef Special",
    description:
      "Roasted tomato base, fresh garden herbs, charred toppings, and extra virgin olive oil drizzle.",
    price: 1100,
    image: "/images/pizza-3.jpg",
  },
  {
    id: "fiery-diavola",
    name: "Fiery Wood-Fired Melt",
    category: "Spicy",
    description:
      "Spiced tomato sauce, melted mozzarella, chili flakes, and crisp wood-fired sourdough edges.",
    price: 1180,
    image: "/images/hero-pizza.jpg",
  },
];

const CATEGORIES = ["All", "Signature", "Classic", "Chef Special", "Spicy"];

export default function MenuSection({ items = DEFAULT_PIZZAS, onAddToCart }) {
  const menuItems = items && items.length > 0 ? items : DEFAULT_PIZZAS;

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Selected Pizza Card
  const [selectedPizzaId, setSelectedPizzaId] = useState(null);

  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") return menuItems;

    const matched = menuItems.filter(
      (item) => item.category?.toLowerCase() === selectedCategory.toLowerCase()
    );

    return matched.length > 0 ? matched : menuItems;
  }, [menuItems, selectedCategory]);

  const orderedCarouselItems = useMemo(() => {
    if (menuItems.length === 0) return [];

    const safeIdx = carouselIndex % menuItems.length;

    return [
      ...menuItems.slice(safeIdx),
      ...menuItems.slice(0, safeIdx),
    ];
  }, [menuItems, carouselIndex]);

  const handlePrev = () => {
    setCarouselIndex((prev) =>
      prev === 0 ? menuItems.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCarouselIndex((prev) => (prev + 1) % menuItems.length);
  };

  const handleAdd = (pizza) => {
    onAddToCart?.(pizza);
  };

  return (
    <section id="menu" className="menu-section">
      <div className="menu-container">

        {/* Section Header */}
        <div className="menu-header">
          <div>
            <h2 className="menu-title">
              Signature <span>Pizza</span> Menu
            </h2>

            <p className="menu-subtitle">
              Hand-stretched sourdough, rich tomato sauces, and melted cheese
              baked hot in our wood-fired oven.
            </p>
          </div>

          <a href="#about" className="btn-dark focus-ring">
            Our Dough Story <ArrowRight size={16} />
          </a>
        </div>

        {/* Category Filter Pills */}
        <div
          className="menu-filters"
          role="tablist"
          aria-label="Pizza categories"
        >
          {CATEGORIES.map((category) => {
            const isActive = selectedCategory === category;

            return (
              <button
                key={category}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setSelectedCategory(category)}
                className={`menu-filter-btn focus-ring ${
                  isActive ? "is-active" : ""
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        {/* 4-Column Signature Pizza Grid */}
        <div className="menu-grid">
          {filteredItems.map((pizza, index) => (
            <motion.article
              key={pizza.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.42,
                delay: index * 0.07,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`pizza-card ${
                selectedPizzaId === pizza.id ? "is-selected" : ""
              }`}
              onClick={() => setSelectedPizzaId(pizza.id)}
            >
              <div>
                <div className="pizza-img-wrap">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="pizza-img-circle"
                  />

                  <button
                    type="button"
                    onClick={(event) => {
                      event.stopPropagation();
                      handleAdd(pizza);
                    }}
                    aria-label={`Quick add ${pizza.name}`}
                    className="pizza-quick-add focus-ring"
                  >
                    <Plus size={19} strokeWidth={2.5} />
                  </button>
                </div>

                <span className="pizza-category">
                  {pizza.category || "Wood-Fired"}
                </span>

                <h3 className="pizza-name">{pizza.name}</h3>

                <p className="pizza-desc">{pizza.description}</p>
              </div>

              <div className="pizza-footer">
                <span className="pizza-price">
                  ৳{Number(pizza.price).toLocaleString()}
                </span>

                <button
                  type="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    handleAdd(pizza);
                  }}
                  className="pizza-order-link focus-ring"
                >
                  Add Pizza
                </button>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Sage Editorial Strip */}
        <div className="menu-sage-strip">
          <div className="menu-sage-grid">

            <div>
              <h3 className="font-display text-3xl sm:text-4xl leading-none text-ink">
                What To Try <span>Today</span>
              </h3>

              <p className="mt-3 text-sm leading-6 text-ink-soft">
                Slide through daily wood-fired picks and add your favorite slice
                or whole pizza straight to your box.
              </p>

              <div className="carousel-controls">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous pizza"
                  className="carousel-btn focus-ring"
                >
                  <ChevronLeft size={18} />
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next pizza"
                  className="carousel-btn focus-ring"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>

            <div>
              <div className="carousel-cards">
                {orderedCarouselItems.slice(0, 3).map((item) => (
                  <motion.div
                    layout
                    key={item.id}
                    transition={{
                      type: "spring",
                      stiffness: 280,
                      damping: 25,
                    }}
                    className="carousel-card"
                  >
                    <div className="carousel-card-img-wrap">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="carousel-card-img"
                      />
                    </div>

                    <div className="carousel-card-bar">
                      <div className="min-w-0">
                        <p className="text-sm font-bold truncate">
                          {item.name}
                        </p>

                        <p className="text-xs font-semibold opacity-90">
                          ৳{Number(item.price).toLocaleString()}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleAdd(item)}
                        aria-label={`Add ${item.name} to cart`}
                        className="h-9 w-9 shrink-0 rounded-full bg-ink hover:bg-tomato text-white flex items-center justify-center transition-colors cursor-pointer"
                      >
                        <ShoppingCart size={15} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="carousel-dots">
                {menuItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setCarouselIndex(idx)}
                    className={`carousel-dot ${
                      idx === carouselIndex % menuItems.length
                        ? "is-active"
                        : ""
                    }`}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
